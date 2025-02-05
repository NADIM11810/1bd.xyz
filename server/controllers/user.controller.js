import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Balance from "../models/balance.model.js";
import Roshid from "../models/roshid.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// controllers/user.controller.js

export const updateBalance = async (req, res) => {
  try {
    const userId = req.user._id;
    const { balance } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalBalance = user.balance - balance;
    // Update user's balance
    user.balance = finalBalance;
    await user.save();

    res
      .status(200)
      .json({ message: "Balance updated successfully", balance: user.balance });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/user.controller.js

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, gender } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's profile
    user.fullName = fullName;
    user.gender = gender;
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/user.controller.js

// controllers/user.controller.js

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user?.password || ""
    );
    // Check if the old password matches
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid  password" });
    }
    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Error in updatePassword controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/user.controller.js

export const findUserById = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in findUserById controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/user.controller.js

// controllers/user.controller.js

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user by userId
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUserById controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBalanceForServer = async (req, res) => {
  try {
    const userId = req.user._id;
    const balance = await Balance.findOne();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalBalance = user.balance - balance.serverBalance;
    // Update user's balance
    user.balance = finalBalance;
    await user.save();

    res
      .status(200)
      .json({ message: "Balance updated successfully", balance: user.balance });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateBalanceForNid = async (req, res) => {
  try {
    const userId = req.user._id;
    const balance = await Balance.findOne();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalBalance = user.balance - balance.nidBalance;
    // Update user's balance
    user.balance = finalBalance;
    await user.save();

    res
      .status(200)
      .json({ message: "Balance updated successfully", balance: user.balance });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBalanceForBirth = async (req, res) => {
  try {
    const userId = req.user._id;
    const balance = await Balance.findOne();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalBalance = user.balance - balance.birthBalance;
    // Update user's balance
    user.balance = finalBalance;
    await user.save();

    res
      .status(200)
      .json({ message: "Balance updated successfully", balance: user.balance });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBalanceForTin = async (req, res) => {
  try {
    const userId = req.user._id;
    const balance = await Balance.findOne();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalBalance = user.balance - balance.tinBalance;
    // Update user's balance
    user.balance = finalBalance;
    await user.save();

    res
      .status(200)
      .json({ message: "Balance updated successfully", balance: user.balance });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBalanceForBio = async (req, res) => {
  try {
    const userId = req.user._id;
    const balance = await Balance.findOne();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalBalance = user.balance - balance.bioBalance;
    // Update user's balance
    user.balance = finalBalance;
    await user.save();

    res
      .status(200)
      .json({ message: "Balance updated successfully", balance: user.balance });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBalanceForRoshid = async (req, res) => {
  try {
    const userId = req.user._id;
    const balance = await Balance.findOne();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalBalance = user.balance - balance.roshidBalance;
    // Update user's balance
    user.balance = finalBalance;
    await user.save();

    res
      .status(200)
      .json({ message: "Balance updated successfully", balance: user.balance });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBalanceForEditedRoshid = async (req, res) => {
  try {
    const userId = req.user._id;
    const balance = await Balance.findOne();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalBalance = user.balance - balance.editRoshidBalance;
    // Update user's balance
    user.balance = finalBalance;
    await user.save();

    res
      .status(200)
      .json({ message: "Balance updated successfully", balance: user.balance });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/user.controller.js
export const updateUserBalance = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      return res
        .status(400)
        .json({ message: "Invalid amount value", success: false });
    }

    const total = numAmount + user.balance;
    user.balance = total;
    await user.save();

    res.status(200).json({
      message: "User balance updated successfully",
      balance: user.balance,
      success: true,
    });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/user.controller.js
export const editUserBalance = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      return res.status(400).json({ error: "Invalid amount value" });
    }

    user.balance = numAmount;
    await user.save();

    res.status(200).json({
      message: "User Balance Edited Successfully",
      balance: user.balance,
    });
  } catch (error) {
    console.log("Error in updateBalance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRoshidById = async (req, res) => {
  try {
    const { id } = req.params;

    const roshid = await Roshid.findById(id);

    if (!roshid) {
      return res.status(404).json({ error: "Roshid not found" });
    }

    res.status(200).json(roshid);
  } catch (error) {
    console.log("Error in getRoshidById controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
