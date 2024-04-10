const express = require("express");
const appointmentService = require("../service/appointment");
const checker = require("../utils/is_valid_checker");
const authenticate = require("../middlewares/authentication");

const router = express.Router();

router.post("/appointments", authenticate, async (req, res, next) => {
  try {
    const patientName = req.body.patientName;
    checker.isValidString("patientName", patientName);
    const phoneNumber = req.body.phoneNumber;
    checker.isValidString("phoneNumber", phoneNumber);
    const startDate = req.body.startDate;
    checker.isValidDate("startDate", startDate);
    const endDate = req.body.endDate;
    checker.isValidDate("endDate", endDate);

    const response = await appointmentService.createAppointment(
      patientName,
      phoneNumber,
      startDate,
      endDate
    );
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get("/appointments", authenticate, async (req, res, next) => {
  try {
    const startDate = req.query.startDate;
    checker.isValidDate("startDate", startDate);
    const endDate = req.query.endDate;
    checker.isValidDate("endDate", endDate);

    const appointments = await appointmentService.getAppointements(
      startDate,
      endDate
    );
    res.send(appointments);
  } catch (err) {
    next(err);
  }
});

router.get("/appointments/:id", authenticate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const appointment = await appointmentService.getAppointement(id);
    res.send(appointment);
  } catch (err) {
    next(err);
  }
});

router.patch("/appointments/:id", authenticate, async (req, res, next) => {
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

router.delete("/appointments/:id", authenticate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const appointment = await appointmentService.deleteAppointement(id);
    res.send(appointment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
