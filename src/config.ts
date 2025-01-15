import "dotenv/config";

interface SERVER {
    PORT: number,
    HOST: string
}

interface DATABASE {
    PORT: number,
    NAME: string,
    USER: string,
}

export interface CONFIG {
    server: SERVER,
    database: DATABASE,
}

export const CONFIG: CONFIG = {
    server: {
        PORT: +process.env.PORT! || 5000,
        HOST: process.env.PORT || "localhost",
    },
    database: {
        NAME: process.env.PORT || "testdb",
        PORT: +process.env.PORT! || 5234,
        USER: process.env.PORT || "postgres"
    }
}