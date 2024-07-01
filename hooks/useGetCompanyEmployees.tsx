import { BASE_API_URL } from "@/constants/urls";
import useSWR from "swr";

interface ResponseDTO {
  id: string;
  name: string;
  company_id: string;
  company_employee_id: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  name: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then(async (res) => {
    if (res.status === 200) {
      const data: ResponseDTO[] = await res.json();

      const transformedData: Employee[] = data.map((employee) => ({
        id: employee.id,
        name: employee.name,
        companyId: employee.company_id,
        createdAt: new Date(employee.created_at),
        updatedAt: new Date(employee.updated_at),
      }));

      return transformedData;
    } else {
      const error = await res.json();
      throw new Error(error.detail);
    }
  });

export function useGetCompanyEmployees(companyId: string) {
  const url = companyId
    ? `${BASE_API_URL}/company/${companyId}/employees`
    : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data: data,
    isLoading,
    error,
  };
}
