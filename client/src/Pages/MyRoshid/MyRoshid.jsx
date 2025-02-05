import { FaDownload } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function MyRoshid() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchRoshid = async () => {
      try {
        const response = await fetch("/api/apply/get-roshid");
        const data = await response.json();
        setTableData(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoshid();
  }, []);

  const handleRoshidDelete = async (roshidId) => {
    try {
      const response = await fetch("/api/apply/delete-roshid", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: roshidId }),
      });
      const data = await response.json(roshidId);
      if (response.ok) {
        setTableData(tableData.filter((row) => row._id !== roshidId));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-white bg-gray-900">
                <th className="px-6 py-4 text-left">SL</th>
                <th className="px-6 py-4 text-left">SERIAL NO</th>
                <th className="px-6 py-4 text-left">KHATIAN NO</th>
                <th className="px-6 py-4 text-left">DATE</th>
                <th className="px-6 py-4 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((row, i) => (
                <tr key={row._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{row.serialNo}</td>
                  <td className="px-6 py-4">{row.khatianNo}</td>
                  <td className="px-6 py-4">
                    {new Date(row.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          (window.location.href = `https://dakhila-ldtax-gov.1bd.xyz/dakhila-print/${row._id}`)
                        }
                        className="flex items-center gap-1 px-4 py-2 text-gray-800 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <FaDownload size />
                        Download
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = `/roshid/edit/${row._id}`)
                        }
                        className="flex items-center gap-1 px-4 py-2 text-gray-800 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <FaEdit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleRoshidDelete(row._id)}
                        className="flex items-center gap-1 px-4 py-2 text-gray-800 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <FaRegTrashAlt size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyRoshid;
