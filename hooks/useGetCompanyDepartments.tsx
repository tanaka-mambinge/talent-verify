import { BASE_API_URL } from "@/constants/urls";
import useSWR from "swr";

// {
//     "created_at": null,
//     "id": "630d38c1-5244-4710-82b2-8a4058828c19",
//     "name": "Research",
//     "company_id": "3fb9cf7c-1212-4efc-ab5d-50d019f31f0d",
//     "updated_at": null
//   },

interface ResponseDTO {
  id: string;
  name: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface Department {
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

      const transformedData: Department[] = data.map((dept) => ({
        id: dept.id,
        name: dept.name,
        companyId: dept.company_id,
        createdAt: new Date(dept.created_at),
        updatedAt: new Date(dept.updated_at),
      }));

      return transformedData;
    } else {
      const error = await res.json();
      throw new Error(error.detail);
    }
  });

export function useGetCompanyDepartments(companyId: string) {
  const url = companyId
    ? `${BASE_API_URL}/company/${companyId}/departments`
    : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data: data,
    isLoading,
    error,
  };
}
