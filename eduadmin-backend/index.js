const express = require("express");
const Student = require("./models/Student");
require("dotenv").config();
const app = express();
require("./config/dbConnect");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/student", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).send({
      status: "success",
      message: "Students retrieved",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
      data: error,
    });
  }
});

app.post("/student", async (req, res) => {
  try {
    console.log(req.body);
    const newStudent = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      rollNo: req.body.rollNo,
    });

    await newStudent.save();
    res.status(200).send({
      status: "success",
      message: "Students retrieved",
      data: newStudent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: studentId });
    res.status(200).send({
      status: "success",
      message: "Student retrieved",
      data: student,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { ...req.body });
    res.status(200).send({
      status: "success",
      message: "Student updated",
      data: student,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);
    res.status(200).send({
      status: "success",
      message: "Student deleted successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server running on port" + PORT);
});
