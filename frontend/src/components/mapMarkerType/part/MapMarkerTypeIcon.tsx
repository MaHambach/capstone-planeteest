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
    GiCastleRuins, GiCaveEntrance,
    GiChessRook,
    GiCrownedSkull,
    GiCryptEntrance,
    GiCrystalGrowth,
    GiDaemonSkull,
    GiDamagedHouse,
    GiDeadWood,
    GiDeathNote,
    GiDeathZone, GiDeerHead,
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
    GiPlaneWing, GiSpikedDragonHead,
    GiStoneTower,
    GiWaxTablet,
    GiWoodCabin,
    GiWoodenDoor
} from "react-icons/gi";

type MapMarkerTypeIconProps = {
    iconName: string;
    color: string;
    tileSize: number;
}
export default function MapMarkerTypeIcon(props:Readonly<MapMarkerTypeIconProps>):React.ReactElement {
    const iconName:string = props.iconName;
    const mapMarkerTypeIconStyle = {
        filter: "drop-shadow(0 0 8px white) drop-shadow(0 0 4px " + props.color + ")",
        width: props.tileSize,
        height: props.tileSize
    }

    return (
        <>
            {iconName === "FaDungeon"           && <FaDungeon           style={mapMarkerTypeIconStyle}/>}
            {iconName === "FaFistRaised"        && <FaFistRaised        style={mapMarkerTypeIconStyle}/>}
            {iconName === "FaChurch"            && <FaChurch            style={mapMarkerTypeIconStyle}/>}
            {iconName === "AiFillPushpin"       && <AiFillPushpin       style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGeoAlt"            && <BsGeoAlt            style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGeoAltFill"        && <BsGeoAltFill        style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGeo"               && <BsGeo               style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGeoFill"           && <BsGeoFill           style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPin"               && <BsPin               style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinAngle"          && <BsPinAngle          style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinAngleFill"      && <BsPinAngleFill      style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinFill"           && <BsPinFill           style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinMap"            && <BsPinMap            style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsPinMapFill"        && <BsPinMapFill        style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsFillHouseFill"     && <BsFillHouseFill     style={mapMarkerTypeIconStyle}/>}
            {iconName === "AiFillHome"          && <AiFillHome          style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsHouse"             && <BsHouse             style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsHouseDoor"         && <BsHouseDoor         style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsHouseDoorFill"     && <BsHouseDoorFill     style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsHouseFill"         && <BsHouseFill         style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsFillGearFill"      && <BsFillGearFill style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGear"              && <BsGear style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGearFill"          && <BsGearFill style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGearWide"          && <BsGearWide style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGearWideConnected" && <BsGearWideConnected style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsFillStarFill"      && <BsFillStarFill style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStar"              && <BsStar style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStarFill"          && <BsStarFill style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsStarHalf"          && <BsStarHalf style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsGem"               && <BsGem style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsTree"              && <BsTree style={mapMarkerTypeIconStyle}/>}
            {iconName === "BsTreeFill"          && <BsTreeFill style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAncientColumns" && <GiAncientColumns style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAncientRuins" && <GiAncientRuins style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAncientSword" && <GiAncientSword style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiChessRook" && <GiChessRook style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCrystalGrowth" && <GiCrystalGrowth style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDoorway" && <GiDoorway style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDungeonGate" && <GiDungeonGate style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFuji" && <GiFuji style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiGoldMine" && <GiGoldMine style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiGraveyard" && <GiGraveyard style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiMagicGate" && <GiMagicGate style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPentacle" && <GiPentacle style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAngelWings" && <GiAngelWings style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBarracksTent" && <GiBarracksTent style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCryptEntrance" && <GiCryptEntrance style={mapMarkerTypeIconStyle}/>}
            {iconName === "FaAnkh" && <FaAnkh style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPlaneWing" && <GiPlaneWing style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAbstract024" && <GiAbstract024 style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAnimalSkull" && <GiAnimalSkull style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAbstract097" && <GiAbstract097  style={mapMarkerTypeIconStyle}/>}

            {iconName === "GiAgave" && <GiAgave  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAlienSkull" && <GiAlienSkull  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAlienEgg" && <GiAlienEgg  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAnvilImpact" && <GiAnvilImpact  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiArchiveResearch" && <GiArchiveResearch  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiArcheryTarget" && <GiArcheryTarget  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiArrowCluster" && <GiArrowCluster  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiArmorVest" && <GiArmorVest  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAsteroid" && <GiAsteroid  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiAxeSword" && <GiAxeSword  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBank" && <GiBank  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBarbute" && <GiBarbute  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBarn" && <GiBarn  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBirdCage" && <GiBirdCage  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBroccoli" && <GiBroccoli  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBurningEmbers" && <GiBurningEmbers  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiBurningMeteor" && <GiBurningMeteor  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCampingTent" && <GiCampingTent  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCarrion" && <GiCarrion  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCastle" && <GiCastle  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCastleRuins" && <GiCastleRuins  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCrownedSkull" && <GiCrownedSkull  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDamagedHouse" && <GiDamagedHouse  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDaemonSkull" && <GiDaemonSkull  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDeathNote" && <GiDeathNote  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDeathZone" && <GiDeathZone  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDeadWood" && <GiDeadWood  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiEmberShot" && <GiEmberShot  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiElvenCastle" && <GiElvenCastle  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFairy" && <GiFairy  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiField" && <GiField  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFireShrine" && <GiFireShrine  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiForestCamp" && <GiForestCamp  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFruitBowl" && <GiFruitBowl  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiFurnace" && <GiFurnace  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiGoblinHead" && <GiGoblinHead  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiGranary" && <GiGranary  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiHangingSign" && <GiHangingSign  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiHillFort" && <GiHillFort  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiHolyOak" && <GiHolyOak  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiHutsVillage" && <GiHutsVillage  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiInfestedMass" && <GiInfestedMass  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiMinerals" && <GiMinerals  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiOre" && <GiOre  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPadlock" && <GiPadlock  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPadlockOpen" && <GiPadlockOpen  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiPieceSkull" && <GiPieceSkull  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiStoneTower" && <GiStoneTower  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiWaxTablet" && <GiWaxTablet  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiWoodCabin" && <GiWoodCabin  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiWoodenDoor" && <GiWoodenDoor  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiDeerHead" && <GiDeerHead  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiSpikedDragonHead" && <GiSpikedDragonHead  style={mapMarkerTypeIconStyle}/>}
            {iconName === "GiCaveEntrance " && <GiCaveEntrance   style={mapMarkerTypeIconStyle}/>}
        </>
    )
}
