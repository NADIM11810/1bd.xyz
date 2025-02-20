import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import useApi from "../../Hooks/useApi";
import { useAuthContext } from "../../Context/AuthContext";

const ServerCopyPrint = () => {
  const router = useParams();
  const { api, data, loading } = useApi();
  const { gender } = useAuthContext();
  const navigate = useNavigate();

  const [nid, setNid] = useState(router.nid);
  const [dob, setDob] = useState(router.dob);

  useEffect(() => {
    // Check if it's the first time the page is loaded or a reload
    const isReloaded = sessionStorage.getItem("reloaded");

    if (isReloaded) {
      // If the page was previously reloaded, navigate to another page
      navigate("/server-copy");
    } else {
      // On initial load, set a flag indicating the page is loaded
      sessionStorage.setItem("reloaded", "true");
    }

    // Cleanup the flag when the user leaves the page or closes the tab.
    return () => {
      sessionStorage.removeItem("reloaded");
    };
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api({ nid, dob });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const componentRef = useRef();

  const handlePrint = () => {
    const printableContent = document.getElementById("pdf-content").innerHTML;
    const originalContents = document.body.innerHTML;

    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
            <html>
            <head>
                <title>Print</title>
                <style>
                    @page {
                        size: auto;
                        margin: 40px;
                    }
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .pdf-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 1000px;
                    }
                    /* Add your other CSS classes here */
                </style>
            </head>
            <body>${printableContent}</body>
            </html>
        `);
    printWindow.document.close();

    printWindow.print();

    // Restore original content after printing
    document.body.innerHTML = originalContents;
  };
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center ">
          <GridLoader color="#36d7b7" />{" "}
        </div>
      ) : (
        <div
          className="w-7/12 min-h-screen"
          id="pdf-content"
          style={{}}
          ref={componentRef}
        >
          <div className="flex flex-col justify-center items-center w-[800px] ">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="project"
                src="https://i.ibb.co/QkmKD8s/image.png"
                className=""
                style={{
                  maxWidth: "100%",
                  height: "150px",
                  borderBottom: "2px solid #008000",
                }}
              />
              <img
                src={data?.data?.photo}
                alt=""
                style={{
                  height: "120px",
                  width: "100px",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                  marginTop: "3px",
                }}
              />
              <div className="mt-2 font-bold">{data?.data?.nameEn}</div>
            </div>
            <div className="w-[750px]">
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "60%",
                  margin: "auto",
                  marginTop: "10px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      className=""
                      style={{
                        height: "3px",
                        border: "1px solid #EEEEEE",
                        padding: "5px",
                        width: "40%",
                        textAlign: "start",
                      }}
                    >
                      জাতীয় পরিচিতি তথ্য
                    </th>
                    <th
                      style={{ border: "1px solid #EEEEEE", padding: "5px" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      জাতীয় পরিচয় পত্র নম্বর
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.nationalId}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      পিন নম্বর
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.pin}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      ভোটার নম্বর
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.voter_no}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "4px" }}>
                      ভোটার সিরিয়াল
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "4px" }}>
                      {data?.data?.sl_no}
                    </td>
                  </tr>
                  {/* <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>ভোটার এরিয়া কোড</td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.voterAreaCode}
                    </td>
                  </tr> */}
                </tbody>
              </table>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "60%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                    <th
                      className=""
                      style={{
                        border: "1px solid #EEEEEE",
                        padding: "5px",
                        width: "40%",
                        textAlign: "start",
                      }}
                    >
                      ব্যক্তিগত তথ্য
                    </th>
                    <th
                      style={{ border: "1px solid #EEEEEE", padding: "5px" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      নাম (বাংলা)
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.name}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      নাম (ইংরেজী)
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.nameEn}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      জন্ম তারিখ
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.dateOfBirth}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      পিতার নাম
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.father}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      মাতার নাম
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.mother}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      স্বামী/স্ত্রীর নাম
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.spouse}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "60%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                    <th
                      className=""
                      style={{
                        border: "1px solid #EEEEEE",
                        padding: "5px",
                        width: "40%",
                        textAlign: "start",
                      }}
                    >
                      অন্যান্য তথ্য
                    </th>

                    <th
                      style={{ border: "1px solid #EEEEEE", padding: "5px" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      লিঙ্গ
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.gender}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      রক্তের গ্রুপ
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.bloodGroup}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      জন্মস্থান
                    </td>
                    <td style={{ border: "1px solid #EEEEEE", padding: "5px" }}>
                      {data?.data?.permanentAddress?.district}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  borderCollapse: "collapse",
                  width: "60%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                    <th
                      className=""
                      style={{
                        border: "1px solid #EEEEEE",
                        width: "33.25%",
                        textAlign: "start",
                      }}
                    >
                      বর্তমান ঠিকানা
                    </th>
                    <th
                      className=""
                      style={{ border: "1px solid #EEEEEE", width: "50%" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan="2"
                      style={{
                        border: "1px solid #EEEEEE",
                        padding: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {data?.data?.presentAddress.address_line}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  borderCollapse: "collapse",
                  width: "60%",
                  margin: "auto",
                }}
              >
                <thead>
                  <tr>
                    <th
                      className=""
                      style={{
                        border: "1px solid #EEEEEE",
                        width: "33.25%",
                        textAlign: "start",
                      }}
                    >
                      স্থায়ী ঠিকানা
                    </th>
                    <th
                      className=""
                      style={{ border: "1px solid #EEEEEE", width: "50%" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan="2"
                      style={{
                        border: "1px solid #EEEEEE",
                        padding: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {data?.data?.permanentAddress.address_line}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://i.ibb.co/g7ySxJp/image.png"
                alt=""
                style={{ marginTop: "5px", width: "700px" }}
              />
            </div>
          </div>

          <style type="text/css" media="print">
            {`
        @page {
            size: auto;
            margin: 0;
        }

        body {
            background-color: #fff; /* Set background color for the body */
        }





        /* Additional styles to retain background colors */
        * {
            -webkit-print-color-adjust: exact; /* Retain background colors */
        }

        /* Hide unnecessary elements for printing */
        h1, h2, h3, h4, h5, h6 {
            display: none;
        }
        time {
            display: none;
        }
    `}
          </style>
        </div>
      )}
      <div className="flex justify-center">
        <button
          className="btn"
          onClick={handlePrint}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ServerCopyPrint;
