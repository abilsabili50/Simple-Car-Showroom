const Service = require("../model/service.model");

module.exports = {
  addService: async (req, res) => {
    try {
      const newService = new Service(req.body);
      await newService.save();
      sendResponse(res, 201, "New service created successfully", newService);
    } catch (error) {
      handleError(res, error);
    }
  },

  getServicesByCarId: async (req, res) => {
    try {
      const { carId } = req.params;
      const services = await Service.find({ carId });
      sendResponse(res, 200, "Services found", services);
    } catch (error) {
      handleError(res, error);
    }
  },

  deleteService: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedService = await Service.findByIdAndDelete(id);

      if (!deletedService) {
        return sendResponse(res, 404, "Service not found");
      }

      sendResponse(res, 200, "Service deleted successfully", deletedService);
    } catch (error) {
      handleError(res, error);
    }
  },
};

// Helper functions to avoid repetition

const sendResponse = (res, statusCode, message, data = null) => {
  const response = { status: statusCode === 200 ? "success" : "fail", message };
  if (data) {
    response.data = data;
  }
  res.status(statusCode).send(response);
};

const handleError = (res, error) => {
  res.status(500).send({
    status: "fail",
    message: error.message || "Internal server error",
  });
};
