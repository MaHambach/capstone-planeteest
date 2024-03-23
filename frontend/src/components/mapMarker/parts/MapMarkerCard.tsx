import './MapMarkerCard.css'
import {MapMarker} from "../../../types/MapMarker.ts";
import React, {useMemo} from "react";
import ToolBar from "./ToolBar/ToolBar.tsx";
import {BsGeoAltFill} from "react-icons/bs";
import {IconContext} from "react-icons";


type MapMarkerCardProps = {
    mapMarker: MapMarker;
    handleArticleChange: (articleId:string) => void;
    offsetWorldMapFrame: {xOffset:number, yOffset:number};
    isSelected:boolean;
    handleSelectedMapMarkerChange: (mapMarker:MapMarker) => void;
    handleUpdateMapMarker: () => void;
}

export default function MapMarkerCard(props: Readonly<MapMarkerCardProps>): React.ReactElement {
    const mapIconSize={xSize: 80, ySize: 80};
    const iconContextObj = useMemo(() => ({className: 'mapMarkerIcon'}), []); // value is cached by useMemo

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        props.handleArticleChange(props.mapMarker.articleId);
        props.handleSelectedMapMarkerChange(props.mapMarker);
        console.log("Click");
    }

    return (
        <div className={"mapMarkerCard"}>
            {props.isSelected &&
                <h2
                    className={"mapMarkerName"}
                    style={{
                        position:"absolute",
                        left: (props.offsetWorldMapFrame.xOffset + props.mapMarker.xPosition - 0.5 * mapIconSize.xSize), /* Might depend on MapMarkerType */
                        top: (props.offsetWorldMapFrame.yOffset + props.mapMarker.yPosition - mapIconSize.ySize -10) /* Might depend on MapMarkerType */
                }}>
                    {props.mapMarker.name}
                </h2>
            }
            <IconContext.Provider value={iconContextObj}>
                <button className={props.isSelected ? "mapMarkerCardImageSelected" : "mapMarkerCardImage"}
                     onClick={handleClick}
                     style={{
                         position:"absolute",
                         left: props.offsetWorldMapFrame.xOffset + props.mapMarker.xPosition - 0.5 * mapIconSize.xSize, /* Might depend on MapMarkerType */
                         top: props.offsetWorldMapFrame.yOffset + props.mapMarker.yPosition - 0.5 * mapIconSize.ySize   /* Might depend on MapMarkerType */
                }}>
                    <BsGeoAltFill />
                </button>
            </IconContext.Provider>

            {props.isSelected &&
                <ToolBar handleUpdateMapMarker={props.handleUpdateMapMarker}
                         offsetMapMarkerCard={
                                {
                                    xSize:(0.5 * props.offsetWorldMapFrame.xOffset + props.mapMarker.xPosition),
                                    ySize:(1.5 * props.offsetWorldMapFrame.yOffset + props.mapMarker.yPosition +5)
                                }
                            }
            />}
        </div>
    )
}
