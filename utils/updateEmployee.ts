import { BASE_API_URL } from "@/constants/urls";
import { ICompany } from "@/types/company";
import { formatDate } from "./formatDate";
import { IDepartment } from "@/types/department";
import { IEmployee } from "@/types/employee";

interface ResponseDTO {
  id: string;
  name: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export const updateEmployee = (data: IEmployee) => {
  const url = `${BASE_API_URL}/employee/${data.id}`;
  const transformedData = {
    employee_name: data.name,
  };

  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(async (res) => {
    if (res.status === 200) {
      const newEmployee: ResponseDTO = await res.json();
      const transformedData: IDepartment = {
        id: newEmployee.id,
        name: newEmployee.name,
        companyId: newEmployee.company_id,
        createdAt: new Date(newEmployee.created_at),
        updatedAt: new Date(newEmployee.updated_at),
      };

      return { data: transformedData, errors: null };
    } else if (res.status === 400) {
      const errors = await res.json();
      return { data: null, errors };
    }
  });
};
