export type AppUserDto = {
    username: string;
    password: string;
    role: string;
};

export const emptyAppUserDto: AppUserDto = {
    username: '',
    password: '',
    role: ''
};
