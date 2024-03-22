import {MapMarker} from "../../../../types/MapMarker.ts";

type ToolBarProps = {
    mapMarker: MapMarker;
}

export default function ToolBar(props:Readonly<ToolBarProps>): React.ReactElement {
    return (
        <div>
            <h1>{props.mapMarker.name}</h1>
            <p>Here we compare code snippets from different files.</p>
            <p>For example, we can compare the following code snippets:</p>
            <ul>
                <li>frontend/src/components/mapMarker/parts/ToolBar/ToolBar.tsx</li>
                <li>frontend/src/components/product/main/ProductUpdate.tsx</li>
                <li>frontend/src/components/worldMap/main/WorldMapMain.tsx</li>
                <li>frontend/src/components/mapMarker/parts/AddMapMarkerForm.tsx</li>
                <li>frontend/src/hooks/useMapMarkers.ts</li>
            </ul>
        </div>
    )
}