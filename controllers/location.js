import axios from "axios";

export default {
  getUserData: async (req, res) => {
    try {
      //const userData = await userRepo.getUserData(req.params);
      //res.status(201).json(userData);
    } catch (error) {
      //respond.withError(res, error);
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