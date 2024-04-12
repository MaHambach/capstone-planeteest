import './WorldMapMain.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import WorldMapImage from "../parts/WorldMapImage.tsx";
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import MapMarkerCard from "../../mapMarker/parts/MapMarkerCard.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import ToolBar from "../WorldMapToolMenu/ToolBar.tsx";
import {MapMarkerDto} from "../../../types/MapMarkerDto.ts";
import {Article} from "../../../types/Article.ts";
import AddMapMarkerForm from "../../mapMarker/parts/AddMapMarkerForm.tsx";
import MapMarkerUpdateWindow from "../../mapMarker/parts/MapMarkerUpdateWindow.tsx";
import ArticleWindow from "../../article/parts/ArticleWindow.tsx";
import {AppUser} from "../../../types/AppUser.ts";

type Data = {
    appUser: AppUser;
    worldMaps: WorldMap[];
    mapMarkers: MapMarker[];
    mapMarkerTypes: MapMarkerType[];
    articles: Article[];
}
type Functions = {
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    updateMapMarker: (mapMarker:MapMarker) => void;
    deleteMapMarker: (id:string) => void;
    getMapMarkerType: (id:string) => MapMarkerType;
    getArticleById: (id:string) => Article;
    updateArticle: (article:Article) => void;
    deleteArticle: (id:string) => void;
}
type WorldMapMainProps = {
    data: Data,
    functions: Functions,
};

const initialCoordinates = {
    xPosition: -10,
    yPosition: -10
}

export default function WorldMapMain({data, functions}:Readonly<WorldMapMainProps>):React.ReactElement{
    const {id= ''} = useParams<string>();
    const [coordinates, setCoordinates] = useState(initialCoordinates);
    const [worldMap, setWorldMap] = useState<WorldMap>(emptyWorldMap);
    const [addNewMapMarker, setAddNewMapMarker] = useState<boolean>(false);
    const [changeMapMarkerPosition, setChangeMapMarkerPosition] = useState<boolean>(false);
    const [showMapMarkerUpdate, setShowMapMarkerUpdate] = useState<boolean>(false);
    const [showArticle, setShowArticle] = useState<boolean>(false);
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
            setSelectedMapMarker(emptyMapMarker);
            setShowMapMarkerUpdate(false);
            setShowArticle(false);
        }
    }

    function updateSelectedMapMarker():void {
        functions.updateMapMarker(selectedMapMarker);
    }

    function handleArticleFrame():void{
        setShowArticle(!showArticle);
    }

    function handleSelectedMapMarkerChange(mapMarker:MapMarker):void {
        setSelectedMapMarker(mapMarker);
        setShowMapMarkerUpdate(false);
        setChangeMapMarkerPosition(false);
    }

    function handleMapMarkerUpdateEnd():void {
        setChangeMapMarkerPosition(false);
        setShowMapMarkerUpdate(false);
    }

    function handleMapMarkerUpdate():void {
        setShowMapMarkerUpdate(!showMapMarkerUpdate);
    }

    function toggleAddNewMapMarker(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        setAddNewMapMarker(!addNewMapMarker);
    }

    function handleCloseMapMarkerForm():void {
        setCoordinates(initialCoordinates);
        setAddNewMapMarker(false);
    }

    function getWorldMapById(id:string):WorldMap {
        const filteredWorldMaps:WorldMap[] = data.worldMaps.filter((worldMap:WorldMap) => worldMap.id === id);
        if(filteredWorldMaps.length === 0) console.error("No world map with id \"" + id + "\" found.");
        else return filteredWorldMaps[0];
        return emptyWorldMap;
    }

    useEffect(():void => {
        setWorldMap(getWorldMapById(id))
        // eslint-disable-next-line
    }, [id, data]);

    return (
        <main className={"worldMapMain"}>
            { data.appUser.myWorldMapIds.includes(worldMap.id) &&
                <ToolBar
                    functions={{toggleAddNewMapMarker: toggleAddNewMapMarker}}
                    props={{worldMapId: worldMap.id, addNewMapMarker: addNewMapMarker}}
                />
            }

            <WorldMapImage
                worldMap={worldMap}
                handleWorldMapClick={handleWorldMapClick}
            />
            {data.mapMarkers
                .filter((mapMarker:MapMarker) => mapMarker.worldMapId === id)
                .filter((mapMarker:MapMarker) => data.appUser.myWorldMapIds.includes(worldMap.id) || mapMarker.visibility === "OWNER_AND_OBSERVERS")
                .map((mapMarker:MapMarker) => {
                return <MapMarkerCard
                    key={mapMarker.id}
                    mapMarker={mapMarker}
                    offsetWorldMapFrame={{xOffset: 100, yOffset: 100}} /* Offset the padding. */
                    isMovable={mapMarker.id === selectedMapMarker.id && changeMapMarkerPosition}
                    isSelected={mapMarker.id === selectedMapMarker.id}
                    handleSelectedMapMarkerChange={handleSelectedMapMarkerChange}
                    handleMapMarkerUpdate={handleMapMarkerUpdate}
                    handleArticleFrame={handleArticleFrame}
                    setSelectedMapMarker={setSelectedMapMarker}
                    getMapMarkerType={functions.getMapMarkerType}
                    isOwner={data.appUser.myWorldMapIds.includes(worldMap.id)}
                />
            })}
            {(showArticle && selectedMapMarker !== emptyMapMarker) &&
                <ArticleWindow
                    coordinates={{x: selectedMapMarker.xPosition, y: selectedMapMarker.yPosition}}
                    title={selectedMapMarker.name}
                    article={functions.getArticleById(selectedMapMarker.articleId)}
                    closeWindow={handleArticleFrame}
                    updateArticle={functions.updateArticle}
                    isOwner={data.appUser.myWorldMapIds.includes(worldMap.id)}
                />
            }
            {(addNewMapMarker && coordinates.xPosition > 0 && coordinates.yPosition > 0) &&
                <AddMapMarkerForm
                    saveMapMarker={functions.saveMapMarker}
                    worldMapId={worldMap.id}
                    xPosition={coordinates.xPosition}
                    yPosition={coordinates.yPosition}
                    closeAddMapMarkerForm={handleCloseMapMarkerForm}
                    mapMarkerTypes={data.mapMarkerTypes}
                />
            }
            {(showMapMarkerUpdate && selectedMapMarker !== emptyMapMarker) &&
                <MapMarkerUpdateWindow
                    mapMarker={selectedMapMarker}
                    updateMapMarker={updateSelectedMapMarker}
                    deleteMapMarker={functions.deleteMapMarker}
                    closeMapMarkerCard={handleMapMarkerUpdateEnd}
                    setSelectedMapMarker={setSelectedMapMarker}
                    setChangeMapMarkerPosition={setChangeMapMarkerPosition}
                    deleteArticle={functions.deleteArticle}
                    mapMarkerTypes={data.mapMarkerTypes}
                />
            }
        </main>
    )
}
