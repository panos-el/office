export interface Credentials {
    username: string;
    email: string;
    password: string;
    rememberMe: boolean;
    usernamesEnabled?: boolean;
    captchaCode?: string;
    captchaImage?: string;
    captchaEnabled: boolean;
}