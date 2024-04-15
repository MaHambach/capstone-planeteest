import MapMarkerTypeColorTile from "./MapMarkerTypeColorTile.tsx";
import React from "react";

type MapMarkerTypeColorGalleryProps = {
    colorList: string[];
    setColor: (color:string) => void;
}
export default function MapMarkerTypeColorGallery(props:Readonly<MapMarkerTypeColorGalleryProps>): React.ReactElement {

    return (
        <div className={"mapMarkerTypeColorGallery"}>
            {props.colorList.map((color:string) => {
                return (
                    <MapMarkerTypeColorTile color={color}
                                            key={color}
                                            setColor={props.setColor}
                                            tileSize={50}
                    />
                );
            })}
        </div>
    );
}
