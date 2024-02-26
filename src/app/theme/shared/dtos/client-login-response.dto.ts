export interface ClientLoginResponseDto {
    uid: string;
    lastLogin: string;
    defaultPage: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoUrl: string;
    status: string;
    dreNumber: string;
    roles: string[];
    bucket?: string;
}
