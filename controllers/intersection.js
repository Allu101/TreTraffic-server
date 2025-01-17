import intersectionRepo from "../repositories/intersection.js";

export default {
  getIntersectionData: async (req, res) => {
    try {
      const data = await intersectionRepo.getIntersectionData(req.params);

      res.status(201).json(data);
    } catch (error) {
      console.log('error', error);
      res.status(404).json(error.message);
    }
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