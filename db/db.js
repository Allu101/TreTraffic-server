import { promises as fs } from "fs";
import axios from "axios";

let carsLightGroupsJson = null;
let pedestrianLightGroupsJson = null;

let routesJson = null;

let intersectionsData = [];

export async function initData() {
  initFiles();
  initIntersections();
}

export function getCarsLightGroups() {
  return carsLightGroupsJson;
}

export function getIntersectionsData() {
  return intersectionsData;
}

export function getPedestrianLightGroups() {
  return pedestrianLightGroupsJson;
}

export function getTriggerLinesData() {
  return routesJson;
}

async function initFiles() {
  const carsData =
      await fs.readFile('./db/cars_lightGroups.json', 'utf-8', 'binary');
  const jsonData = JSON.parse(carsData);
  carsLightGroupsJson = jsonData;

  const pedestrianData =
      await fs.readFile('./db/pedestrians_lightGroups.json', 'utf-8', 'binary');
  const pedestrianJsonData = JSON.parse(pedestrianData);
  pedestrianLightGroupsJson = pedestrianJsonData;

  const routeTriggersData =
      await fs.readFile('./db/routeTriggers.json', 'utf-8', 'binary');
  const routeTriggersJsonData = JSON.parse(routeTriggersData);
  routesJson = routeTriggersJsonData;
}

async function initIntersections() {
  let intersectionsList = null;
  try {
    const response = await axios.get(process.env.LOCATIONS_URL);
    intersectionsList = response.data.features;
  } catch (error) {
    console.log('error', error);
    intersectionsData = [];
  }
    
  const filtered = intersectionsList.filter((location) => 
      location.properties.tila_kaytossa === 'päällä');

  let result = [];
  filtered.forEach(async (intersectionObj) => {
    if (intersectionObj.geometry !== null) {
      let tempObject = {};
      const livaNro = intersectionObj.properties.liva_nro
      tempObject['id'] = intersectionObj.properties.id;
      tempObject['liva_nro'] = livaNro;

      tempObject['location'] = {};
      tempObject['location'].latitude = intersectionObj.geometry.coordinates[0][1];
      tempObject['location'].longitude = intersectionObj.geometry.coordinates[0][0];

      tempObject['paikka'] = intersectionObj.properties.paikka;
      tempObject['lightGroupsData'] = false;

      try {
        const signalGroupsRes = await axios.get(
          process.env.INTERSECTIONS_URL + '/tre' + livaNro, {
            headers: {
              'User-Agent': 'TreTraffic',
            },
          }
        );
        const signalGroupData = signalGroupsRes.data.signalGroup;
        if (signalGroupData &&
            !signalGroupData[0].status.toString().includes('.')) {
          tempObject['data_available'] = true;
        }
        if (getCarsLightGroups()[livaNro] !== undefined) {
          tempObject['lightGroupsData'] = true;
        }
      } catch (error) {
        tempObject['data_available'] = false;
      }
      result.push(tempObject);
    }
  });
  
  intersectionsData = result;
}