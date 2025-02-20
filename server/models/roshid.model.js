import mongoose from "mongoose";

const roshidSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bangladeshFormNo: {
      type: String,
    },
    appendix: {
      type: String,
    },
    serialNo: {
      type: String,
    },
    paragraphNo: {
      type: String,
    },
    landOfficeName: {
      type: String,
    },
    mouzaJLNo: {
      type: String,
    },
    upazilaThana: {
      type: String,
    },
    district: {
      type: String,
    },
    arrearLastThreeYears: {
      type: String,
    },
    arrearPastThreeYears: {
      type: String,
    },
    interestAndCompensation: {
      type: String,
    },
    currentClaim: {
      type: String,
    },
    totalClaim: {
      type: String,
    },
    totalCollection: {
      type: String,
    },
    totalArrear: {
      type: String,
    },
    totalInWords: {
      type: String,
    },
    noteBl: {
      type: String,
    },
    challanNo: {
      type: String,
    },
    dateBangla: {
      type: String,
    },
    dateEnglish: {
      type: String,
    },
    khatianNo: {
      type: String,
    },
    holdingNumber: {
      type: String,
    },
    ownerDetails: [
      {
        ownerName: {
          type: String,
        },
        ownerShare: {
          type: String,
        },
      },
    ],
    landDetails: [
      {
        landCategory: {
          type: String,
        },
        landArea: {
          type: String,
        },
        plotNo: {
          type: String,
        },
      },
    ],
    // createdAt, updatedAt => Roshid since <createdAt>
  },
  { timestamps: true }
);

const Roshid = mongoose.model("Roshid", roshidSchema);

export default Roshid;
