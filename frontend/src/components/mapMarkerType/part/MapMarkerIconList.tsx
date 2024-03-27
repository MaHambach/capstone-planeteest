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
}
export default function GetIcon(props:Readonly<GetIconProps>):React.ReactElement {
    const iconName:string = props.iconName;
    const filterString:string = "drop-shadow(0 0 2px " + props.color + ")";

    return (
        <>
            {iconName === "BsGeoFill"           && <BsGeoFill           className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "FaDungeon"           && <FaDungeon           className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "FaFistRaised"        && <FaFistRaised        className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "FaChurch"            && <FaChurch            className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "AiFillPushpin"       && <AiFillPushpin       className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsGeoAlt"            && <BsGeoAlt            className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsGeoAltFill"        && <BsGeoAltFill        className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsGeo"               && <BsGeo               className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}


            {iconName === "BsGeoFill"           && <BsGeoFill           className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsPin"               && <BsPin               className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsPinAngle"          && <BsPinAngle          className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsPinAngleFill"      && <BsPinAngleFill      className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsPinFill"           && <BsPinFill           className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsPinMap"            && <BsPinMap            className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsPinMapFill"        && <BsPinMapFill        className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}


            {iconName === "BsFillHouseFill"     && <BsFillHouseFill     className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "AiFillHome"          && <AiFillHome          className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsHouse"             && <BsHouse             className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsHouseDoor"         && <BsHouseDoor         className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsHouseDoorFill"     && <BsHouseDoorFill     className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsHouseFill"         && <BsHouseFill         className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}


            {iconName === "BsFillGearFill"      && <BsFillGearFill className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsGear"              && <BsGear className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsGearFill"          && <BsGearFill className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsGearWide"          && <BsGearWide className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsGearWideConnected" && <BsGearWideConnected className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}


            {iconName === "BsFillStarFill" && <BsFillStarFill className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsStar" && <BsStar className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsStarFill" && <BsStarFill className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsStarHalf" && <BsStarHalf className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}


            {iconName === "BsGem" && <BsGem className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}


            {iconName === "BsTree" && <BsTree className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "BsTreeFill" && <BsTreeFill className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}


            {iconName === "GiAncientColumns" && <GiAncientColumns className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiAncientRuins" && <GiAncientRuins className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiAncientSword" && <GiAncientSword className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}


            {iconName === "GiChessRook" && <GiChessRook className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}

            {iconName === "GiCrystalGrowth" && <GiCrystalGrowth className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}

            {iconName === "GiDoorway" && <GiDoorway className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiDungeonGate" && <GiDungeonGate className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}

            {iconName === "GiFuji" && <GiFuji className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiGoldMine" && <GiGoldMine className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiGraveyard" && <GiGraveyard className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiMagicGate" && <GiMagicGate className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiPentacle" && <GiPentacle className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiAngelWings" && <GiAngelWings className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiBarracksTent" && <GiBarracksTent className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiCryptEntrance" && <GiCryptEntrance className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "FaAnkh" && <FaAnkh className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}

            {iconName === "GiPlaneWing" && <GiPlaneWing className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
            {iconName === "GiAbstract024" && <GiAbstract024 className={"mapMarkerTypeIcon"} style={{filter: filterString}}/>}
      </>
    )
}

export const mapMarkerTypeIconList:string[] = [
    "BsGeoFill",
    "FaDungeon",
    "FaFistRaised",
    "FaChurch",
    "AiFillPushpin",
    "BsGeoAlt",
    "BsGeoAltFill",
    "BsGeo",
    "BsPin",
    "BsPinAngle",
    "BsPinAngleFill",
    "BsPinFill",
    "BsPinMap",
    "BsPinMapFill",
    "BsFillHouseFill",
    "AiFillHome",
    "BsHouse",
    "BsHouseDoor",
    "BsHouseDoorFill",
    "BsHouseFill",
    "BsFillGearFill",
    "BsGear",
    "BsGearFill",
    "BsGearWide",
    "BsGearWideConnected",
    "BsFillStarFill",
    "BsStar",
    "BsStarFill",
    "BsStarHalf",
    "BsGem",
    "BsTree",
    "BsTreeFill",
    "GiAncientColumns",
    "GiAncientRuins",
    "GiAncientSword",
    "GiChessRook",
    "GiCrystalGrowth",
    "GiDoorway",
    "GiDungeonGate",
    "GiFuji",
    "GiGoldMine",
    "GiGraveyard",
    "GiMagicGate",
    "GiPentacle",
    "GiAngelWings",
    "GiBarracksTent",
    "GiCryptEntrance",
    "FaAnkh",
    "GiPlaneWing",
    "GiAbstract024"
]

// <GetIcon icon="FaHome" color="#844452" />
