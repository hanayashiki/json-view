export interface Config {
  serverUrl: string;
}

export const developmentConfig: Config = {
  serverUrl: "http://localhost:4000",
};

export const productionConfig: Config = {
  serverUrl: "", // Should be hosted under the same host
};

export const config =
  localStorage.getItem("mode") === "production" || import.meta.env.PROD
    ? productionConfig
    : developmentConfig;
