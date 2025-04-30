const express = require('express');
const router = express.Router();
const carRouter = require("./car.route");
const serviceRouter = require("./service.route");

router.get("/", async (req, res) => {
  res.send({
    status: "success",
    message: "server is running"
  })
})
router.use("/cars", carRouter);
router.use("/services", serviceRouter);

module.exports = router;