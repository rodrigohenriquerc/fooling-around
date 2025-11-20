import { LocationObjectCoords } from "expo-location";

export type Coordinates = Pick<LocationObjectCoords, "latitude" | "longitude">;
