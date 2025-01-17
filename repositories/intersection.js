import axios from "axios";
import { promises as fs } from "fs";

export default {
  getIntersectionData: async (params) => {
    const response = await axios.get(
      process.env.INTERSECTIONS_URL + '/tre' + params.liva_nro, {
        headers: {
          'User-Agent': 'TreTraffic',
        },
      }
    );
    const signalGroupData = response.data.signalGroup;

    const lightGroupsData = await fs.readFile('db/cars_lightGroups.json', 'utf-8', 'binary');
    const jsonData = JSON.parse(lightGroupsData); 
    const lightgroups = jsonData[params.liva_nro];

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

  getAllUsersData: async (req, res) => {
    try {
      const userData = await userRepo.getAllUsersData();
      res.status(201).json(userData);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
}