import {emptyMapMarkerType, MapMarkerType} from "../types/MapMarkerType.ts";
import {emptyWorldMap, WorldMap} from "../types/WorldMap.ts";
import {Article, emptyArticle} from "../types/Article.ts";

export function getMapMarkerTypeById(id:string, mapMarkerTypes:MapMarkerType[]):MapMarkerType {
    const mapMarkerTypeWithId:MapMarkerType | undefined = mapMarkerTypes.find((mapMarkerType:MapMarkerType) => mapMarkerType.id === id);
    if(!mapMarkerTypeWithId) console.error("No map marker type with id \"" + id + "\" found.");
    else return mapMarkerTypeWithId;
    return emptyMapMarkerType;
}

export function getWorldMapById(id:string, worldMaps:WorldMap[]):WorldMap {
    const worldMapWithId:WorldMap | undefined = worldMaps.find((worldMap:WorldMap) => worldMap.id === id);
    if(!worldMapWithId) console.error("No world map with id \"" + id + "\" found.");
    else return worldMapWithId;
    return emptyWorldMap;
}

export function getArticleById(id:string, articles:Article[]):Article {
    const articleWithId:Article | undefined = articles.find((article:Article) => article.id === id);
    if(!articleWithId) console.error("No article with id \"" + id + "\" found.");
    else return articleWithId;
    return emptyArticle;
}
