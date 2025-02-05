import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";

const MyOrder = () => {
  const [order, setOrder] = useState([]);
  const { refresh } = useAuthContext();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch("/api/apply/my-order");
        const user = await response.json();
        setOrder(user.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrder();
  }, [refresh]);

  const downloadPdf = async (fileUrl) => {
    try {
      const secureFileUrl = fileUrl.replace(/^http:/, "https:");
      const response = await fetch(secureFileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file-1709269093630.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div>
      <div className="px-8 py-6 bg-white rounded shadow-md ">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 md:grid-cols-2">
          {order.map((user) => (
            <div key={user._id} className="mb-4">
              <p className="text-lg font-bold">Category: {user.category}</p>
              {user.nidNumber && (
                <p className="mb-2 text-lg font-semibold">
                  NID Number: {user.nidNumber}
                </p>
              )}
              {user.mobileNumber && <p>Mobile Number: {user.mobileNumber}</p>}
              {user.birthday && (
                <p>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>
              )}
              {user.formNumberNid && <p>Form Number: {user.formNumberNid}</p>}
              {user.voterNumberNid && (
                <p>Voter Number: {user.voterNumberNid}</p>
              )}
              {user.mobileNumberNid && (
                <p>Order sign Copy: {user.mobileNumberNid}</p>
              )}
              {user.birthCertificateNumberNid && (
                <p>
                  Birth Certificate Number: {user.birthCertificateNumberNid}
                </p>
              )}
              {user.fatherNidNumberNid && (
                <p>Father and Mother NID Number: {user.fatherNidNumberNid}</p>
              )}
              {user.NameNid && <p>Name: {user.NameNid}</p>}

              {user.bangladeshFormNo && (
                <p>
                  <span>বাংলাদেশ ফরম নং:</span> {user.bangladeshFormNo}
                </p>
              )}
              {user.attachment && (
                <p>
                  <span>পরিশিষ্ট(বাংলায়):</span> {user.attachment}
                </p>
              )}
              {user.serialNumber && (
                <p>
                  <span>ক্রমিক নং(ইংরিজে):</span> {user.serialNumber}
                </p>
              )}
              {user.paragraphNumber && (
                <p>
                  <span>অনুচ্ছেদ নং (বাংলায়):</span> {user.paragraphNumber}
                </p>
              )}
              {user.landOfficeName && (
                <p>
                  <span>ভূমি অফিসের নাম(বাংলায়):</span> {user.landOfficeName}
                </p>
              )}
              {user.mouzaJLNo && (
                <p>
                  <span>মৌজার জে. এল. নং (বাংলায়):</span> {user.mouzaJLNo}
                </p>
              )}
              {user.upazilaThana && (
                <p>
                  <span>উপেজলা / থানা (বাংলায়):</span> {user.upazilaThana}
                </p>
              )}
              {user.district && (
                <p>
                  <span>জেলা (বাংলায়):</span> {user.district}
                </p>
              )}
              {user.ownerName && (
                <p>
                  <span>মালিকের নাম(বাংলায়):</span> {user.ownerName}
                </p>
              )}
              {user.ownerShare && (
                <p>
                  <span>মালিকের অংশ(ইংরিজে):</span> {user.ownerShare}
                </p>
              )}
              {user.landCategory && (
                <p>
                  <span>জমির শ্রেণী(বাংলায়):</span> {user.landCategory}
                </p>
              )}
              {user.landArea && (
                <p>
                  <span>জমির পরিমাণ(বাংলায়):</span> {user.landArea}
                </p>
              )}
              {user.plotNo && (
                <p>
                  <span>দাগ নং(বাংলায়):</span> {user.plotNo}
                </p>
              )}
              {user.khatianNo && (
                <p>
                  <span>খতিয়ান নং(বাংলায়):</span> {user.khatianNo}
                </p>
              )}
              {user.holdingNumber && (
                <p>
                  <span>২ নং রেজিস্টার অনুযায়ী হোল্ডিং নাম্বার:</span>{" "}
                  {user.holdingNumber}
                </p>
              )}
              {user.arrearLastThreeYears && (
                <p>
                  <span>তিন বৎসরের ঊর্ধ্বের বকেয়া(বাংলায়):</span>{" "}
                  {user.arrearLastThreeYears}
                </p>
              )}
              {user.arrearPastThreeYears && (
                <p>
                  <span>গত তিন বছরের বকেয়া (বাংলায়):</span>{" "}
                  {user.arrearPastThreeYears}
                </p>
              )}
              {user.interestAndCompensation && (
                <p>
                  <span>বকেয়ার সুদ ও ক্ষতিপূরণ (বাংলায়):</span>{" "}
                  {user.interestAndCompensation}
                </p>
              )}
              {user.currentClaim && (
                <p>
                  <span>হাল দাবি (বাংলায়):</span> {user.currentClaim}
                </p>
              )}
              {user.totalClaim && (
                <p>
                  <span>মোট দাবি (বাংলায়):</span> {user.totalClaim}
                </p>
              )}
              {user.totalCollection && (
                <p>
                  <span>মোট আদায় (বাংলায়):</span> {user.totalCollection}
                </p>
              )}
              {user.totalArrear && (
                <p>
                  <span>মোট বকেয়া (বাংলায়):</span> {user.totalArrear}
                </p>
              )}
              {user.totalInWords && (
                <p>
                  <span>সর্বমোট (কথায়) (বাংলায়):</span> {user.totalInWords}
                </p>
              )}
              {user.challanNo && (
                <p>
                  <span>চালান নং (বাংলায়):</span> {user.challanNo}
                </p>
              )}
              {user.dateBangla && (
                <p>
                  <span>তারিখ (বাংলা):</span> {user.dateBangla}
                </p>
              )}
              {user.dateEnglish && (
                <p>
                  <span>তারিখ (ইংলিশ):</span> {user.dateEnglish}
                </p>
              )}
              {user.noteBl && (
                <p>
                  <span>নোট(বাংলায়):</span> {user.noteBl}
                </p>
              )}
              {user.registerOfficeAddress && (
                <p>
                  <span>Register Office Address:</span>{" "}
                  {user.registerOfficeAddress}
                </p>
              )}
              {user.upazilaOrCity && (
                <p>
                  <span>Upazila/Pourashava/City Corporation, Zila: </span>{" "}
                  {user.upazilaOrCity}
                </p>
              )}
              {user.birthRegistrationNumber && (
                <p>
                  <span>Birth Registration Number:</span>{" "}
                  {user.birthRegistrationNumber}
                </p>
              )}
              {user.leftBarcode && (
                <p>
                  <span>Left Barcode:</span> {user.leftBarcode}
                </p>
              )}
              {user.dateOfRegistration && (
                <p>
                  <span>Date of Registration:</span> {user.dateOfRegistration}
                </p>
              )}
              {user.dateOfIssuance && (
                <p>
                  <span>Date of Issuance:</span> {user.dateOfIssuance}
                </p>
              )}
              {user.dateOfBirth && (
                <p>
                  <span>Date of Birth:</span> {user.dateOfBirth}
                </p>
              )}
              {user.gender && (
                <p>
                  <span>Gender:</span> {user.gender}
                </p>
              )}
              {user.dateOfBirthInWords && (
                <p>
                  <span>Date of Birth in Words:</span> {user.dateOfBirthInWords}
                </p>
              )}
              {user.nameInBangla && (
                <p>
                  <span>নাম: </span> {user.nameInBangla}
                </p>
              )}
              {user.nameInEnglish && (
                <p>
                  <span>Name: </span> {user.nameInEnglish}
                </p>
              )}
              {user.fatherNameInBangla && (
                <p>
                  <span>পিতার নাম:</span> {user.fatherNameInBangla}
                </p>
              )}
              {user.fatherNameInEnglish && (
                <p>
                  <span>Father&apos;s Name: </span> {user.fatherNameInEnglish}
                </p>
              )}
              {user.fatherNationality && (
                <p>
                  <span>Father&apos;s Nationality:</span>{" "}
                  {user.fatherNationality}
                </p>
              )}
              {user.fatherNationalityBangla && (
                <p>
                  <span>পিতার জাতীয়তা: </span> {user.fatherNationalityBangla}
                </p>
              )}
              {user.motherNameInBangla && (
                <p>
                  <span>মাতার নাম: </span> {user.motherNameInBangla}
                </p>
              )}
              {user.motherNameInEnglish && (
                <p>
                  <span>Mother&apos;s Name: </span> {user.motherNameInEnglish}
                </p>
              )}
              {user.motherNationality && (
                <p>
                  <span>Mother&apos;s Nationality:</span>{" "}
                  {user.motherNationality}
                </p>
              )}
              {user.motherNationalityBangla && (
                <p>
                  <span>মাতার জাতীয়তা: </span> {user.motherNationalityBangla}
                </p>
              )}
              {user.placeOfBirthInBangla && (
                <p>
                  <span>জন্মস্থান: </span> {user.placeOfBirthInBangla}
                </p>
              )}
              {user.placeOfBirthInEnglish && (
                <p>
                  <span>Place of Birth: </span> {user.placeOfBirthInEnglish}
                </p>
              )}
              {user.permanentAddressInBangla && (
                <p>
                  <span>স্থায়ী ঠিকানা: </span> {user.permanentAddressInBangla}
                </p>
              )}
              {user.permanentAddressInEnglish && (
                <p>
                  <span>Permanent Address: </span>{" "}
                  {user.permanentAddressInEnglish}
                </p>
              )}
              {user.operator && (
                <p>
                  <span>SUBMISSION TYPE: </span> {user.operator}
                </p>
              )}
              {user.number && (
                <p>
                  <span> Mobile Number: </span> {user.number}
                </p>
              )}
              {user.name && (
                <p>
                  <span>Enter Nid Number: </span> {user.name}
                </p>
              )}
              {user.identifier && (
                <p>
                  <span>Date Of Birth YYYY-MM-DD: </span> {user.identifier}
                </p>
              )}
              {user.status === "approved" ? (
                <>
                  <p className="mt-2 font-bold text-green-500">
                    Status: {user.status}
                  </p>
                  <button
                    onClick={() => downloadPdf(user.file)}
                    className="text-blue-500 hover:underline"
                  >
                    Download File
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-2 font-bold text-red-500">
                    Status: {user.status}
                  </p>
                  <p>Note: {user.note}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
