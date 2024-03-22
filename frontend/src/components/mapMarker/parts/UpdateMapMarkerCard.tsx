import {MapMarker} from "../../../types/MapMarker.ts";

type UpdateMapMarkerCardProps = {
    mapMarker: MapMarker;
    updateMapMarker: (mapMarker: MapMarker) => void;
    closeMapMarkerCard: () => void;
}
export default function UpdateMapMarkerCard(props:Readonly<UpdateMapMarkerCardProps>)