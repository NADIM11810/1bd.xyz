import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refresh, setRefresh } = useAuthContext();
  const api = async ({ nid, dob }) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/apply/push-backup?nid=${nid}&dob=${dob}`
      );
      const jsonData = await response.json();

      setData(jsonData);
      if (jsonData.status === "success") {
        const updateBalanceResponse = await fetch(
          "/api/users/update-balance-server",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!updateBalanceResponse.ok) {
          throw new Error("Failed to update balance");
        }

        const updateBalanceData = await updateBalanceResponse.json();
        toast.success("Order placed successfully!");
      } else {
        toast.error("NID not found");
      }
    } catch (error) {
      setError(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  return { api, data: data, loading, error };
};

export default useApi;
