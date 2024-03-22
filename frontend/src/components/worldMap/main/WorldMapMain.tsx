import './WorldMapMain.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
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

type WorldMapMainProps = {
    getWorldMap: (id:string) => WorldMap;
    getMapMarkerType: (id:string) => MapMarkerType;
    mapMarkers: MapMarker[];
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    articles: Article[];
    getArticleById: (id:string) => Article;
};


const initialCoordinates = {
    xPosition: -10,
    yPosition: -10
}

export default function WorldMapMain(props:Readonly<WorldMapMainProps>):React.ReactElement{
    const elementRef = useRef(null);
    const {id= ''} = useParams<string>();
    const [coordinates, setCoordinates] = useState(initialCoordinates);
    const [worldMap, setWorldMap] = useState<WorldMap>(emptyWorldMap);
    const [addNewMapMarker, setAddNewMapMarker] = useState<boolean>(false);
    const [articleIsVisible, setArticleIsVisible] = useState<boolean>(false);
    const [displayedArticle, setDisplayedArticle] = useState<Article>(emptyArticle);
    const [selectedMapMarker, setSelectedMapMarker] = useState<MapMarker>(emptyMapMarker);

    function handleWorldMapClick(event: React.MouseEvent<HTMLElement>) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const rect = event.target.getBoundingClientRect();
        handleArticleDeselection();
        handleMapMarkerDeselection();
        if(addNewMapMarker){
            setCoordinates({xPosition: (event.clientX - rect.left), yPosition: (event.clientY - rect.top)});
        }
        console.log("Left? : " + (event.clientX - rect.left) + " ; Top? : " + (event.clientY - rect.top) + ".");
    }

    function handleArticleChange(articleId: string) {
        if(articleId === ''){
            setArticleIsVisible(false);
            setDisplayedArticle(emptyArticle);
        } else {
            setArticleIsVisible(true);
            setDisplayedArticle(props.getArticleById(articleId));
        }
    }

    function handleUpdateMapMarker() {
        console.log("Update Map Marker " + selectedMapMarker.id);
    }

    function handleMapMarkerDeselection() {
        setSelectedMapMarker(emptyMapMarker);
    }

    function handleArticleDeselection() {
        handleArticleChange('');
    }

    function toggleAddNewMapMarker(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        setAddNewMapMarker(!addNewMapMarker);
    }

    useEffect(() => {
        setWorldMap(props.getWorldMap(id))
        if(elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            setSize({width: rect.width, height: rect.height})
        }
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
            {props.mapMarkers.map((mapMarker:MapMarker) => {
                return <MapMarkerCard
                    key={mapMarker.id}
                    mapMarker={mapMarker}
                    handleArticleChange={handleArticleChange}
                    offsetWorldMapFrame={{xOffset: 100, yOffset: 100}} /* Offset the padding. */
                    isSelected={mapMarker.id === selectedMapMarker.id}
                    setSelectedMapMarker={setSelectedMapMarker}
                    handleUpdateMapMarker={handleUpdateMapMarker}
                />
            })}
            {articleIsVisible && <ArticleCard article={displayedArticle}/>}
            {(addNewMapMarker && coordinates.xPosition > 0 && coordinates.yPosition > 0) &&
                <AddMapMarkerForm
                    saveMapMarker={props.saveMapMarker}
                    worldMapId={worldMap.id}
                    xPosition={coordinates.xPosition}
                    yPosition={coordinates.yPosition}
                    closeAddMapMarkerForm={() => setCoordinates(initialCoordinates)}
                    markerTypeId={''} /* For later: When MarkerType is implemented */
                />}
        </main>
    )
}
