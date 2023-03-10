const { Appointment, Slot } = require("../models/index");
const Nexmo = require("nexmo");

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  create(req, res) {
    var requestBody = req.body;

    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslot.save();
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id
    });

    // const nexmo = new Nexmo({
    //   apiKey: "1fb10d3f",
    //   apiSecret: "87Tj0k5LqDjoRrxn"
    // });

    // let msg =
    //   requestBody.name +
    //   " " +
    //   "this message is to confirm your appointment at" +
    //   " " +
    //   requestBody.appointment;

    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));

      // const from = VIRTUAL_NUMBER;
      // const to = RECIPIENT_NUMBER;

      // const from = +918690136160;
      // const to = req.body.phone;
      // nexmo.message.sendSms(from, to, msg, (err, responseData) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.dir(responseData);
      //   }
      // });
    });
  }
};

module.exports = appointmentController;
