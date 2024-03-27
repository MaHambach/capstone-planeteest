import {
    BsFillGearFill,
    BsFillHouseFill, BsFillStarFill, BsGear, BsGearFill, BsGearWide, BsGearWideConnected, BsGem,
    BsGeo,
    BsGeoAlt,
    BsGeoAltFill,
    BsGeoFill, BsHouse, BsHouseDoor, BsHouseDoorFill, BsHouseFill,
    BsPin,
    BsPinAngle,
    BsPinAngleFill,
    BsPinFill,
    BsPinMap, BsPinMapFill, BsStar, BsStarFill, BsStarHalf, BsTree, BsTreeFill
} from "react-icons/bs";
import React from "react";
import {FaAnkh, FaChurch, FaDungeon, FaFistRaised} from "react-icons/fa";
import {AiFillHome, AiFillPushpin} from "react-icons/ai";
import {
    GiAbstract024,
    GiAncientColumns,
    GiAncientRuins,
    GiAncientSword, GiAngelWings, GiBarracksTent,
    GiChessRook, GiCryptEntrance,
    GiCrystalGrowth,
    GiDoorway, GiDungeonGate, GiFuji, GiGoldMine, GiGraveyard, GiMagicGate, GiPentacle, GiPlaneWing
} from "react-icons/gi";

type GetIconProps = {
    iconName: string;
    color: string;
    tileSize: number;
}
export default function MapMarkerTypeIcon(props:Readonly<GetIconProps>):React.ReactElement {
    const iconName:string = props.iconName;
    const filterString:string = "drop-shadow(0 0 2px " + props.color + ")";
    const mapMarkerTypeIconStyle = {
        filter: filterString,
        width: props.tileSize,
        height: props.tileSize
    }
    
    return (
        <>
            {iconName === "FaDungeon"           && <FaDungeon           className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "FaFistRaised"        && <FaFistRaised        className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "FaChurch"            && <FaChurch            className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "AiFillPushpin"       && <AiFillPushpin       className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGeoAlt"            && <BsGeoAlt            className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGeoAltFill"        && <BsGeoAltFill        className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGeo"               && <BsGeo               className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}


            {iconName === "BsGeoFill"           && <BsGeoFill           className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPin"               && <BsPin               className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinAngle"          && <BsPinAngle          className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinAngleFill"      && <BsPinAngleFill      className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinFill"           && <BsPinFill           className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinMap"            && <BsPinMap            className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinMapFill"        && <BsPinMapFill        className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}


            {iconName === "BsFillHouseFill"     && <BsFillHouseFill     className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "AiFillHome"          && <AiFillHome          className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsHouse"             && <BsHouse             className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsHouseDoor"         && <BsHouseDoor         className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsHouseDoorFill"     && <BsHouseDoorFill     className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsHouseFill"         && <BsHouseFill         className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}


            {iconName === "BsFillGearFill"      && <BsFillGearFill className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGear"              && <BsGear className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGearFill"          && <BsGearFill className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGearWide"          && <BsGearWide className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGearWideConnected" && <BsGearWideConnected className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}


            {iconName === "BsFillStarFill" && <BsFillStarFill className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStar" && <BsStar className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStarFill" && <BsStarFill className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStarHalf" && <BsStarHalf className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}


            {iconName === "BsGem" && <BsGem className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}


            {iconName === "BsTree" && <BsTree className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsTreeFill" && <BsTreeFill className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}


            {iconName === "GiAncientColumns" && <GiAncientColumns className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAncientRuins" && <GiAncientRuins className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAncientSword" && <GiAncientSword className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}


            {iconName === "GiChessRook" && <GiChessRook className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}

            {iconName === "GiCrystalGrowth" && <GiCrystalGrowth className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}

            {iconName === "GiDoorway" && <GiDoorway className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDungeonGate" && <GiDungeonGate className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}

            {iconName === "GiFuji" && <GiFuji className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiGoldMine" && <GiGoldMine className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiGraveyard" && <GiGraveyard className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiMagicGate" && <GiMagicGate className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPentacle" && <GiPentacle className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAngelWings" && <GiAngelWings className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBarracksTent" && <GiBarracksTent className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCryptEntrance" && <GiCryptEntrance className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "FaAnkh" && <FaAnkh className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}

            {iconName === "GiPlaneWing" && <GiPlaneWing className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAbstract024" && <GiAbstract024 className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
      </>
    )
}



// <GetIcon icon="FaHome" color="#844452" />
