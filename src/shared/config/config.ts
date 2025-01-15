import "dotenv/config";

interface ServerConfig {
    port: number,
    host: string
}

interface DatabaseConfig {
    port: number,
    name: string,
    user: string,
    password: string,
}

interface AppConfig {
    server: ServerConfig,
    database: DatabaseConfig,
}

const CONFIG: AppConfig = {
    server: {
        port: Number(process.env.SERVER_PORT),
        host: process.env.SERVER_HOST || "localhost",
    },
    database: {
        name: process.env.DB_NAME || "testdb",
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "password",
    }
};


export default class ConfigService {
    private static instance: ConfigService;
    private readonly config: AppConfig;

    private constructor() {
        this.config = this.validateConfig(CONFIG);
    }

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    public getConfig(): AppConfig {
        return this.config;
    }

    private validateConfig(config: AppConfig): AppConfig {
        if (!config.server.port || config.server.port < 0) {
            throw new Error("Invalid server port configuration");
        }

        if (!config.database.name) {
            throw new Error("Database name is required");
        }

        // ...

        return config;
    }
}