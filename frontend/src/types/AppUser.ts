export type AppUser = {
    id: string;
    username: string;
    password: string;
    role: string;
};

export const emptyAppUser: AppUser = {
    id: '',
    username: '',
    password: '',
    role: ''
};
