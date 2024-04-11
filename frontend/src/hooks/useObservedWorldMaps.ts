import {useState} from "react";
import axios from "axios";

export function useObservedWorldMapIds() {
    const [observedWorldMapIds, setObservedWorldMapIds] = useState<string[]>([]);

    function fetchObservedWorldMapIds():void {
        axios.get("/api/users/me")
            .then(response => {
                setObservedWorldMapIds(response.data.observedWorldMapIds);
            })
            .catch(e => {
                console.error(e)
            });
    }

    return {
        observedWorldMapIds,
        fetchObservedWorldMapIds
    }
}
