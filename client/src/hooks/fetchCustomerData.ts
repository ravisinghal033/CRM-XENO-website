"use client";

import { useEffect, useState } from "react";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

interface ShopDetail {
  custName: string;
  custEmail: string;
  spends: number;
  visits: number;
  lastVisits: string;
}

interface FetchDataResponse {
  data: ShopDetail[] | null;
  error: string | null;
  loading: boolean;
}

const useFetchCustomerData = (): FetchDataResponse => {
  const [data, setData] = useState<ShopDetail[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const notify = useNotificationCenter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/getAllCustomerData",
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData: ShopDetail[] = await response.json();
        setData(responseData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [notify]);

  return { data, error, loading };
};

export default useFetchCustomerData;
