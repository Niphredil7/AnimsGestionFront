export interface Token {
    token:string,
    type:TokenType,
    userId:string,
}

export type TokenType = "REFRESH_TOKEN" | "ACTIVATE_ACCOUNT" | "RESET_PASSWORD"
