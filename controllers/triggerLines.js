import { getTriggerLinesData } from "../db/db.js";

export default {
  getAllTriggerLines: async (req, res) => {
    try {
      const routesData = getTriggerLinesData();
      res.status(201).json(routesData);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
}