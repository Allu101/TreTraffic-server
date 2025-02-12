import axios from "axios";
import { getRoutes } from "../db/db.js";

export default {
  getAllRouteLocations: async (req, res) => {
    try {
      const routesData = getRoutes();
      res.status(201).json(routesData);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },

  getAllIntersectionLocations: async (req, res) => {
    try {
      const response = await axios.get(process.env.LOCATIONS_URL);
      const locationsData = response.data.features;
      const filtered = locationsData.filter((location) => 
          location.properties.tila_kaytossa === 'päällä');

      let result = [];
      filtered.forEach((locationObj) => {
        if (locationObj.geometry !== null) {
          let tempObject = {};
          tempObject['id'] = locationObj.properties.id;
          tempObject['liva_nro'] = locationObj.properties.liva_nro;

          tempObject['location'] = {};
          tempObject['location'].latitude = locationObj.geometry.coordinates[0][1];
          tempObject['location'].longitude = locationObj.geometry.coordinates[0][0];

          tempObject['paikka'] = locationObj.properties.paikka;

          result.push(tempObject);
        }
      });
      res.status(201).json(result);
    } catch (error) {
      console.log('error', error);
      res.status(404).json(error.message);
    }
  },
}