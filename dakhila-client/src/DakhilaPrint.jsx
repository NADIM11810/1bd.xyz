import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";

function convertToBanglaNumber(input) {
  const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  let number = input + "";
  let result = "";

  for (let i = 0; i < number.length; i++) {
    const char = number[i];
    if (char >= "0" && char <= "9") {
      result += banglaNumbers[char];
    } else {
      result += char;
    }
  }

  return result;
}

function convertToEnglishNumber(input) {
  const englishNumbers = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  let result = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (englishNumbers[char]) {
      result += englishNumbers[char];
    } else {
      result += char;
    }
  }

  return result;
}

const DakhilaPrint = () => {
  const { id } = useParams();
  const [roshidData, setRoshidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = faviconURL;
      document.head.appendChild(newLink);
    } else {
      link.href = "/gov-favicon.ico";
    }
    document.title = "ভূমি উন্নয়ন কর: Dakhila";
  }, []);

  useEffect(() => {
    const fetchRoshidData = async () => {
      try {
        const response = await fetch(
          `https://1bd.xyz/api/apply/get-roshid/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch roshid data");
        }
        const data = await response.json();
        setRoshidData(data);
      } catch (error) {
        console.error("Error fetching roshid data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoshidData();
  }, [id]);

  useEffect(() => {
    if (isPrinting) {
      setTimeout(() => {
        window.print();
        setIsPrinting(false);
      }, 100);
    }
  }, [isPrinting]);

  const handlePrint = () => {
    document.querySelector("html").style.backgroundColor = "white";
    setIsPrinting(true);
  };

  if (!roshidData) {
    return <div></div>;
  }

  const WonerDetails = () => {
    const owners = roshidData.ownerDetails;
    const ownerCount = owners.length;
    const halfOwnerCount = ownerCount / 2;

    return (
      <>
        <table
          style={{
            border: "1px dotted",
            borderCollapse: "collapse",
            margin: "10px 2px",
            width: ownerCount <= 1 ? "100%" : "49%",
            fontSize: "11px",
            float: "left",
          }}
        >
          <thead>
            <tr>
              <th className="b1" style={{ width: "10%", textAlign: "center" }}>
                ক্রমঃ
              </th>
              <th className="b1" style={{ width: "60%", textAlign: "center" }}>
                মালিকের নাম
              </th>
              <th className="b1" style={{ width: "25%", textAlign: "center" }}>
                মালিকের অংশ
              </th>
            </tr>
          </thead>
          <tbody>
            {owners.map(
              (owner, index) =>
                index < halfOwnerCount && (
                  <tr key={index}>
                    <td className="text-center b1 input_bangla">
                      {convertToBanglaNumber(index + 1)}
                    </td>
                    <td className="b1 input_bangla">{owner.ownerName}</td>
                    <td className="text-center b1 input_bangla">
                      {convertToBanglaNumber(owner.ownerShare)}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        {ownerCount > 1 && (
          <table
            style={{
              border: "1px dotted",
              borderCollapse: "collapse",
              margin: "10px 2px",
              width: "49%",
              fontSize: "11px",
              float: "right",
            }}
          >
            <thead>
              <tr>
                <th
                  className="b1"
                  style={{ width: "10%", textAlign: "center" }}
                >
                  ক্রমঃ
                </th>
                <th
                  className="b1"
                  style={{ width: "60%", textAlign: "center" }}
                >
                  মালিকের নাম
                </th>
                <th
                  className="b1"
                  style={{ width: "25%", textAlign: "center" }}
                >
                  মালিকের অংশ
                </th>
              </tr>
            </thead>
            <tbody>
              {owners.map(
                (owner, index) =>
                  index >= halfOwnerCount && (
                    <tr key={index}>
                      <td className="text-center b1 input_bangla">
                        {convertToBanglaNumber(index + 1)}
                      </td>
                      <td className="b1 input_bangla">{owner.ownerName}</td>
                      <td className="text-center b1 input_bangla">
                        {convertToBanglaNumber(owner.ownerShare)}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}
      </>
    );
  };

  const LandDeatiles = () => {
    const landDetails = roshidData.landDetails;
    const landCount = landDetails.length;
    const halfLandCount = landCount / 2;

    return (
      <>
        <table
          style={{
            border: "1px dotted",
            borderCollapse: "collapse",
            margin: "10px 2px",
            width: landCount <= 1 ? "100%" : "50%",
            fontSize: "11px",
            float: "left",
          }}
        >
          <thead>
            <tr>
              <th className="b1">ক্রমঃ</th>
              <th className="b1">দাগ নং</th>
              <th className="b1">জমির শ্রেণি</th>
              <th className="b1">জমির পরিমাণ (শতাংশ)</th>
            </tr>
          </thead>
          <tbody>
            {landDetails.map(
              (land, index) =>
                index < halfLandCount && (
                  <tr key={index}>
                    <td className="text-center b1 input_bangla">
                      {convertToBanglaNumber(index + 1)}
                    </td>
                    <td className="b1 input_bangla">
                      {convertToBanglaNumber(land.plotNo)}
                    </td>
                    <td className="b1">{land.landCategory}</td>
                    <td className="b1 input_bangla">
                      {convertToBanglaNumber(land.landArea)}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        {landCount > 1 && (
          <table
            style={{
              border: "1px dotted",
              borderCollapse: "collapse",
              margin: "10px 2px",
              width: "48%",
              fontSize: "11px",
              float: "right",
            }}
          >
            <thead>
              <tr>
                <th className="b1">ক্রমঃ</th>
                <th className="b1">দাগ নং</th>
                <th className="b1">জমির শ্রেণি</th>
                <th className="b1">জমির পরিমাণ (শতাংশ)</th>
              </tr>
            </thead>
            <tbody>
              {landDetails.map(
                (land, index) =>
                  index >= halfLandCount && (
                    <tr key={index}>
                      <td className="text-center b1 input_bangla">
                        {convertToBanglaNumber(index + 1)}
                      </td>
                      <td className="b1 input_bangla">
                        {convertToBanglaNumber(land.plotNo)}
                      </td>
                      <td className="b1">{land.landCategory}</td>
                      <td className="b1 input_bangla">
                        {convertToBanglaNumber(land.landArea)}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}
      </>
    );
  };

  return isPrinting ? (
    <div id="printArea">
      <div
        style={{
          fontFamily: "kalpurush, Arial, sans-serif",
          lineHeight: "1.2",
          color: "rgb(51, 51, 51)",
          backgroundColor: "rgb(255, 255, 255)",
          width: "7.9in",
          height: "11in",
          borderRadius: "10px",
          border: "1px dotted",
          padding: "10px",
          margin: "auto",
          position: "relative",
          marginTop: "30px",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="from-controll dakhila-top-control">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td className="text-left">
                      বাংলাদেশ ফরম নং{" "}
                      {convertToBanglaNumber(roshidData.bangladeshFormNo)}
                    </td>
                    <td className="text-right">
                      (পরিশিষ্ট: {convertToBanglaNumber(roshidData.appendix)})
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left">(সংশোধিত)</td>
                    <td className="text-right input_bangla">
                      ক্রমিক নং {convertToBanglaNumber(roshidData.serialNo)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center" colSpan={2}>
                      ভূমি উন্নয়ন কর পরিশোধ রসিদ{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center" colSpan={2}>
                      (অনুচ্ছেদ {convertToBanglaNumber(roshidData.paragraphNo)}{" "}
                      দ্রষ্টব্য){" "}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ width: "100%", height: "20px" }} />
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "320px" }}>
                      সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম:
                    </td>
                    <td className="dotted_botton">
                      {roshidData.landOfficeName}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style={{ marginTop: "5px", width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "170px" }}>মৌজার নাম ও জে. এল. নং:</td>
                    <td
                      className="dotted_botton input_bangla"
                      style={{ padding: "0px 10px 0px 5px" }}
                    >
                      {convertToBanglaNumber(roshidData.mouzaJLNo)}
                    </td>
                    <td style={{ width: "105px" }}>উপজেলা/থানা:</td>
                    <td
                      className="dotted_botton"
                      style={{ padding: "0px 10px 0px 5px" }}
                    >
                      {roshidData.upazilaThana}
                    </td>
                    <td style={{ width: "40px" }}>জেলা:</td>
                    <td
                      className="dotted_botton"
                      style={{ padding: "0px 10px 0px 5px" }}
                    >
                      {roshidData.district}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style={{ marginTop: "5px", width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "225px" }}>
                      ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:
                    </td>
                    <td
                      className="dotted_botton numeric_bangla"
                      style={{ paddingLeft: "10px" }}
                    >
                      {convertToBanglaNumber(roshidData.holdingNumber)}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style={{ marginTop: "5px", width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "75px" }}>খতিয়ান নং:</td>
                    <td
                      className="dotted_botton numeric_bangla"
                      style={{ paddingLeft: "10px" }}
                    >
                      {convertToBanglaNumber(roshidData.khatianNo)}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ height: "10px" }} />
            </div>
            <div className="from-controll">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  textAlign: "center",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <u>মালিকের বিবরণ</u>
              </p>
            </div>
            <WonerDetails />
          </div>
        </div>
        <div className="col-md-12">
          <p
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              textAlign: "center",
              margin: "0px",
              padding: "0px",
            }}
          >
            <u>জমির বিবরণ</u>
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <LandDeatiles />

            <table
              style={{
                border: "1px dotted",
                borderCollapse: "collapse",
                margin: "10px 2px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              <tbody>
                <tr>
                  <td className="text-center b1" style={{ width: "50%" }}>
                    সর্বমোট জমি (শতাংশ)
                  </td>
                  <td className="b1 input_bangla" style={{ width: "50%" }}>
                    {convertToBanglaNumber(
                      roshidData.landDetails
                        .reduce(
                          (sum, land) =>
                            sum +
                            parseFloat(
                              convertToEnglishNumber(land.landArea) || 0
                            ),
                          0
                        )
                        .toFixed(2) || "দুঃখিত! সঠিক ভাবে জমির পরিমাণ ইনপুট দিন"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ height: "10px" }} />
            <table
              className="table table-striped table-bordered table-hover"
              style={{ margin: "10px 2px" }}
            >
              <tbody>
                <tr>
                  <th
                    className="bg-[#f9f9f9]"
                    colSpan={8}
                    style={{ textAlign: "center" }}
                  >
                    আদায়ের বিবরণ{" "}
                  </th>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    তিন বৎসরের ঊর্ধ্বের বকেয়া
                  </td>
                  <td style={{ textAlign: "center" }}>গত তিন বৎসরের বকেয়া</td>
                  <td style={{ textAlign: "center" }}>
                    বকেয়ার জরিমানা ও ক্ষতিপূরণ
                  </td>
                  <td style={{ textAlign: "center" }}>হাল দাবি</td>
                  <td style={{ textAlign: "center" }}>মোট দাবি</td>
                  <td style={{ textAlign: "center" }}>মোট আদায়</td>
                  <td style={{ textAlign: "center" }}>মোট বকেয়া</td>
                  <td style={{ textAlign: "center" }}>মন্তব্য</td>
                </tr>
                <tr>
                  <td align="center">
                    {convertToBanglaNumber(roshidData.arrearLastThreeYears)}
                  </td>
                  <td align="center">
                    {convertToBanglaNumber(roshidData.arrearPastThreeYears)}
                  </td>
                  <td align="center">
                    {convertToBanglaNumber(roshidData.interestAndCompensation)}
                  </td>
                  <td align="center">
                    {convertToBanglaNumber(roshidData.currentClaim)}
                  </td>
                  <td align="center">
                    {convertToBanglaNumber(roshidData.totalClaim)}
                  </td>
                  <td align="center">
                    {convertToBanglaNumber(roshidData.totalCollection)}
                  </td>
                  <td align="center">
                    {convertToBanglaNumber(roshidData.totalArrear)}
                  </td>
                  <td align="center" />
                </tr>
              </tbody>
            </table>
            <div style={{ margin: "10px 2px" }}>
              <p className="dotted_botton">
                {" "}
                সর্বমোট (কথায়): {roshidData.totalInWords}
              </p>
            </div>
            <div className="row dakhila-bottom-control">
              <div className="flex justify-between col-md-12">
                <div style={{ float: "left" }}>
                  <p>
                    নোট: সর্বশেষ কর পরিশোধের সাল - {roshidData.noteBl} (অর্থবছর)
                  </p>
                  <p className="input_bangla">
                    {" "}
                    চালান নং : {convertToBanglaNumber(roshidData.challanNo)}
                  </p>
                  <p>তারিখ : </p>
                  <div style={{ marginTop: "-37px", marginLeft: "10px" }}>
                    <p
                      style={{
                        width: "115px",
                        padding: "0px",
                        margin: "0px 0px 2px 38px",
                      }}
                    >
                      {convertToBanglaNumber(roshidData.dateBangla)}
                    </p>
                    <span
                      style={{ borderTop: "1px solid", marginLeft: "36px" }}
                    >
                      {convertToBanglaNumber(roshidData.dateEnglish)}
                    </span>
                    <p />
                  </div>
                  <p />
                </div>
                <div
                  style={{
                    width: "90px",
                    float: "left",
                    position: "relative",
                    left: "-20px",
                  }}
                >
                  <QRCodeSVG
                    value={`https://dakhila-ldtax-gov.1bd.xyz/dakhila-print/${id}`}
                    size={75}
                  />
                </div>
                <div
                  style={{
                    float: "right",
                    textAlign: "right",
                    fontSize: "12px",
                    fontFamily: "kalpurush, Arial, sans-serif",
                  }}
                >
                  <p className="text-center" style={{ padding: "5px" }}>
                    এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে, <br /> কোন
                    স্বাক্ষর প্রয়োজন নেই।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="text-right col-md-12"
            style={{
              width: "100%",
              position: "absolute",
              bottom: "0px",
              right: "0px",
            }}
          >
            <div
              style={{
                width: "100%",
                borderTop: "1px dotted gray",
                marginTop: "15px",
              }}
            />
            <div className="from-controll">1/1</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{ paddingTop: "50px" }}
      className="py-10 page-container bg-[#f4ffe6] w-screen min-h-screen"
    >
      <div
        style={{
          display: "flex",
          marginBottom: "1.25rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            width: "100%",
            backgroundColor: "#4B8DF8",
            padding: "0.5rem",
            paddingTop: "2px",
            height: "68px",
            borderColor: "#3B82F6",
            borderRadius: "0.25rem",
            position: "relative",
            border: "1px solid #7cacfa",
            overflow: "hidden",
            fontFamily: "kalpurush, Arial, sans-serif",
          }}
        >
          <button
            onMouseDown={(e) =>
              (e.currentTarget.style.boxShadow =
                "rgba(0, 0, 0, 0.5) -2px -2px 2px")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow =
                "rgba(0, 0, 0, 0.5) 2px 2px 2px")
            }
            onClick={() => handlePrint()}
            style={{
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              borderRadius: "0.25rem",
              color: "#ffffff",
              backgroundColor: "#3B82F6",
              fontSize: "14px",
              boxShadow: "rgba(0, 0, 0, 0.5) 2px 2px 2px",
            }}
          >
            প্রিন্ট
          </button>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "21px",
              backgroundColor: "white",
            }}
          />
        </div>
      </div>
      <div id="printArea" style={{ paddingBottom: "50px" }}>
        <div
          style={{
            fontFamily: "kalpurush, Arial, sans-serif",
            lineHeight: "1.2",
            color: "rgb(51, 51, 51)",
            backgroundColor: "rgb(255, 255, 255)",
            width: "7.9in",
            height: "11in",
            borderRadius: "10px",
            border: "1px dotted",
            padding: "10px",
            margin: "auto",
            position: "relative",
            marginTop: "40px",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="from-controll dakhila-top-control">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td className="text-left">
                        বাংলাদেশ ফরম নং{" "}
                        {convertToBanglaNumber(roshidData.bangladeshFormNo)}
                      </td>
                      <td className="text-right">
                        (পরিশিষ্ট: {convertToBanglaNumber(roshidData.appendix)})
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left">(সংশোধিত)</td>
                      <td className="text-right input_bangla">
                        ক্রমিক নং {convertToBanglaNumber(roshidData.serialNo)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center" colSpan={2}>
                        ভূমি উন্নয়ন কর পরিশোধ রসিদ{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center" colSpan={2}>
                        (অনুচ্ছেদ{" "}
                        {convertToBanglaNumber(roshidData.paragraphNo)}{" "}
                        দ্রষ্টব্য){" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ width: "100%", height: "20px" }} />
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "320px" }}>
                        সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম:
                      </td>
                      <td className="dotted_botton">
                        {roshidData.landOfficeName}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ marginTop: "5px", width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "170px" }}>
                        মৌজার নাম ও জে. এল. নং:
                      </td>
                      <td
                        className="dotted_botton input_bangla"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        {convertToBanglaNumber(roshidData.mouzaJLNo)}
                      </td>
                      <td style={{ width: "105px" }}>উপজেলা/থানা:</td>
                      <td
                        className="dotted_botton"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        {roshidData.upazilaThana}
                      </td>
                      <td style={{ width: "40px" }}>জেলা:</td>
                      <td
                        className="dotted_botton"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        {roshidData.district}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ marginTop: "5px", width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "225px" }}>
                        ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:
                      </td>
                      <td
                        className="dotted_botton numeric_bangla"
                        style={{ paddingLeft: "10px" }}
                      >
                        {convertToBanglaNumber(roshidData.holdingNumber)}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ marginTop: "5px", width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "75px" }}>খতিয়ান নং:</td>
                      <td
                        className="dotted_botton numeric_bangla"
                        style={{ paddingLeft: "10px" }}
                      >
                        {convertToBanglaNumber(roshidData.khatianNo)}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ height: "10px" }} />
              </div>
              <div className="from-controll">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    textAlign: "center",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <u>মালিকের বিবরণ</u>
                </p>
              </div>
              <WonerDetails />
            </div>
          </div>
          <div className="col-md-12">
            <p
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                textAlign: "center",
                margin: "0px",
                padding: "0px",
              }}
            >
              <u>জমির বিবরণ</u>
            </p>
          </div>
          <div className="row">
            <div className="col-md-12">
              <LandDeatiles />

              <table
                style={{
                  border: "1px dotted",
                  borderCollapse: "collapse",
                  margin: "10px 2px",
                  width: "100%",
                  fontSize: "12px",
                }}
              >
                <tbody>
                  <tr>
                    <td className="text-center b1" style={{ width: "50%" }}>
                      সর্বমোট জমি (শতাংশ)
                    </td>
                    <td className="b1 input_bangla" style={{ width: "50%" }}>
                      {convertToBanglaNumber(
                        roshidData.landDetails
                          .reduce(
                            (sum, land) =>
                              sum +
                              parseFloat(
                                convertToEnglishNumber(land.landArea) || 0
                              ),
                            0
                          )
                          .toFixed(2) ||
                          "দুঃখিত! সঠিক ভাবে জমির পরিমাণ ইনপুট দিন"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ height: "10px" }} />
              <table
                className="table table-striped table-bordered table-hover"
                style={{ margin: "10px 2px" }}
              >
                <tbody>
                  <tr>
                    <th
                      className="bg-[#f9f9f9]"
                      colSpan={8}
                      style={{ textAlign: "center" }}
                    >
                      আদায়ের বিবরণ{" "}
                    </th>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      তিন বৎসরের ঊর্ধ্বের বকেয়া
                    </td>
                    <td style={{ textAlign: "center" }}>
                      গত তিন বৎসরের বকেয়া
                    </td>
                    <td style={{ textAlign: "center" }}>
                      বকেয়ার জরিমানা ও ক্ষতিপূরণ
                    </td>
                    <td style={{ textAlign: "center" }}>হাল দাবি</td>
                    <td style={{ textAlign: "center" }}>মোট দাবি</td>
                    <td style={{ textAlign: "center" }}>মোট আদায়</td>
                    <td style={{ textAlign: "center" }}>মোট বকেয়া</td>
                    <td style={{ textAlign: "center" }}>মন্তব্য</td>
                  </tr>
                  <tr>
                    <td align="center">
                      {convertToBanglaNumber(roshidData.arrearLastThreeYears)}
                    </td>
                    <td align="center">
                      {convertToBanglaNumber(roshidData.arrearPastThreeYears)}
                    </td>
                    <td align="center">
                      {convertToBanglaNumber(
                        roshidData.interestAndCompensation
                      )}
                    </td>
                    <td align="center">
                      {convertToBanglaNumber(roshidData.currentClaim)}
                    </td>
                    <td align="center">
                      {convertToBanglaNumber(roshidData.totalClaim)}
                    </td>
                    <td align="center">
                      {convertToBanglaNumber(roshidData.totalCollection)}
                    </td>
                    <td align="center">
                      {convertToBanglaNumber(roshidData.totalArrear)}
                    </td>
                    <td align="center" />
                  </tr>
                </tbody>
              </table>
              <div style={{ margin: "10px 2px" }}>
                <p className="dotted_botton">
                  {" "}
                  সর্বমোট (কথায়): {roshidData.totalInWords}
                </p>
              </div>
              <div className="row dakhila-bottom-control">
                <div className="flex justify-between col-md-12">
                  <div style={{ float: "left" }}>
                    <p>
                      নোট: সর্বশেষ কর পরিশোধের সাল - {roshidData.noteBl}{" "}
                      (অর্থবছর)
                    </p>
                    <p className="input_bangla">
                      {" "}
                      চালান নং : {convertToBanglaNumber(roshidData.challanNo)}
                    </p>
                    <p>তারিখ : </p>
                    <div style={{ marginTop: "-37px", marginLeft: "10px" }}>
                      <p
                        style={{
                          width: "115px",
                          padding: "0px",
                          margin: "0px 0px 2px 38px",
                        }}
                      >
                        {convertToBanglaNumber(roshidData.dateBangla)}
                      </p>
                      <span
                        style={{ borderTop: "1px solid", marginLeft: "36px" }}
                      >
                        {convertToBanglaNumber(roshidData.dateEnglish)}
                      </span>
                      <p />
                    </div>
                    <p />
                  </div>
                  <div
                    style={{
                      width: "90px",
                      float: "left",
                      position: "relative",
                      left: "-20px",
                    }}
                  >
                    <QRCodeSVG
                      value={`https://dakhila-ldtax-gov.1bd.xyz/dakhila-print/${id}`}
                      size={75}
                    />
                  </div>
                  <div
                    style={{
                      float: "right",
                      textAlign: "right",
                      fontSize: "12px",
                      fontFamily: "kalpurush, Arial, sans-serif",
                    }}
                  >
                    <p className="text-center" style={{ padding: "5px" }}>
                      এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে, <br /> কোন
                      স্বাক্ষর প্রয়োজন নেই।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="text-right col-md-12"
              style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                right: "0px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderTop: "1px dotted gray",
                  marginTop: "15px",
                }}
              />
              <div className="from-controll">1/1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DakhilaPrint;
