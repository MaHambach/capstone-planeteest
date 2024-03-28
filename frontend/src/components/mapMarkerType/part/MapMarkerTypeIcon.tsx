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
    GiAbstract097,
    GiAgave,
    GiAlienEgg,
    GiAlienSkull,
    GiAncientColumns,
    GiAncientRuins,
    GiAncientSword,
    GiAngelWings,
    GiAnimalSkull,
    GiAnvilImpact,
    GiArcheryTarget,
    GiArchiveResearch,
    GiArmorVest,
    GiArrowCluster,
    GiAsteroid,
    GiAxeSword, GiBank, GiBarbute, GiBarn,
    GiBarracksTent, GiBirdCage, GiBroccoli,
    GiBurningEmbers,
    GiBurningMeteor,
    GiCampingTent,
    GiCarrion,
    GiCastle,
    GiCastleRuins,
    GiChessRook,
    GiCrownedSkull,
    GiCryptEntrance,
    GiCrystalGrowth,
    GiDaemonSkull,
    GiDamagedHouse,
    GiDeadWood,
    GiDeathNote,
    GiDeathZone,
    GiDoorway,
    GiDungeonGate,
    GiElvenCastle,
    GiEmberShot,
    GiFairy,
    GiField,
    GiFireShrine,
    GiForestCamp,
    GiFruitBowl,
    GiFuji,
    GiFurnace,
    GiGoblinHead,
    GiGoldMine,
    GiGranary,
    GiGraveyard,
    GiHangingSign,
    GiHillFort,
    GiHolyOak,
    GiHutsVillage,
    GiInfestedMass,
    GiMagicGate,
    GiMinerals,
    GiOre,
    GiPadlock,
    GiPadlockOpen,
    GiPentacle,
    GiPieceSkull,
    GiPlaneWing,
    GiStoneTower,
    GiWaxTablet,
    GiWoodCabin,
    GiWoodenDoor
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
            {iconName === "BsFillStarFill"      && <BsFillStarFill className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStar"              && <BsStar className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStarFill"          && <BsStarFill className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStarHalf"          && <BsStarHalf className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGem"               && <BsGem className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsTree"              && <BsTree className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsTreeFill"          && <BsTreeFill className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
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
            {iconName === "GiAnimalSkull" && <GiAnimalSkull className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAbstract097" && <GiAbstract097  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}

            {iconName === "GiAgave" && <GiAgave  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAlienSkull" && <GiAlienSkull  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAlienEgg" && <GiAlienEgg  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAnvilImpact" && <GiAnvilImpact  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiArchiveResearch" && <GiArchiveResearch  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiArcheryTarget" && <GiArcheryTarget  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiArrowCluster" && <GiArrowCluster  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiArmorVest" && <GiArmorVest  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAsteroid" && <GiAsteroid  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAxeSword" && <GiAxeSword  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBank" && <GiBank  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBarbute" && <GiBarbute  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBarn" && <GiBarn  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBirdCage" && <GiBirdCage  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBroccoli" && <GiBroccoli  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBurningEmbers" && <GiBurningEmbers  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBurningMeteor" && <GiBurningMeteor  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCampingTent" && <GiCampingTent  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCarrion" && <GiCarrion  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCastle" && <GiCastle  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCastleRuins" && <GiCastleRuins  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCrownedSkull" && <GiCrownedSkull  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDamagedHouse" && <GiDamagedHouse  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDaemonSkull" && <GiDaemonSkull  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDeathNote" && <GiDeathNote  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDeathZone" && <GiDeathZone  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDeadWood" && <GiDeadWood  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiEmberShot" && <GiEmberShot  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiElvenCastle" && <GiElvenCastle  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFairy" && <GiFairy  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiField" && <GiField  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFireShrine" && <GiFireShrine  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiForestCamp" && <GiForestCamp  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFruitBowl" && <GiFruitBowl  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFurnace" && <GiFurnace  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiGoblinHead" && <GiGoblinHead  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiGranary" && <GiGranary  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiHangingSign" && <GiHangingSign  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiHillFort" && <GiHillFort  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiHolyOak" && <GiHolyOak  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiHutsVillage" && <GiHutsVillage  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiInfestedMass" && <GiInfestedMass  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiMinerals" && <GiMinerals  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiOre" && <GiOre  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPadlock" && <GiPadlock  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPadlockOpen" && <GiPadlockOpen  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPieceSkull" && <GiPieceSkull  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiStoneTower" && <GiStoneTower  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiWaxTablet" && <GiWaxTablet  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiWoodCabin" && <GiWoodCabin  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiWoodenDoor" && <GiWoodenDoor  className={"mapMarkerTypeIcon"} style={mapMarkerTypeIconStyle}/>}
        </>
    )
}



// <GetIcon icon="FaHome" color="#844452" />
