const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: {
    required: true,
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  startDate: {
    required: true,
    type: Date,
  },
  endDate: {
    required: true,
    type: Date,
  },
  isScheduled: {
    required: true,
    type: Boolean,
    default: false,
  },
  appointmentCompleted: {
    required: true,
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("appointments", AppointmentSchema);
