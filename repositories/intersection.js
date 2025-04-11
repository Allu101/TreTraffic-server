import axios from "axios";
import { getCarsLightGroups } from "../db/db.js";

async function getLightGroup(intersectionNro, lightGroupNro) {
  if (intersectionNro === undefined || lightGroupNro === undefined) {
    return null;
  }

  const response = await axios.get(
    process.env.INTERSECTIONS_URL + '/tre' + intersectionNro, {
      headers: {
        'User-Agent': 'TreTraffic',
      },
    }
  );
  
  const signalGroupData = response.data.signalGroup;
  const lightGroupsJson = getCarsLightGroups();
  const lightgroups = lightGroupsJson[intersectionNro];

  if (!lightgroups) {
    return {};
  }

  let result = {};
  for (const [key, value] of Object.entries(lightgroups)) {
    if (key === lightGroupNro) {
      result = {
        name: value.displayname ? value.displayname : value.name,
        lights: value.lights.map((light) => {
          const signalGroup =  signalGroupData.find((signalGroup) => signalGroup.name === light.split(';')[0]);
          return {
            id: signalGroup.name,
            state: signalGroup.status,
            type: light.split(';')[1],
          };
        })
      };
    }
  }
  return result;
}

export default {
  getIntersectionData: async (params) => {
    if (params.liva_nro === undefined) {
      return [];
    }

    const response = await axios.get(
      process.env.INTERSECTIONS_URL + '/tre' + params.liva_nro, {
        headers: {
          'User-Agent': 'TreTraffic',
        },
      }
    );
    const signalGroupData = response.data.signalGroup;

    const lightGroupsJson = getCarsLightGroups();
    const lightgroups = lightGroupsJson[params.liva_nro];

    if (!lightgroups) {
      return [];
    }

    const result = [];
    for (const [key, value] of Object.entries(lightgroups)) {
      result.push({
        name: value.displayname ? value.displayname : value.name,
        lights: value.lights.map((light) => {
          const signalGroup =  signalGroupData.find((signalGroup) => signalGroup.name === light.split(';')[0]);
          return {
            id: signalGroup.name,
            state: signalGroup.status,
            type: light.split(';')[1],
          };
        })
      });
    }
    return result;
  },

  getLightGroupsData: async (params) => {
    const data = []
    const lightgroupsQuery = params.idQuery;
    const intersections = lightgroupsQuery.split(',');

    for (const intersection of intersections) {
      const split = intersection.split(':');
      const intersectionNro = split[0];
      const lightGroups = split[1].split(';');
      for (const lightGroupNro of lightGroups) {
        const lightGroupData = await getLightGroup(intersectionNro, lightGroupNro);
        data.push(lightGroupData);
      }
    }

    return data;
  },
}