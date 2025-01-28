import { promises as fs } from "fs";

let carsLightGroupsJson = null;
let pedestrianLightGroupsJson = null;

export async function initData() {
  const carsData =
      await fs.readFile('./db/cars_lightGroups.json', 'utf-8', 'binary');
  const jsonData = JSON.parse(carsData);
  carsLightGroupsJson = jsonData;

  const pedestrianData =
      await fs.readFile('./db/pedestrians_lightGroups.json', 'utf-8', 'binary');
  const pedestrianJsonData = JSON.parse(pedestrianData);
  pedestrianLightGroupsJson = pedestrianJsonData;
}

export function getCarsLightGroups() {
  return carsLightGroupsJson;
}

export function getPedestrianLightGroups() {
  return pedestrianLightGroupsJson;
}