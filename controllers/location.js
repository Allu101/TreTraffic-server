import { getIntersectionsData, getRoutes } from "../db/db.js";

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
    const result = getIntersectionsData();
    res.status(201).json(result);
  },
}