import './WorldMapMain.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import WorldMapImage from "../parts/WorldMapImage.tsx";
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import MapMarkerCard from "../../mapMarker/parts/MapMarkerCard.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import ToolBar from "../parts/WorldMapToolMenu/ToolBar.tsx";
import {MapMarkerDto} from "../../../types/MapMarkerDto.ts";
import {Article, emptyArticle} from "../../../types/Article.ts";
import ArticleCard from "../../article/parts/ArticleCard.tsx";
import AddMapMarkerForm from "../../mapMarker/parts/AddMapMarkerForm.tsx";
import UpdateMapMarkerForm from "../../mapMarker/parts/UpdateMapMarkerForm.tsx";

type WorldMapMainProps = {
    getWorldMap: (id:string) => WorldMap;
    getMapMarkerType: (id:string) => MapMarkerType;
    mapMarkers: MapMarker[];
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    updateMapMarker: (mapMarker:MapMarker) => void;
    deleteMapMarker: (id:string) => void;
    articles: Article[];
    getArticleById: (id:string) => Article;
};


const initialCoordinates = {
    xPosition: -10,
    yPosition: -10
}

export default function WorldMapMain(props:Readonly<WorldMapMainProps>):React.ReactElement{
    const {id= ''} = useParams<string>();
    const [coordinates, setCoordinates] = useState(initialCoordinates);
    const [worldMap, setWorldMap] = useState<WorldMap>(emptyWorldMap);
    const [mapMarkersOfThisWorldMap, setMapMarkersOfThisWorldMap] = useState<MapMarker[]>([]);
    const [addNewMapMarker, setAddNewMapMarker] = useState<boolean>(false);
    const [changeMapMarkerPosition, setChangeMapMarkerPosition] = useState<boolean>(false);
    const [updateMapMarker, setUpdateMapMarker] = useState<boolean>(false);
    const [displayedArticle, setDisplayedArticle] = useState<Article>(emptyArticle);
    const [selectedMapMarker, setSelectedMapMarker] = useState<MapMarker>(emptyMapMarker);

    function handleWorldMapClick(event: React.MouseEvent<HTMLElement>):void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const rect = event.target.getBoundingClientRect();

        if(addNewMapMarker){
            setCoordinates({xPosition: (event.clientX - rect.left), yPosition: (event.clientY - rect.top)});
        }
        if(changeMapMarkerPosition){
            setSelectedMapMarker({...selectedMapMarker, xPosition: (event.clientX - rect.left), yPosition: (event.clientY - rect.top)})
        } else {
            setDisplayedArticle(emptyArticle);
            setSelectedMapMarker(emptyMapMarker);
            setUpdateMapMarker(false);
        }
    }

    function handleSelectedMapMarkerChange(mapMarker:MapMarker):void {
        setSelectedMapMarker(mapMarker);
        setUpdateMapMarker(false);
        setChangeMapMarkerPosition(false);
    }

    function handleArticleChangeById(articleId: string):void {
        setDisplayedArticle(props.getArticleById(articleId));
    }

    function handleMapMarkerUpdateEnd():void {
        setChangeMapMarkerPosition(false);
        setUpdateMapMarker(false);
        setSelectedMapMarker(mapMarkersOfThisWorldMap.filter((mapMarker:MapMarker) => mapMarker.id === selectedMapMarker.id)[0]);
    }

    function handleUpdateMapMarker():void {
        setUpdateMapMarker(!updateMapMarker);
    }

    function toggleAddNewMapMarker(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        setAddNewMapMarker(!addNewMapMarker);
    }

    useEffect(():void => {
        setWorldMap(props.getWorldMap(id))
        setMapMarkersOfThisWorldMap(props.mapMarkers.filter((mapMarker:MapMarker) => mapMarker.worldMapId === worldMap.id))
        // eslint-disable-next-line
    }, [id, props]);

    return (
        <main className={"worldMapMain"}>
            <ToolBar
                toggleAddNewMapMarker={toggleAddNewMapMarker}
            />
            <WorldMapImage
                worldMap={worldMap}
                handleWorldMapClick={handleWorldMapClick}
            />
            {mapMarkersOfThisWorldMap.map((mapMarker:MapMarker) => {
                return <MapMarkerCard
                    key={mapMarker.id}
                    mapMarker={mapMarker}
                    handleArticleChange={handleArticleChangeById}
                    offsetWorldMapFrame={{xOffset: 100, yOffset: 100}} /* Offset the padding. */
                    isSelected={mapMarker.id === selectedMapMarker.id}
                    handleSelectedMapMarkerChange={handleSelectedMapMarkerChange}
                    handleUpdateMapMarker={handleUpdateMapMarker}
                />
            })}
            {displayedArticle !== emptyArticle &&
                <ArticleCard
                    title={selectedMapMarker.name}
                    article={displayedArticle}
                    closeArticleCard={() => setDisplayedArticle(emptyArticle)}
                />
            }
            {(addNewMapMarker && coordinates.xPosition > 0 && coordinates.yPosition > 0) &&
                <AddMapMarkerForm
                    saveMapMarker={props.saveMapMarker}
                    worldMapId={worldMap.id}
                    xPosition={coordinates.xPosition}
                    yPosition={coordinates.yPosition}
                    closeAddMapMarkerForm={() => setCoordinates(initialCoordinates)}
                    markerTypeId={''} /* For later: When MarkerType is implemented */
                />
            }
            {(updateMapMarker && selectedMapMarker !== emptyMapMarker) &&
                <UpdateMapMarkerForm
                    mapMarker={selectedMapMarker}
                    updateMapMarker={props.updateMapMarker}
                    deleteMapMarker={props.deleteMapMarker}
                    closeMapMarkerCard={handleMapMarkerUpdateEnd}
                    setChangeMapMarkerPosition={setChangeMapMarkerPosition}
                />
            }
        </main>
    )
}
