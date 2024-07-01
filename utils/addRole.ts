import { BASE_API_URL } from "@/constants/urls";
import { IRole } from "@/types/role";

interface ResponseDTO {
  id: string;
  company_id: string;
  department_id: string;
  employee_id: string;
  name: string;
  duties: string;
  start_date: string;
  employee_company_id: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface IRoleAdd {
  id?: string;
  employeeId: string;
  employeeCompanyId: string | null;
  name: string;
  companyName: string;
  departmentName: string;
  duties: string;
  startDate: Date;
  endDate: string | null;
}

interface IRoleResponse {
  id: string;
  companyId: string;
  departmentId: string;
  employeeId: string;
  employeeCompanyId: string | null;
  name: string;
  duties: string;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const addRole = (data: IRoleAdd) => {
  const url = `${BASE_API_URL}/role`;
  const transformedData = {
    employee_id: data.employeeId,
    name: data.name,
    company_name: data.companyName,
    employee_company_id: data.employeeCompanyId,
    department_name: data.departmentName,
    duties: data.duties,
    start_date: data.startDate,
    end_date: data.endDate,
  };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedData),
  }).then(async (res) => {
    if (res.status === 201) {
      const newRole: ResponseDTO = await res.json();
      const transformedData: IRoleResponse = {
        id: newRole.id,
        name: newRole.name,
        companyId: newRole.company_id,
        departmentId: newRole.department_id,
        duties: newRole.duties,
        employeeId: newRole.employee_id,
        endDate: newRole.end_date ? new Date(newRole.end_date) : null,
        startDate: new Date(newRole.start_date),
        employeeCompanyId: newRole.employee_company_id,
        createdAt: new Date(newRole.created_at),
        updatedAt: new Date(newRole.updated_at),
      };

      return { data: transformedData, errors: null };
    } else if (res.status === 400) {
      const errors = await res.json();
      return { data: null, errors };
    }
  });
};
