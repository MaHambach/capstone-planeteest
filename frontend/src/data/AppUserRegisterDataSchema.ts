import * as yup from 'yup';

export const AppUserRegisterDataSchema = yup.object().shape({
    username: yup
        .string()
        .required("Benutzername darf nicht leer sein.")
        .min(6, "Benutzername muss mindesten 6 Zeichen lang sein."),
    password: yup
        .string()
        .required("Password darf nicht leer sein.")
        .min(8, "Password muss mindesten 8 Zeichen lang sein.")
        .matches(/^(?=.*[a-z])/, "Password muss einen Kleinbuchstaben enthalten.")
        .matches(/^(?=.*[A-Z])/, "Password muss einen Großbuchstaben enthalten.")
        .matches(/^(?=.*\d)/, "Password muss eine Ziffer enthalten.")
        .matches(/^(?=.*[|_!@#$%^&*])/, "Password muss ein Sonderzeichen enthalten (|_!@#$%^&*).")
});

export interface AppUserRegisterFormError {
    username?: string;
    password?: string;
}

