import { BASE_API_URL } from "@/constants/urls";
import { ICompany } from "@/types/company";
import useSWR from "swr";

interface ResponseDTO {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  registration_number: string;
  address: string;
  contact_phone: string;
  registration_date: string;
  contact_person: string;
  email: string;
}

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then(async (res) => {
    if (res.status === 200) {
      const data: ResponseDTO = await res.json();

      const transformedData: ICompany = {
        id: data.id,
        name: data.name,
        registrationNumber: data.registration_number,
        address: data.address,
        contactPhone: data.contact_phone,
        registrationDate: new Date(data.registration_date),
        contactPerson: data.contact_person,
        email: data.email,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      return transformedData;
    } else {
      const error = await res.json();
      throw new Error(error.detail);
    }
  });

export function useGetCompanyDetails(companyId: string) {
  const url = companyId ? `${BASE_API_URL}/company/${companyId}` : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data: data,
    isLoading,
    error,
  };
}
