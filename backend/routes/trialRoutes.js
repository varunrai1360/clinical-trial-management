// const express = require("express");
// const { createTrial, getTrials, updateTrial, deleteTrial } = require("../controllers/trialController");
// const authMiddleware = require("../middleware/authMiddleware");
// const router = express.Router();

// router.post("/", authMiddleware, createTrial);
// router.get("/", authMiddleware, getTrials);
// router.put("/:id", authMiddleware, updateTrial);
// router.delete("/:id", authMiddleware, deleteTrial);

// module.exports = router;

const express = require("express");
const { createTrial, getTrials, updateTrial, deleteTrial } = require("../controllers/trialController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected trial routes
router.post("/", authMiddleware, createTrial);
router.get("/", authMiddleware, getTrials);
router.put("/:id", authMiddleware, updateTrial);
router.delete("/:id", authMiddleware, deleteTrial);

module.exports = router;
