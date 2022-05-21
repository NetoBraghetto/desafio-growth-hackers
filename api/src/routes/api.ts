import { Router } from "express";

const api = Router();

api.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

export default api;
