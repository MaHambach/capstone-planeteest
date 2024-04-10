import {AppUserRole} from "../data/AppUserRole.ts";

export type AppUser = {
    id: string;
    username: string;
    role: AppUserRole;
    myWorldMapIds: string[];
    observedWorldMapIds: string[];
};
