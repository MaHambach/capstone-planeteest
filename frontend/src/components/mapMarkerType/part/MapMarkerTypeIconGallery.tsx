import React from "react";
import MapMarkerTypeIconTile from "./MapMarkerTypeIconTile.tsx";

type MapMarkerTypeIconGalleryProps = {
    iconList: string[];
    setIcon: (icon:string) => void;
}
export default function MapMarkerTypeIconGallery(props:Readonly<MapMarkerTypeIconGalleryProps>): React.ReactElement {

    return (
        <div className={"mapMarkerTypeIconGallery"}>
            {props.iconList.map((icon:string) => {
                return (
                    <MapMarkerTypeIconTile
                        key={icon}
                        iconName={icon}
                        handleClick={props.setIcon}
                        tileSize={50}
                    />
                );
            })}
        </div>
    );
}
