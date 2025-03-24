import { getIntersectionsData } from "../db/db.js";

export default {
  getAllIntersectionLocations: async (req, res) => {
    const result = getIntersectionsData();
    res.status(201).json(result);
  },
}