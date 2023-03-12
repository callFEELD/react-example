import { MeasurementApi, StationApi, WaterApi } from "./api/apis";

export const stations = new StationApi()
export const measurement = new MeasurementApi()
export const water = new WaterApi()