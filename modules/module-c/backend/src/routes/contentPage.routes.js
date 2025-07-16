import express from "express";

import {
  getContentPage,
  getAllContentPage,
} from "../controllers/contentPage.controllers.js";

const router = express.Router();

router.get("/pages", getAllContentPage);
router.get("/page", getContentPage);

export default router;
