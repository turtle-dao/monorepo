export interface Config {
  pointsEndpoint: string;
  indexerEndpoint: string;
}

export const defaultConfig: Config = {
  pointsEndpoint: "https://points.turtle.club/new",
  indexerEndpoint: "https://index.turtle.vision",
};
