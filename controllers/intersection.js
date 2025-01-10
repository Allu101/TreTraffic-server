
export default {
  getUserData: async (req, res) => {
    try {
      const userData = await userRepo.getUserData(req.params);
      res.status(201).json(userData);
    } catch (error) {
      respond.withError(res, error);
    }
  },

  getAllUsersData: async (req, res) => {
    try {
      const userData = await userRepo.getAllUsersData();
      res.status(201).json(userData);
    } catch (error) {
      respond.withError(res, error);
    }
  },
}