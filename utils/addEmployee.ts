import { BASE_API_URL } from "@/constants/urls";
import { IEmployee, IEmployeeAdd } from "@/types/employee";
import { formatDate } from "./formatDate";

interface ResponseDTO {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export const addEmployee = (data: IEmployeeAdd) => {
  const url = `${BASE_API_URL}/employee`;
  const transformedData = {
    employee_name: data.name,
    employee_company_id: data.employeeCompanyId,
    company_id: data.companyId,
    department_name: data.departmentName,
    role_name: data.roleName,
    duties: data.duties,
    start_date: formatDate(data.startDate.toISOString()),
  };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(async (res) => {
    if (res.status === 201) {
      const newEmployee: ResponseDTO = await res.json();
      const transformedData: IEmployee = {
        id: newEmployee.id,
        name: newEmployee.name,
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
