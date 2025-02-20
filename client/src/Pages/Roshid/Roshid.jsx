import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";
import { useParams } from "react-router-dom";

const Roshid = () => {
  const { refresh, setRefresh, balance } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [Balance, setBalance] = useState({});
  const { id } = useParams();

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

  useEffect(() => {
    if (id) {
      const fetchRoshidData = async () => {
        try {
          const response = await fetch(`/api/apply/get-roshid/${id}`);
          const data = await response.json();
          if (response.ok) {
            setFormData({
              bangladeshFormNo: data.bangladeshFormNo,
              attachment: data.appendix,
              serialNumber: data.serialNo,
              paragraphNumber: data.paragraphNo,
              landOfficeName: data.landOfficeName,
              mouzaJLNo: data.mouzaJLNo,
              upazilaThana: data.upazilaThana,
              district: data.district,
              arrearLastThreeYears: data.arrearLastThreeYears,
              arrearPastThreeYears: data.arrearPastThreeYears,
              interestAndCompensation: data.interestAndCompensation,
              currentClaim: data.currentClaim,
              totalClaim: data.totalClaim,
              totalCollection: data.totalCollection,
              totalArrear: data.totalArrear,
              totalInWords: data.totalInWords,
              noteBl: data.noteBl,
              challanNo: data.challanNo,
              dateBangla: data.dateBangla,
              dateEnglish: data.dateEnglish,
              khatianNo: data.khatianNo,
              holdingNumber: data.holdingNumber,
            });
            setOwners(data.ownerDetails || []);
            setLands(data.landDetails || []);
          }
        } catch (error) {
          console.error("Error fetching roshid data:", error);
          toast.error("Error loading roshid data");
        }
      };
      fetchRoshidData();
    }
  }, [id]);

  const [formData, setFormData] = useState({
    bangladeshFormNo: "",
    attachment: "",
    serialNumber: "",
    paragraphNumber: "",
    landOfficeName: "",
    mouzaJLNo: "",
    upazilaThana: "",
    district: "",
    ownerDetails: [
      {
        ownerName: "",
        ownerShare: "",
      },
    ],
    landDetails: [
      {
        landCategory: "",
        landArea: "",
        plotNo: "",
      },
    ],
    khatianNo: "",
    holdingNumber: "",
    arrearLastThreeYears: "",
    arrearPastThreeYears: "",
    interestAndCompensation: "",
    currentClaim: "",
    totalClaim: "",
    totalCollection: "",
    totalArrear: "",
    totalInWords: "",
    noteBl: "",
    challanNo: "",
    dateBangla: "",
    dateEnglish: "",
    category: "roshid",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (balance < Balance.roshidBalance && !id) {
      toast.error("Insufficient balance!");
      setLoading(false);
      return;
    }

    const url = id
      ? `/api/apply/update-roshid/${id}`
      : "/api/apply/create-roshid";
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bangladeshFormNo: formData.bangladeshFormNo,
        appendix: formData.attachment,
        serialNo: formData.serialNumber,
        paragraphNo: formData.paragraphNumber,
        landOfficeName: formData.landOfficeName,
        mouzaJLNo: formData.mouzaJLNo,
        upazilaThana: formData.upazilaThana,
        district: formData.district,
        arrearLastThreeYears: formData.arrearLastThreeYears,
        arrearPastThreeYears: formData.arrearPastThreeYears,
        interestAndCompensation: formData.interestAndCompensation,
        currentClaim: formData.currentClaim,
        totalClaim: formData.totalClaim,
        totalCollection: formData.totalCollection,
        totalArrear: formData.totalArrear,
        totalInWords: formData.totalInWords,
        noteBl: formData.noteBl,
        challanNo: formData.challanNo,
        dateBangla: formData.dateBangla,
        dateEnglish: formData.dateEnglish,
        khatianNo: formData.khatianNo,
        holdingNumber: formData.holdingNumber,
        ownerDetails: owners,
        landDetails: lands,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then((data) => {
        if (!id) {
          return fetch("/api/users/update-balance-roshid", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          return fetch("/api/users/update-edit-balance-roshid", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      })
      .then(() => {
        toast.success(
          id ? "Roshid updated successfully!" : "Order placed successfully!"
        );
        setRefresh(!refresh);
        window.location.href = "/my-roshid";
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [owners, setOwners] = useState([{ ownerName: "", ownerShare: "" }]);

  const handleOwnerChange = (index, field, value) => {
    const newOwners = [...owners];
    newOwners[index][field] = value;
    setOwners(newOwners);
    setFormData({ ...formData, ownerDetails: newOwners });
  };

  const addOwner = () => {
    setOwners([...owners, { ownerName: "", ownerShare: "" }]);
  };

  const removeOwner = (index) => {
    const newOwners = owners.filter((_, i) => i !== index);
    setOwners(newOwners);
    setFormData({ ...formData, ownerDetails: newOwners });
  };

  const [lands, setLands] = useState([
    { landCategory: "", landArea: "", plotNo: "" },
  ]);

  const handleLandChange = (index, field, value) => {
    const newLands = [...lands];
    newLands[index][field] = value;
    setLands(newLands);
    setFormData({ ...formData, landDetails: newLands });
  };

  const addLand = () => {
    setLands([...lands, { landCategory: "", landArea: "", plotNo: "" }]);
  };

  const removeLand = (index) => {
    const newLands = lands.filter((_, i) => i !== index);
    setLands(newLands);
    setFormData({ ...formData, landDetails: newLands });
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-xl font-bold">ভূমি উন্নয়ন কর রশিদ Form</h2>
        <button
          onClick={() => (window.location.href = "/my-roshid")}
          className="px-4 py-2 text-white rounded-md cursor-pointer bg-violet-500 hover:bg-violet-600 focus:outline-none focus:bg-violet-600"
        >
          My Roshids
        </button>
      </div>
      <Marquee>
        <h2 className="mb-4 text-xl font-bold">
          💢আপনার একাউন্ট থেকে {Balance.roshidBalance}tk কেটে নেয়া হবে ।💢
        </h2>
      </Marquee>
      <form onSubmit={handleSubmit} className="w-full mx-auto ">
        {/* General Information */}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <h2 className="mb-2 text-lg font-bold">
              সাধারণ তথ্য (General Information):
            </h2>
            <div className="mb-4">
              <label htmlFor="bangladeshFormNo" className="block mb-1">
                বাংলাদেশ ফরম নং
              </label>
              <input
                type="text"
                id="bangladeshFormNo"
                name="bangladeshFormNo"
                value={formData.bangladeshFormNo}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="attachment" className="block mb-1">
                পরিশিষ্ট
              </label>
              <input
                type="text"
                id="attachment"
                name="attachment"
                value={formData.attachment}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="serialNumber" className="block mb-1">
                ক্রমিক নং
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full px-2 py-1</div> border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="paragraphNumber" className="block mb-1">
                অনুচ্ছেদ নং
              </label>
              <input
                type="text"
                id="paragraphNumber"
                name="paragraphNumber"
                value={formData.paragraphNumber}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="landOfficeName" className="block mb-1">
                ভূমি অফিসের নাম
              </label>
              <input
                type="text"
                id="landOfficeName"
                name="landOfficeName"
                value={formData.landOfficeName}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mouzaJLNo" className="block mb-1">
                মৌজার জে. এল. নং
              </label>
              <input
                type="text"
                id="mouzaJLNo"
                name="mouzaJLNo"
                value={formData.mouzaJLNo}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="upazilaThana" className="block mb-1">
                উপেজলা / থানা
              </label>
              <input
                type="text"
                id="upazilaThana"
                name="upazilaThana"
                value={formData.upazilaThana}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="district" className="block mb-1">
                জেলা
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">
              আদায়ের বিবরণ (Payment Details):
            </h2>
            <div className="mb-4">
              <label htmlFor="arrearLastThreeYears" className="block mb-1">
                তিন বৎসরের ঊর্ধ্বের বকেয়া
              </label>
              <input
                type="text"
                id="arrearLastThreeYears"
                name="arrearLastThreeYears"
                value={formData.arrearLastThreeYears}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="arrearPastThreeYears" className="block mb-1">
                গত তিন বছরের বকেয়া
              </label>
              <input
                type="text"
                id="arrearPastThreeYears"
                name="arrearPastThreeYears"
                value={formData.arrearPastThreeYears}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="interestAndCompensation" className="block mb-1">
                বকেয়ার সুদ ও ক্ষতিপূরণ
              </label>
              <input
                type="text"
                id="interestAndCompensation"
                name="interestAndCompensation"
                value={formData.interestAndCompensation}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="currentClaim" className="block mb-1">
                হাল দাবি
              </label>
              <input
                type="text"
                id="currentClaim"
                name="currentClaim"
                value={formData.currentClaim}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="totalClaim" className="block mb-1">
                মোট দাবি
              </label>
              <input
                type="text"
                id="totalClaim"
                name="totalClaim"
                value={formData.totalClaim}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="totalCollection" className="block mb-1">
                মোট আদায়
              </label>
              <input
                type="text"
                id="totalCollection"
                name="totalCollection"
                value={formData.totalCollection}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="totalArrear" className="block mb-1">
                মোট বকেয়া
              </label>
              <input
                type="text"
                id="totalArrear"
                name="totalArrear"
                value={formData.totalArrear}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="totalInWords" className="block mb-1">
                সর্বমোট (কথায়)
              </label>
              <input
                type="text"
                id="totalInWords"
                name="totalInWords"
                placeholder="সাত হাজার তিনশত চার টাকা মাত্র।"
                value={formData.totalInWords}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold">
              জমির বিবরণ (Land Details):
            </h2>

            <div className="mb-4 three">
              {lands.map((land, index) => (
                <div key={index} className="my-4 rounded">
                  <div className="mb-4">
                    <label className="block mb-1">জমির শ্রেণী</label>
                    <textarea
                      value={land.landCategory}
                      onChange={(e) =>
                        handleLandChange(index, "landCategory", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">জমির পরিমাণ</label>
                    <textarea
                      value={land.landArea}
                      onChange={(e) =>
                        handleLandChange(index, "landArea", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                  <div className="">
                    <label className="block mb-1">দাগ নং</label>
                    <textarea
                      value={land.plotNo}
                      onChange={(e) =>
                        handleLandChange(index, "plotNo", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeLand(index)}
                      className="px-4 py-2 my-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      জমির তথ্য বাদ দিন
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addLand}
                className="px-4 py-2 mt-4 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
              >
                আরও জমির তথ্য যোগ করুন
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="khatianNo" className="block mb-1">
                খতিয়ান নং
              </label>
              <input
                type="text"
                id="khatianNo"
                name="khatianNo"
                value={formData.khatianNo}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="holdingNumber" className="block mb-1">
                ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নাম্বার
              </label>
              <input
                type="text"
                id="holdingNumber"
                name="holdingNumber"
                value={formData.holdingNumber}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold">অতিরিক্ত (Additional):</h2>
            <div className="mb-4">
              <label htmlFor="noteBl" className="block mb-1">
                নোট সর্বশেষ কর পরিশোধের সাল
              </label>
              <input
                type="text"
                id="noteBl"
                name="noteBl"
                value={formData.noteBl}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="challanNo" className="block mb-1">
                চালান নং
              </label>
              <input
                type="text"
                id="challanNo"
                name="challanNo"
                value={formData.challanNo}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dateBangla" className="block mb-1">
                তারিখ (বাংলা)
              </label>
              <input
                type="text"
                id="dateBangla"
                name="dateBangla"
                value={formData.dateBangla}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dateEnglish" className="block mb-1">
                তারিখ (ইংলিশ)
              </label>
              <input
                type="text"
                id="dateEnglish"
                name="dateEnglish"
                value={formData.dateEnglish}
                placeholder="২৫ জানুয়ারী, ২০২৫"
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>

          <div className="grid gap-4 mb-10">
            {owners.map((owner, index) => (
              <div key={index} className="rounded ">
                <div className="mb-4">
                  <label className="block mb-1">মালিকের নাম</label>
                  <textarea
                    value={owner.ownerName}
                    onChange={(e) =>
                      handleOwnerChange(index, "ownerName", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">মালিকের অংশ</label>
                  <textarea
                    value={owner.ownerShare}
                    onChange={(e) =>
                      handleOwnerChange(index, "ownerShare", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeOwner(index)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    মালিকের নাম বাদ দিন
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOwner}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              আরও মালিকের নাম যোগ করুন
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-blue-800 hover:bg-blue-600"
          >
            {loading ? "Processing..." : id ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Roshid;
