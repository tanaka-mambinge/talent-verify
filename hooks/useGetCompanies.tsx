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
  registration_date: Date;
  contact_person: string;
  email: string;
}

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then(async (res) => {
    if (res.status === 200) {
      const data: ResponseDTO[] = await res.json();

      const transformedData: ICompany[] = data.map((company) => ({
        id: company.id,
        name: company.name,
        registrationNumber: company.registration_number,
        address: company.address,
        contactPhone: company.contact_phone,
        registrationDate: new Date(company.registration_date),
        contactPerson: company.contact_person,
        email: company.email,
        createdAt: new Date(company.created_at),
        updatedAt: new Date(company.updated_at),
      }));

      return transformedData;
    } else {
      const error = await res.json();
      throw new Error(error.detail);
    }
  });

export function useGetCompanies() {
  const { data, error, isLoading } = useSWR(`${BASE_API_URL}/company`, fetcher);

  return {
    data: data,
    isLoading,
    error,
  };
}
