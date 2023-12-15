const express = require("express");
const {
  createRequest,
  getAllRequests,
} = require("../controllers/requestController");
const router = express.Router();

// GET - /api/v1/requests
router.get("/", getAllRequests);

// POST - /api/v1/requests/
router.post("/", createRequest);

module.exports = router;
