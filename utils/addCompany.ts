import { BASE_API_URL } from "@/constants/urls";
import { ICompany } from "@/types/company";
import { formatDate } from "./formatDate";

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

export const addCompany = (data: ICompany) => {
  const url = `${BASE_API_URL}/company`;
  const transformedData = {
    name: data.name,
    registration_date: formatDate(data.registrationDate.toISOString()),
    registration_number: data.registrationNumber,
    address: data.address,
    contact_phone: data.contactPhone,
    contact_person: data.contactPerson,
    email: data.email,
  };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(async (res) => {
    if (res.status === 201) {
      const newCompany: ResponseDTO = await res.json();
      const transformedData: ICompany = {
        id: newCompany.id,
        name: newCompany.name,
        registrationNumber: newCompany.registration_number,
        registrationDate: new Date(newCompany.registration_date),
        address: newCompany.address,
        contactPhone: newCompany.contact_phone,
        contactPerson: newCompany.contact_person,
        email: newCompany.email,
        createdAt: new Date(newCompany.created_at),
        updatedAt: new Date(newCompany.updated_at),
      };

      return { data: transformedData, errors: null };
    } else if (res.status === 400) {
      const errors = await res.json();
      return { data: null, errors };
    }
  });
};
