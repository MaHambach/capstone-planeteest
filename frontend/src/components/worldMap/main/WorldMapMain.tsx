import './WorldMapMain.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import WorldMapImage from "../parts/WorldMapImage.tsx";
import {MapMarker} from "../../../types/MapMarker.ts";
import MapMarkerCard from "../../mapMarker/parts/MapMarkerCard.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import ToolBar from "../parts/WorldMapToolMenu/ToolBar.tsx";
import {MapMarkerDto} from "../../../types/MapMarkerDto.ts";
import {Article} from "../../../types/Article.ts";
import ArticleCard from "../../article/parts/ArticleCard.tsx";

type WorldMapMainProps = {
    getWorldMap: (id:string) => WorldMap;
    getMapMarkerType: (id:string) => MapMarkerType;
    mapMarkers: MapMarker[];
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    articles: Article[];
    getArticleById: (id:string) => Article;
};

const initialWorldMap:WorldMap = {
    id: '',
    name: '',
    worldMapUrl: '',
    xSize: 0,
    ySize: 0
};

const initialDisplayedArticle = {
    id: '',
    content: '',
    npcIds: []
};


export default function WorldMapMain(props:Readonly<WorldMapMainProps>):React.ReactElement{
    const {id= ''} = useParams<string>();
    const [worldMap, setWorldMap] = useState<WorldMap>(initialWorldMap);
    const [addNewMapMarker, setAddNewMapMarker] = useState<boolean>(false);
    const [articleIsVisible, setArticleIsVisible] = useState<boolean>(false);
    const [displayedArticle, setDisplayedArticle] = useState<Article>(initialDisplayedArticle);
    const [selectedMapMarker, setSelectedMapMarker] = useState<string>('');

    function handleArticleChange(articleId: string) {
        if(articleId === ''){
            setArticleIsVisible(false);
            setDisplayedArticle(initialDisplayedArticle);
        } else {
            setArticleIsVisible(true);
            setDisplayedArticle(props.getArticleById(articleId));
        }
    }

    function handleMapMarkerDeselection() {
        setSelectedMapMarker('');
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

    }, [id, props]);

    return (
        <main className={"worldMapMain"}>
            <ToolBar
                toggleAddNewMapMarker={toggleAddNewMapMarker}
            />
            <WorldMapImage
                worldMap={worldMap}
                addNewMapMarker={addNewMapMarker}
                saveMapMarker={props.saveMapMarker}
                handleArticleDeselection={handleArticleDeselection}
                handleMapMarkerDeselection={handleMapMarkerDeselection}
            />
            {props.mapMarkers.map((mapMarker:MapMarker) => {
                return <MapMarkerCard
                    key={mapMarker.id}
                    mapMarker={mapMarker}
                    handleArticleChange={handleArticleChange}
                    offsetWorldMapFrame={{xOffset: 100, yOffset: 100}} /* Offset the padding. */
                    isSelected={mapMarker.id === selectedMapMarker}
                    setSelectedMapMarker={setSelectedMapMarker}
                />
            })}
            {articleIsVisible && <ArticleCard article={displayedArticle}/>}
        </main>
    )
}
