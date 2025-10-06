// const ClinicalTrial = require("../models/ClinicalTrial");

// exports.createTrial = async (req, res) => {
//   try {
//     const trial = new ClinicalTrial({ ...req.body, createdBy: req.user.id });
//     await trial.save();
//     res.json(trial);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.getTrials = async (req, res) => {
//   const trials = await ClinicalTrial.find({ createdBy: req.user.id });
//   res.json(trials);
// };

// exports.updateTrial = async (req, res) => {
//   const trial = await ClinicalTrial.findOneAndUpdate(
//     { _id: req.params.id, createdBy: req.user.id },
//     req.body,
//     { new: true }
//   );
//   res.json(trial);
// };

// exports.deleteTrial = async (req, res) => {
//   await ClinicalTrial.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
//   res.json({ message: "Trial deleted" });
// };

const ClinicalTrial = require("../models/ClinicalTrial");

exports.createTrial = async (req, res) => {
  try {
    const trial = new ClinicalTrial({ ...req.body, createdBy: req.user._id });
    await trial.save();
    res.json(trial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTrials = async (req, res) => {
  const trials = await ClinicalTrial.find({ createdBy: req.user._id });
  res.json(trials);
};

exports.updateTrial = async (req, res) => {
  const trial = await ClinicalTrial.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true }
  );
  res.json(trial);
};

exports.deleteTrial = async (req, res) => {
  await ClinicalTrial.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  res.json({ message: "Trial deleted" });
};
