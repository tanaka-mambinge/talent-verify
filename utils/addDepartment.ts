import { BASE_API_URL } from "@/constants/urls";
import { ICompany } from "@/types/company";
import { IDepartment } from "@/types/department";

interface ResponseDTO {
  id: string;
  company_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export const addDepartment = (data: IDepartment) => {
  const url = `${BASE_API_URL}/department`;
  const transformedData = {
    company_id: data.companyId,
    name: data.name,
  };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(async (res) => {
    if (res.status === 201) {
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
