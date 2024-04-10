const express = require("express");
const userService = require("../service/user");
const checker = require("../utils/is_valid_checker");
const authenticate = require("../middlewares/authentication");

const router = express.Router();

router.get("/users", authenticate, async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.patch("/users/:id", authenticate, async (req, res, next) => {
    try {
      const id = req.params.id;
  
      var paramsToUpdate = {};
  
      const patientName = req.body.patientName;
      if (
        patientName !== undefined &&
        checker.isValidString("patientName", patientName)
      )
        paramsToUpdate.patientName = patientName;
  
      const phoneNumber = req.body.phoneNumber;
      if (
        phoneNumber !== undefined &&
        checker.isValidString("phoneNumber", phoneNumber)
      )
        paramsToUpdate.phoneNumber = phoneNumber;
  
      const startDate = req.body.startDate;
      if (startDate !== undefined && checker.isValidDate("startDate", startDate))
        paramsToUpdate.startDate = startDate;
  
      const endDate = req.body.endDate;
      if (endDate !== undefined && checker.isValidString("endDate", endDate))
        paramsToUpdate.endDate = endDate;
  
      const isScheduled = req.body.isScheduled;
      if (isScheduled !== undefined) paramsToUpdate.isScheduled = isScheduled;
  
      const appointmentCompleted = req.body.appointmentCompleted;
      if (appointmentCompleted !== undefined)
        paramsToUpdate.appointmentCompleted = appointmentCompleted;
  
      const appointment = await appointmentService.updateAppointement(
        id,
        paramsToUpdate
      );
      res.send(appointment);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
