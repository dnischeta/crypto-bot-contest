declare namespace NodeJS {
    export interface ProcessEnv {
        CRYPTO_PAY_TOKEN: string
        CRYPTO_PAY_API_URL: string
        BOT_TOKEN: string
        WEB_APP_URL: string
        MINI_APP_URL: string
        DB_REPLICAS_SET: string
        DB_NAME: string
        DB_USER: string
        DB_PASS: string
        DB_CERT_PATH: string
        DB_HOST: string
    }
}
