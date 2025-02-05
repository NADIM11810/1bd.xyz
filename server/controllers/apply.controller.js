// ApplyController.js
import axios from "axios";
import Apply from "../models/apply.model.js";
import User from "../models/user.model.js";
import Balance from "../models/balance.model.js";
import Roshid from "../models/roshid.model.js";
import ToggleOrder from "../models/toggle-order.model.js";

class FileInfo {
  constructor(filename, path) {
    this.filename = filename;
    this.path = path;
  }
}

export const updateApply = async (req, res) => {
  const { id } = req.params;
  const status = "approved";
  const file = req.body.file;

  try {
    const updatedApply = await Apply.findByIdAndUpdate(
      id,
      { $set: { status, file } },
      { new: true }
    );

    if (!updatedApply) {
      return res.status(404).json({ message: "Apply not found" });
    }

    res
      .status(200)
      .json({ message: "Apply updated successfully", updatedApply });
  } catch (error) {
    console.error("Error updating Apply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const submitForm = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      nidNumber,
      category,
      birthday,
      bangladeshFormNo,
      attachment,
      serialNumber,
      paragraphNumber,
      landOfficeName,
      mouzaJLNo,
      upazilaThana,
      district,
      ownerName,
      ownerShare,
      landCategory,
      landArea,
      plotNo,
      khatianNo,
      holdingNumber,
      arrearLastThreeYears,
      arrearPastThreeYears,
      interestAndCompensation,
      currentClaim,
      totalClaim,
      totalCollection,
      totalArrear,
      totalInWords,
      challanNo,
      dateBangla,
      dateEnglish,
      noteBl,
      registerOfficeAddress,
      upazilaOrCity,
      birthRegistrationNumber,
      leftBarcode,
      dateOfRegistration,
      dateOfIssuance,
      dateOfBirth,
      gender,
      dateOfBirthInWords,
      nameInBangla,
      nameInEnglish,
      fatherNameInBangla,
      fatherNameInEnglish,
      fatherNationality,
      fatherNationalityBangla,
      motherNameInBangla,
      motherNameInEnglish,
      motherNationality,
      motherNationalityBangla,
      placeOfBirthInBangla,
      placeOfBirthInEnglish,
      permanentAddressInBangla,
      permanentAddressInEnglish,
      number,
      operator,
      identifier,
      name,
      formNumberNid,
      voterNumberNid,
      mobileNumberNid,
      birthCertificateNumberNid,
      fatherNidNumberNid,
      NameNid,
    } = req.body;

    const file = "";
    const note = "";

    const newSubmission = new Apply({
      userId,
      nidNumber,
      birthday,
      bangladeshFormNo,
      attachment,
      serialNumber,
      paragraphNumber,
      landOfficeName,
      mouzaJLNo,
      upazilaThana,
      district,
      ownerName,
      ownerShare,
      landCategory,
      landArea,
      plotNo,
      khatianNo,
      holdingNumber,
      arrearLastThreeYears,
      arrearPastThreeYears,
      interestAndCompensation,
      currentClaim,
      totalClaim,
      totalCollection,
      totalArrear,
      totalInWords,
      file,
      note,
      noteBl,
      challanNo,
      dateBangla,
      dateEnglish,
      category,
      registerOfficeAddress,
      upazilaOrCity,
      birthRegistrationNumber,
      leftBarcode,
      dateOfRegistration,
      dateOfIssuance,
      dateOfBirth,
      gender,
      dateOfBirthInWords,
      nameInBangla,
      nameInEnglish,
      fatherNameInBangla,
      fatherNameInEnglish,
      fatherNationality,
      fatherNationalityBangla,
      motherNameInBangla,
      motherNameInEnglish,
      motherNationality,
      motherNationalityBangla,
      placeOfBirthInBangla,
      placeOfBirthInEnglish,
      permanentAddressInBangla,
      permanentAddressInEnglish,
      number,
      operator,
      identifier,
      name,
      formNumberNid,
      voterNumberNid,
      mobileNumberNid,
      birthCertificateNumberNid,
      fatherNidNumberNid,
      NameNid,
    });

    // Save the submission to the database
    await newSubmission.save();

    res
      .status(201)
      .json({ message: "Form submitted successfully", newSubmission });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Apply.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get applications by user id
export const getApplicationsByUserId = async (req, res) => {
  const userId = req.user._id;

  try {
    const applications = await Apply.find({ userId: userId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApi = async (req, res) => {
  const { nid, dob } = req.query;
  if (!nid || !dob) {
    return res
      .status(400)
      .json({ error: "National ID and Date of Birth are required." });
  }

  try {
    const apiUrl = `https://princearman.my.id/servercopy/SV.php?key=dfghj&nid=${nid}&dob=${dob}`;
    const response = await axios.get(apiUrl);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getApiBackup = async (req, res) => {
  const { nid, dob } = req.query;
  if (!nid || !dob) {
    return res
      .status(400)
      .json({ error: "National ID and Date of Birth are required." });
  }

  try {
    const apiUrl = `https://api.foxithub.pro/unofficial/api.php?key=on9354&nid=${nid}&dob=${dob}`;
    const response = await axios.get(apiUrl);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateNoteAndStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get the apply ID from request parameters
    const { note } = req.body; // Get the new note from request body

    // Find the apply document by ID
    const apply = await Apply.findById(id);
    const balance = await Balance.findOne();
    // If the apply document doesn't exist, return an error
    if (!apply) {
      return res
        .status(404)
        .json({ success: false, message: "Apply not found" });
    }

    // Update the note field with the new value
    apply.note = note;

    // Set the status to "cancel"
    apply.status = "cancel";

    // Save the updated apply document
    await apply.save();

    // Find the user associated with the apply
    const user = await User.findById(apply.userId);

    // If the user doesn't exist, return an error
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Add  user's balance

    if (apply.category == "birth") {
      user.balance += balance.birthBalance;
    } else if (apply.category == "roshid") {
      user.balance += balance.roshidBalance;
    } else if (apply.category == "nid") {
      user.balance += balance.nidBalance;
    } else if (apply.category == "tin") {
      user.balance += balance.tinBalance;
    } else if (apply.category == "bio") {
      user.balance += balance.bioBalance;
    } else {
      return res.status(500).json({ success: false, message: "error find " });
    }

    // Save the updated user document
    await user.save();

    // Return success message or updated apply document
    return res.status(200).json({
      success: true,
      message: "Note updated and status set to cancel",
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to delete all orders
export const deleteAllOrders = async (req, res) => {
  try {
    await Apply.deleteMany();
    res.status(200).json({ message: "All orders deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting all the orders" });
  }
};

// Controller to create new Roshid

export const createRoshid = async (req, res) => {
  const userId = req.user._id;
  try {
    const {
      bangladeshFormNo,
      appendix,
      serialNo,
      paragraphNo,
      landOfficeName,
      mouzaJLNo,
      upazilaThana,
      district,
      arrearLastThreeYears,
      arrearPastThreeYears,
      interestAndCompensation,
      currentClaim,
      totalClaim,
      totalCollection,
      totalArrear,
      totalInWords,
      noteBl,
      challanNo,
      dateBangla,
      dateEnglish,
      khatianNo,
      holdingNumber,
      ownerDetails,
      landDetails,
    } = req.body;

    const newRoshid = new Roshid({
      userId,
      bangladeshFormNo,
      appendix,
      serialNo,
      paragraphNo,
      landOfficeName,
      mouzaJLNo,
      upazilaThana,
      district,
      arrearLastThreeYears,
      arrearPastThreeYears,
      interestAndCompensation,
      currentClaim,
      totalClaim,
      totalCollection,
      totalArrear,
      totalInWords,
      noteBl,
      challanNo,
      dateBangla,
      dateEnglish,
      khatianNo,
      holdingNumber,
      ownerDetails,
      landDetails,
    });

    await newRoshid.save();

    res.status(201).json({ message: "Roshid created successfully", newRoshid });
  } catch (error) {
    console.error("Error creating Roshid:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRoshid = async (req, res) => {
  const userId = req.user._id;
  try {
    const roshids = await Roshid.find({ userId });
    res.status(200).json(roshids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoshid = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedRoshid = await Roshid.findByIdAndDelete(id);
    if (!deletedRoshid) {
      return res.status(404).json({ message: "Roshid not found" });
    }
    res.status(200).json({ message: "Roshid deleted successfully" });
  } catch (error) {
    console.error("Error deleting Roshid:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to update toggle order
export const updateToggleOrder = async (req, res) => {
  const { toggleName, status } = req.body; // status should be boolean (true/false)
  try {
    const toggle = await ToggleOrder.findOne();
    if (!toggle) {
      return res.status(404).json({ message: "Toggle settings not found" });
    }

    if (!(toggleName in toggle)) {
      return res.status(400).json({ message: "Invalid toggle name" });
    }

    toggle[toggleName] = status;
    await toggle.save();
    res.status(200).json({ message: "Toggle fetched successfully", toggle });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating toggle", error: error.message });
  }
};

// Controller to get toggle order
export const getToggleOrder = async (req, res) => {
  try {
    const toggle = await ToggleOrder.findOne();
    if (!toggle) {
      return res.status(404).json({ message: "Toggle settings not found" });
    }
    res.status(200).json(toggle);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching toggle settings",
        error: error.message,
      });
  }
};

export const getRoshidById = async (req, res) => {
  const { id } = req.params;
  try {
    const roshid = await Roshid.findById(id);
    if (!roshid) {
      return res.status(404).json({ message: "Roshid not found" });
    }
    res.status(200).json(roshid);
  } catch (error) {
    console.error("Error fetching Roshid:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRoshid = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRoshid = await Roshid.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRoshid) {
      return res.status(404).json({ message: "Roshid not found" });
    }
    res.status(200).json({ message: "Roshid updated successfully", updatedRoshid });
  } catch (error) {
    console.error("Error updating Roshid:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
