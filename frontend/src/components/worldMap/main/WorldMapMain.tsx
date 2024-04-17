import './WorldMapMain.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import WorldMapImage from "../parts/WorldMapImage.tsx";
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import MapMarkerDraggable from "../../mapMarker/parts/worldMapMarker/MapMarkerDraggable.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import WorldMapToolBar from "../WorldMapToolMenu/WorldMapToolBar.tsx";
import {MapMarkerDto} from "../../../types/MapMarkerDto.ts";
import {Article} from "../../../types/Article.ts";
import AddMapMarkerForm from "../../mapMarker/parts/AddMapMarkerForm.tsx";
import UpdateMapMarkerWindow from "../../mapMarker/parts/UpdateMapMarkerWindow.tsx";
import ArticleWindow from "../../article/parts/ArticleWindow.tsx";
import {AppUser} from "../../../types/AppUser.ts";
import {getArticleById, getWorldMapById} from "../../../utility/getById.ts";

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

    useEffect(():void => {
        setWorldMap(getWorldMapById(id, data.worldMaps))
        // eslint-disable-next-line
    }, [id, data]);

    return (
        <main className={"worldMapMain"}>
            { data.appUser.myWorldMapIds.includes(worldMap.id) &&
                <WorldMapToolBar
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
                return <MapMarkerDraggable
                    key={mapMarker.id}
                    data={{mapMarkerTypes: data.mapMarkerTypes}}
                    functions={{
                        handleArticleFrame: handleArticleFrame,
                        handleMapMarkerUpdate: handleMapMarkerUpdate,
                        handleSelectedMapMarkerChange: handleSelectedMapMarkerChange,
                        setSelectedMapMarker: setSelectedMapMarker
                    }}
                    props={{
                        mapMarker: mapMarker,
                        offsetWorldMapFrame: {xOffset: 100, yOffset: 100},
                        isSelected: mapMarker.id === selectedMapMarker.id,
                        isMovable: mapMarker.id === selectedMapMarker.id && changeMapMarkerPosition,
                        isOwner: data.appUser.myWorldMapIds.includes(worldMap.id)
                    }}
                />
            })}
            {(showArticle && selectedMapMarker !== emptyMapMarker) &&
                <ArticleWindow
                    props={{
                        coordinates: {x: selectedMapMarker.xPosition, y: selectedMapMarker.yPosition},
                        gmArticle: getArticleById(selectedMapMarker.gmArticleId, data.articles),
                        playerArticle: getArticleById(selectedMapMarker.playerArticleId, data.articles),
                        title: selectedMapMarker.name,
                        isOwner: data.appUser.myWorldMapIds.includes(worldMap.id)
                    }}
                    functions={{
                        updateArticle: functions.updateArticle,
                        closeWindow: handleArticleFrame
                    }}
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
                <UpdateMapMarkerWindow
                    data={{mapMarkerTypes: data.mapMarkerTypes}}
                    functions={{
                        updateMapMarker: updateSelectedMapMarker,
                        deleteMapMarker: functions.deleteMapMarker,
                        closeMapMarkerCard: handleMapMarkerUpdateEnd,
                        setSelectedMapMarker: setSelectedMapMarker,
                        setChangeMapMarkerPosition: setChangeMapMarkerPosition
                    }}
                    props={{mapMarker: selectedMapMarker}}
                />
            }
        </main>
    )
}
