import { BASE_API_URL } from "@/constants/urls";
import { IRole } from "@/types/role";
import { formatDate } from "./formatDate";

interface ResponseDTO {
  id: string;
  name: string;
  company_id: string;
  employee_id: string;
  department_id: string;
  employee_company_id: string;
  start_date: string;
  end_date: string;
  duties: string;
  created_at: string;
  updated_at: string;
}

export const updateRole = (data: IRole) => {
  const url = `${BASE_API_URL}/role/${data.id}`;
  const transformedData = {
    name: data.name,
    employee_company_id: data.employeeCompanyId,
    company_name: data.companyName,
    department_name: data.departmentName,
    start_date: formatDate(data.startDate.toISOString()),
    end_date: data.endDate ? formatDate(data.endDate.toISOString()) : null,
    duties: data.duties,
  };

  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(async (res) => {
    if (res.status === 200) {
      const newEmployee: ResponseDTO = await res.json();
      const transformedData: IRole = {
        id: newEmployee.id,
        name: newEmployee.name,
        companyId: newEmployee.company_id,
        employeeId: newEmployee.employee_id,
        departmentId: newEmployee.department_id,
        employeeCompanyId: newEmployee.employee_company_id,
        duties: newEmployee.duties,
        startDate: new Date(newEmployee.start_date),
        endDate: newEmployee.end_date ? new Date(newEmployee.end_date) : null,
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
