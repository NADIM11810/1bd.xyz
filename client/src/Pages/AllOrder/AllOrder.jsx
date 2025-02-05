import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
const AllOrder = () => {
  const { refresh, setRefresh } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [action, setAction] = useState("delivery"); // Default action is delivery
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/apply/order");
        const item = await response.json();
        setOrders(item.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, [refresh]);

  const handleToggleAction = () => {
    // Toggle between "delivery" and "cancel"
    setAction((prevAction) =>
      prevAction === "delivery" ? "cancel" : "delivery"
    );
  };

  const handleDelivery = async (orderId) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoader(true);
      const response = await fetch(`/api/apply/update-form/${orderId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update Apply");
      }
      setRefresh(!refresh);
      toast.success("Apply updated successfully");
      setLoader(false);
      // Handle success, maybe redirect or show a success message
    } catch (error) {
      console.error("Error updating Apply:", error.message);
      // Handle error, maybe show an error message to the user
    }
  };

  const handleCancel = (orderId) => {
    setRefresh(!refresh);
    fetch(`/api/apply/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "cancel", note }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update Apply");
        }
        setRefresh(!refresh);
        toast("Apply updated successfully");
        // Handle success, maybe redirect or show a success message
      })
      .catch((error) => {
        console.error("Error updating Apply:", error.message);
        toast.error("Something went wrong!");
        // Handle error, maybe show an error message to the user
      });
  };

  return (
    <div>
      <div className="container m-10 mx-auto">
        <div className="flex gap-5">
          <h1 className="mb-4 text-2xl font-bold">item List</h1>
          <button
            onClick={async () => {
              if (
                window.confirm("Are you sure you want to delete all orders?")
              ) {
                try {
                  const res = await axios.delete(
                    "/api/apply/delete-all-orders"
                  );
                  if (res.status !== 200) {
                    return toast.error("Failed to delete orders");
                  }
                  setOrders([]);
                  toast.success("All orders deleted successfully");
                } catch (error) {
                  toast.error("Failed to delete orders");
                  console.error(error);
                }
              }
            }}
            className="px-4 py-2 mb-4 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          >
            Delete All Orders
          </button>
        </div>
        {loader ? (
          <h1>loading.......</h1>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {orders.map((item) => (
              <div key={item._id} className="p-4 bg-white rounded shadow">
                <p className="text-lg font-bold">Category: {item.category}</p>
                {item.nidNumber && (
                  <p className="mb-2 text-lg font-semibold">
                    NID Number: {item.nidNumber}
                  </p>
                )}
                {item.mobileNumber && <p>Mobile Number: {item.mobileNumber}</p>}
                {item.birthday && (
                  <p>
                    Birthday: {new Date(item.birthday).toLocaleDateString()}
                  </p>
                )}
                {item.formNumberNid && <p>Form Number: {item.formNumberNid}</p>}
                {item.voterNumberNid && (
                  <p>Voter Number: {item.voterNumberNid}</p>
                )}
                {item.mobileNumberNid && (
                  <p>Mobile Number: {item.mobileNumberNid}</p>
                )}
                {item.birthCertificateNumberNid && (
                  <p>
                    Birth Certificate Number: {item.birthCertificateNumberNid}
                  </p>
                )}
                {item.fatherNidNumberNid && (
                  <p>Father and Mother NID Number: {item.fatherNidNumberNid}</p>
                )}
                {item.NameNid && <p>Name: {item.NameNid}</p>}

                {item.bangladeshFormNo && (
                  <p>
                    <span>বাংলাদেশ ফরম নং:</span> {item.bangladeshFormNo}
                  </p>
                )}
                {item.attachment && (
                  <p>
                    <span>পরিশিষ্ট(বাংলায়):</span> {item.attachment}
                  </p>
                )}
                {item.serialNumber && (
                  <p>
                    <span>ক্রমিক নং(ইংরিজে):</span> {item.serialNumber}
                  </p>
                )}
                {item.paragraphNumber && (
                  <p>
                    <span>অনুচ্ছেদ নং (বাংলায়):</span> {item.paragraphNumber}
                  </p>
                )}
                {item.landOfficeName && (
                  <p>
                    <span>ভূমি অফিসের নাম(বাংলায়):</span> {item.landOfficeName}
                  </p>
                )}
                {item.mouzaJLNo && (
                  <p>
                    <span>মৌজার জে. এল. নং (বাংলায়):</span> {item.mouzaJLNo}
                  </p>
                )}
                {item.upazilaThana && (
                  <p>
                    <span>উপেজলা / থানা (বাংলায়):</span> {item.upazilaThana}
                  </p>
                )}
                {item.district && (
                  <p>
                    <span>জেলা (বাংলায়):</span> {item.district}
                  </p>
                )}
                {item.ownerName && (
                  <p>
                    <span>মালিকের নাম(বাংলায়):</span> {item.ownerName}
                  </p>
                )}
                {item.ownerShare && (
                  <p>
                    <span>মালিকের অংশ(বাংলা):</span> {item.ownerShare}
                  </p>
                )}
                {item.landCategory && (
                  <p>
                    <span>জমির শ্রেণী(বাংলায়):</span> {item.landCategory}
                  </p>
                )}
                {item.landArea && (
                  <p>
                    <span>জমির পরিমাণ(ইংরিজে):</span> {item.landArea}
                  </p>
                )}
                {item.plotNo && (
                  <p>
                    <span>দাগ নং(বাংলায়):</span> {item.plotNo}
                  </p>
                )}
                {item.khatianNo && (
                  <p>
                    <span>খতিয়ান নং(বাংলায়):</span> {item.khatianNo}
                  </p>
                )}
                {item.holdingNumber && (
                  <p>
                    <span>২ নং রেজিস্টার অনুযায়ী হোল্ডিং নাম্বার:</span>{" "}
                    {item.holdingNumber}
                  </p>
                )}
                {item.arrearLastThreeYears && (
                  <p>
                    <span>তিন বৎসরের ঊর্ধ্বের বকেয়া(ইংরিজে):</span>{" "}
                    {item.arrearLastThreeYears}
                  </p>
                )}
                {item.arrearPastThreeYears && (
                  <p>
                    <span>গত তিন বছরের বকেয়া (ইংরিজে):</span>{" "}
                    {item.arrearPastThreeYears}
                  </p>
                )}
                {item.interestAndCompensation && (
                  <p>
                    <span>বকেয়ার সুদ ও ক্ষতিপূরণ (ইংরিজে):</span>{" "}
                    {item.interestAndCompensation}
                  </p>
                )}
                {item.currentClaim && (
                  <p>
                    <span>হাল দাবি (ইংরিজে):</span> {item.currentClaim}
                  </p>
                )}
                {item.totalClaim && (
                  <p>
                    <span>মোট দাবি (ইংরিজে):</span> {item.totalClaim}
                  </p>
                )}
                {item.totalCollection && (
                  <p>
                    <span>মোট আদায় (ইংরিজে):</span> {item.totalCollection}
                  </p>
                )}
                {item.totalArrear && (
                  <p>
                    <span>মোট বকেয়া (ইংরিজে):</span> {item.totalArrear}
                  </p>
                )}
                {item.totalInWords && (
                  <p>
                    <span>সর্বমোট (কথায়) (বাংলায়):</span> {item.totalInWords}
                  </p>
                )}
                {item.challanNo && (
                  <p>
                    <span>চালান নং (ইংরিজে):</span> {item.challanNo}
                  </p>
                )}
                {item.dateBangla && (
                  <p>
                    <span>তারিখ (বাংলা):</span> {item.dateBangla}
                  </p>
                )}
                {item.dateEnglish && (
                  <p>
                    <span>তারিখ (ইংলিশ):</span> {item.dateEnglish}
                  </p>
                )}
                {item.noteBl && (
                  <p>
                    <span>নোট সর্বশেষ কর পরিশোধের সাল(ইংরিজে):</span>{" "}
                    {item.noteBl}
                  </p>
                )}
                {item.registerOfficeAddress && (
                  <p>
                    <span>Register Office Address:</span>{" "}
                    {item.registerOfficeAddress}
                  </p>
                )}
                {item.upazilaOrCity && (
                  <p>
                    <span>Upazila/Pourashava/City Corporation, Zila: </span>{" "}
                    {item.upazilaOrCity}
                  </p>
                )}
                {item.birthRegistrationNumber && (
                  <p>
                    <span>Birth Registration Number:</span>{" "}
                    {item.birthRegistrationNumber}
                  </p>
                )}
                {item.leftBarcode && (
                  <p>
                    <span>Left Barcode:</span> {item.leftBarcode}
                  </p>
                )}
                {item.dateOfRegistration && (
                  <p>
                    <span>Date of Registration:</span> {item.dateOfRegistration}
                  </p>
                )}
                {item.dateOfIssuance && (
                  <p>
                    <span>Date of Issuance:</span> {item.dateOfIssuance}
                  </p>
                )}
                {item.dateOfBirth && (
                  <p>
                    <span>Date of Birth:</span> {item.dateOfBirth}
                  </p>
                )}
                {item.gender && (
                  <p>
                    <span>Gender:</span> {item.gender}
                  </p>
                )}
                {item.dateOfBirthInWords && (
                  <p>
                    <span>Date of Birth in Words:</span>{" "}
                    {item.dateOfBirthInWords}
                  </p>
                )}
                {item.nameInBangla && (
                  <p>
                    <span>নাম: </span> {item.nameInBangla}
                  </p>
                )}
                {item.nameInEnglish && (
                  <p>
                    <span>Name: </span> {item.nameInEnglish}
                  </p>
                )}
                {item.fatherNameInBangla && (
                  <p>
                    <span>পিতার নাম:</span> {item.fatherNameInBangla}
                  </p>
                )}
                {item.fatherNameInEnglish && (
                  <p>
                    <span>Father&apos;s Name: </span> {item.fatherNameInEnglish}
                  </p>
                )}
                {item.fatherNationality && (
                  <p>
                    <span>Father&apos;s Nationality:</span>{" "}
                    {item.fatherNationality}
                  </p>
                )}
                {item.fatherNationalityBangla && (
                  <p>
                    <span>পিতার জাতীয়তা: </span> {item.fatherNationalityBangla}
                  </p>
                )}
                {item.motherNameInBangla && (
                  <p>
                    <span>মাতার নাম: </span> {item.motherNameInBangla}
                  </p>
                )}
                {item.motherNameInEnglish && (
                  <p>
                    <span>Mother&apos;s Name: </span> {item.motherNameInEnglish}
                  </p>
                )}
                {item.motherNationality && (
                  <p>
                    <span>Mother&apos;s Nationality:</span>{" "}
                    {item.motherNationality}
                  </p>
                )}
                {item.motherNationalityBangla && (
                  <p>
                    <span>মাতার জাতীয়তা: </span> {item.motherNationalityBangla}
                  </p>
                )}
                {item.placeOfBirthInBangla && (
                  <p>
                    <span>জন্মস্থান: </span> {item.placeOfBirthInBangla}
                  </p>
                )}
                {item.placeOfBirthInEnglish && (
                  <p>
                    <span>Place of Birth: </span> {item.placeOfBirthInEnglish}
                  </p>
                )}
                {item.permanentAddressInBangla && (
                  <p>
                    <span>স্থায়ী ঠিকানা: </span> {item.permanentAddressInBangla}
                  </p>
                )}
                {item.permanentAddressInEnglish && (
                  <p>
                    <span>Permanent Address: </span>{" "}
                    {item.permanentAddressInEnglish}
                  </p>
                )}
                {item.operator && (
                  <p>
                    <span>SUBMISSION TYPE: </span> {item.operator}
                  </p>
                )}
                {item.number && (
                  <p>
                    <span>Mobile Number: </span> {item.number}
                  </p>
                )}
                {item.name && (
                  <p>
                    <span>Enter Nid Number: </span> {item.name}
                  </p>
                )}
                {item.identifier && (
                  <p>
                    <span>Date Of Birth: </span> {item.identifier}
                  </p>
                )}
                <p>Status: {item.status}</p>
                {item.status === "pending" && (
                  <div>
                    {action === "delivery" ? (
                      <di>
                        <input
                          type="file"
                          className="p-1 mb-1 border rounded"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button
                          onClick={() => handleDelivery(item._id)}
                          className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                          Delivery
                        </button>
                      </di>
                    ) : (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter text"
                          className="p-1 mb-1 border rounded"
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                        />

                        <button
                          onClick={() => handleCancel(item._id)}
                          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    <button
                      onClick={handleToggleAction}
                      className="px-4 py-2 mt-4 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Toggle {action === "delivery" ? "Cancel" : "Delivery"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrder;
