const AppointmentModel = require("../models/appointment");

async function createAppointment(patientName, phoneNumber, startDate, endDate) {
  const appointment = new AppointmentModel({
    patientName: patientName,
    phoneNumber: phoneNumber,
    startDate: startDate,
    endDate: endDate,
  });
  return appointment
    .save()
    .then((savedAppointment) => {
      console.log("Appointment created successfully:", savedAppointment);
      return savedAppointment;
    })
    .catch((error) => {
      console.error("Error creating appointment:", error);
      throw error;
    });
}

async function getAppointements(startDate, endDate) {
  return AppointmentModel.find({
    startDate: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .then((appointments) => {
      return appointments;
    })
    .catch((error) => {
      console.error("Error getting appointments:", error);
      throw error;
    });
}

async function getAppointement(id) {
  return AppointmentModel.findById(id)
    .then((appointment) => {
      return appointment;
    })
    .catch((error) => {
      console.error("Error getting appointment:", error);
      throw error;
    });
}

async function updateAppointement(id, updatedObject) {
  return AppointmentModel.findByIdAndUpdate(id, updatedObject)
    .then((appointment) => {
      return appointment;
    })
    .catch((error) => {
      console.error("Error updating appointment:", error);
      throw error;
    });
}

async function deleteAppointement(id) {
  return AppointmentModel.findByIdAndDelete(id).catch((error) => {
    console.error("Error deleting appointment:", error);
    throw error;
  });
}

module.exports = {
  createAppointment,
  getAppointements,
  getAppointement,
  updateAppointement,
  deleteAppointement,
};
