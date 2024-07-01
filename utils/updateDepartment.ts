import { BASE_API_URL } from "@/constants/urls";
import { ICompany } from "@/types/company";
import { formatDate } from "./formatDate";
import { IDepartment } from "@/types/department";

interface ResponseDTO {
  id: string;
  name: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export const updateDepartment = (data: IDepartment) => {
  const url = `${BASE_API_URL}/department/${data.id}`;
  const transformedData = {
    name: data.name,
    company_id: data.companyId,
  };

  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(async (res) => {
    if (res.status === 200) {
      const newCompany: ResponseDTO = await res.json();
      const transformedData: IDepartment = {
        id: newCompany.id,
        name: newCompany.name,
        companyId: newCompany.company_id,
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
