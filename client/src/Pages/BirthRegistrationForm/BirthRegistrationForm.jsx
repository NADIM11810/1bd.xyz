import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";
const BirthRegistrationForm = () => {
  const initialFormData = {
    registerOfficeAddress: "",
    upazilaOrCity: "",
    birthRegistrationNumber: "",
    leftBarcode: "",
    dateOfRegistration: "",
    dateOfIssuance: "",
    dateOfBirth: "",
    gender: "Male",
    dateOfBirthInWords: "",
    nameInBangla: "",
    nameInEnglish: "",
    fatherNameInBangla: "",
    fatherNameInEnglish: "",
    fatherNationality: "Bangladeshi",
    fatherNationalityBangla: "বাংলাদেশী",
    motherNameInBangla: "",
    motherNameInEnglish: "",
    motherNationality: "Bangladeshi",
    motherNationalityBangla: "বাংলাদেশী",
    placeOfBirthInBangla: "",
    placeOfBirthInEnglish: "",
    permanentAddressInBangla: "",
    permanentAddressInEnglish: "",
    category: "birth",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { refresh, setRefresh, balance } = useAuthContext();
  const [Balance, setBalance] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("/api/balance");
        const data = await response.json();
        setBalance(data);
      } catch (error) {
        console.error("Error fetching balance:", error.message);
      }
    };
    fetchBalance();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (balance < Balance.birthBalance) {
      setLoading(false);
      toast.error("Insufficient balance!");
    } else {
      setLoading(true);
      fetch("/api/users/update-balance-birth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((d) => {
          const data = formData;

          const form = document.createElement("form");
          form.method = "POST";
          form.action = "https://birth.1bd.xyz/index.php";

          const input = document.createElement("input");
          input.type = "hidden";
          input.name = "formData";

          input.value = JSON.stringify(data);
          form.appendChild(input);

          document.body.appendChild(form);
          form.submit();

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Something went wrong!");
        });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (!file.type.includes("image") && !file.type.includes("pdf")) {
      toast.error("Please upload a Image or PDF file");
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const base64String = await convertToBase64(file);
      const response = await fetch("/api/openai/extract-birth-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileBase64: base64String, type: file.type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process birth certificate");
      }

      try {
        const extractedData = data.content;

        setFormData((prev) => ({
          ...prev,
          ...extractedData,
        }));
        toast.success("Birth certificate information extracted successfully!");
      } catch (error) {
        console.error("Error parsing response:", error);
        toast.error("Failed to parse certificate information");
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error(error.message || "Failed to process birth certificate");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleClear = () => {
    setFormData(initialFormData);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
    toast.success("Form cleared successfully!");
  };

  return (
    <div className="w-full px-10 mx-auto mt-8">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-xl font-bold">জন্ম নিবন্ধন Form</h2>
      </div>
      <div className="flex justify-center gap-2 my-5">
        <div className="relative">
          <input
            type="file"
            accept=".pdf, image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className={`inline-block px-5 py-5 text-white bg-violet-500 rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600 cursor-pointer ${
              uploading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Processing..." : "Upload Birth Certificate"}
          </label>
        </div>
        <button
          onClick={handleClear}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Clear Form
        </button>
      </div>
      <p className="w-full max-w-screen-xl p-4 mx-auto text-lg font-medium text-center text-white bg-yellow-500 rounded">
        জন্ম নিবন্ধন এর পিডিএফ কপি পেতে অনলাইন কপির screenshoot, Upload Birth
        Certificate অপশনে ক্লিক করে আপলোড করুন। স্থায়ী ঠিকানা ফরমেট অনুসারে
        লিখবেন ডাটা আসবে না সম্পূর্ণ ডাটা অটোমেটিক লোড হবে, সাবমিট দেয়ার আগে
        ভালো ভাবে দেখে নিবেন সব ঠিক আছে কিনা। এছাড়া আপলোড না করেও টাইপ করে
        পেডিএফ মেক করতে পারবেন। অনলাইন কপি ডাউনলোড করতে{" "}
        <a
          className="font-bold text-blue-700"
          target="_blank"
          href="https://everify.bdris.gov.bd"
        >
          এখানে ক্লিক করুন
        </a>
      </p>
      <Marquee className="my-10">
        <h2 className="mb-4 text-xl font-bold">
          💢আপনার একাউন্ট থেকে {Balance.birthBalance}tk কেটে নেয়া হবে ।💢
        </h2>
      </Marquee>

      <form onSubmit={handleSubmit} className="my-4">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 ">
          <div className="mb-4">
            <label htmlFor="registerOfficeAddress" className="block mb-1">
              Register Office Address *
            </label>
            <input
              type="text"
              id="registerOfficeAddress"
              name="registerOfficeAddress"
              value={formData.registerOfficeAddress}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="upazilaOrCity" className="block mb-1">
              Upazila/Pourashava/City Corporation, Zila *
            </label>
            <input
              type="text"
              id="upazilaOrCity"
              name="upazilaOrCity"
              value={formData.upazilaOrCity}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="birthRegistrationNumber" className="block mb-1">
              Birth Registration Number *
            </label>
            <input
              type="text"
              id="birthRegistrationNumber"
              name="birthRegistrationNumber"
              value={formData.birthRegistrationNumber}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="leftBarcode" className="block mb-1">
              Left Barcode *
            </label>
            <input
              type="text"
              id="leftBarcode"
              name="leftBarcode"
              value={formData.leftBarcode}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfRegistration" className="block mb-1">
              Date of Registration *
            </label>
            <input
              type="text"
              id="dateOfRegistration"
              name="dateOfRegistration"
              value={formData.dateOfRegistration}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfIssuance" className="block mb-1">
              Date of Issuance *
            </label>
            <input
              type="text"
              id="dateOfIssuance"
              name="dateOfIssuance"
              value={formData.dateOfIssuance}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block mb-1">
            Date of Birth *
          </label>
          <input
            type="text"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 ">
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-1">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBirthInWords" className="block mb-1">
              Date of Birth in Words
            </label>
            <input
              type="text"
              id="dateOfBirthInWords"
              name="dateOfBirthInWords"
              value={formData.dateOfBirthInWords}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nameInBangla" className="block mb-1">
              নাম *
            </label>
            <input
              type="text"
              id="nameInBangla"
              name="nameInBangla"
              value={formData.nameInBangla}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nameInEnglish" className="block mb-1">
              Name (English) *
            </label>
            <input
              type="text"
              id="nameInEnglish"
              name="nameInEnglish"
              value={formData.nameInEnglish}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fatherNameInBangla" className="block mb-1">
              পিতার নাম *
            </label>
            <input
              type="text"
              id="fatherNameInBangla"
              name="fatherNameInBangla"
              value={formData.fatherNameInBangla}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fatherNameInEnglish" className="block mb-1">
              Father's Name (English) *
            </label>
            <input
              type="text"
              id="fatherNameInEnglish"
              name="fatherNameInEnglish"
              value={formData.fatherNameInEnglish}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fatherNationalityBangla" className="block mb-1">
              পিতার জাতীয়তা *
            </label>
            <input
              type="text"
              id="fatherNationalityBangla"
              name="fatherNationalityBangla"
              value={formData.fatherNationalityBangla}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fatherNationality" className="block mb-1">
              Father's Nationality *
            </label>
            <input
              type="text"
              id="fatherNationality"
              name="fatherNationality"
              value={formData.fatherNationality}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="motherNameInBangla" className="block mb-1">
              মাতার নাম *
            </label>
            <input
              type="text"
              id="motherNameInBangla"
              name="motherNameInBangla"
              value={formData.motherNameInBangla}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="motherNameInEnglish" className="block mb-1">
              Mother's Name (English) *
            </label>
            <input
              type="text"
              id="motherNameInEnglish"
              name="motherNameInEnglish"
              value={formData.motherNameInEnglish}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="motherNationalityBangla" className="block mb-1">
              মাতার জাতীয়তা *
            </label>
            <input
              type="text"
              id="motherNationalityBangla"
              name="motherNationalityBangla"
              value={formData.motherNationalityBangla}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="motherNationality" className="block mb-1">
              Mother's Nationality *
            </label>
            <input
              type="text"
              id="motherNationality"
              name="motherNationality"
              value={formData.motherNationality}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="placeOfBirthInBangla" className="block mb-1">
              জন্মস্থান *
            </label>
            <input
              type="text"
              id="placeOfBirthInBangla"
              name="placeOfBirthInBangla"
              value={formData.placeOfBirthInBangla}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="placeOfBirthInEnglish" className="block mb-1">
              Place of Birth (English) *
            </label>
            <input
              type="text"
              id="placeOfBirthInEnglish"
              name="placeOfBirthInEnglish"
              value={formData.placeOfBirthInEnglish}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="permanentAddressInBangla" className="block mb-1">
              স্থায়ী ঠিকানা *
            </label>
            <textarea
              placeholder="বাসা/হোল্ডিং: , গ্রাম/রাস্তা:, ডাকঘর:, ওয়ার্ড - , ইউনিয়ন/সিটি কর্পোরেশন, উপজেলা:, জেলা"
              type="text"
              id="permanentAddressInBangla"
              name="permanentAddressInBangla"
              value={formData.permanentAddressInBangla}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="permanentAddressInEnglish" className="block mb-1">
              Permanent Address (English) *
            </label>
            <textarea
              type="text"
              id="permanentAddressInEnglish"
              name="permanentAddressInEnglish"
              value={formData.permanentAddressInEnglish}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-blue-800 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BirthRegistrationForm;
