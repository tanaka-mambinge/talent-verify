import { BASE_API_URL } from "@/constants/urls";
import { IEmployee } from "@/types/employee";
import useSWR from "swr";

interface ResponseDTO {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then(async (res) => {
    if (res.status === 200) {
      const data: ResponseDTO[] = await res.json();

      const transformedData: IEmployee[] = data.map((employee) => ({
        id: employee.id,
        name: employee.name,
        createdAt: new Date(employee.created_at),
        updatedAt: new Date(employee.updated_at),
      }));

      return transformedData;
    } else {
      const error = await res.json();
      throw new Error(error.detail);
    }
  });

export function useSearchEmployees(qParams: string) {
  const url = qParams ? `${BASE_API_URL}/employee?${qParams}` : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data: data,
    isLoading,
    error,
  };
}
