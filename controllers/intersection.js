import intersectionRepo from "../repositories/intersection.js";

export default {
  getIntersectionData: async (req, res) => {
    try {
      const data = await intersectionRepo.getIntersectionData(req.params);

      res.status(201).json(data);
    } catch (error) {
      console.log('error in intersection controller');
      res.status(404).json(error.message);
    }
  },

  getLightGroupsData: async (req, res) => {
    try {
      const data = await intersectionRepo.getLightGroupsData(req.params);
      res.status(201).json(data);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
}