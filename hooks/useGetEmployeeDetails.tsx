import { BASE_API_URL } from "@/constants/urls";
import { IEmployee } from "@/types/employee";
import useSWR from "swr";

interface ResponseDTO {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  roles: {
    id: string;
    department_id: string;
    duties: string;
    start_date: string;
    end_date?: string;
    created_at: string;
    updated_at: string;
    employee_id: string;
    company_id: string;
    name: string;
    employee_company_id: string;
    company: {
      id: string;
      registration_date: string;
      contact_person: string;
      email: string;
      updated_at: string;
      registration_number: string;
      name: string;
      address: string;
      contact_phone: string;
      created_at: string;
    };
    department: {
      created_at: string;
      id: string;
      name: string;
      updated_at: string;
      company_id: string;
    };
  }[];
}

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then(async (res) => {
    if (res.status === 200) {
      const data: ResponseDTO = await res.json();

      const transformedData: IEmployee = {
        id: data.id,
        name: data.name,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),

        roles: data.roles.map((role) => ({
          id: role.id,
          name: role.name,
          startDate: new Date(role.start_date),
          endDate: role.end_date ? new Date(role.end_date) : null,
          duties: role.duties,
          departmentId: role.department_id,
          companyId: role.company_id,
          employeeId: role.employee_id,
          employeeCompanyId: role.employee_company_id,
          createdAt: new Date(role.created_at),
          updatedAt: new Date(role.updated_at),
          company: {
            id: role.company.id,
            registrationDate: new Date(role.company.registration_date),
            contactPerson: role.company.contact_person,
            email: role.company.email,
            updatedAt: new Date(role.company.updated_at),
            registrationNumber: role.company.registration_number,
            name: role.company.name,
            address: role.company.address,
            contactPhone: role.company.contact_phone,
            createdAt: new Date(role.company.created_at),
          },
          department: {
            created_at: new Date(role.department.created_at),
            id: role.department.id,
            name: role.department.name,
            updated_at: new Date(role.department.updated_at),
            companyId: role.department.company_id,
          },
        })),
      };

      return transformedData;
    } else {
      const error = await res.json();
      throw new Error(error.detail);
    }
  });

export function useGetEmployeeDetails(employeeId: string) {
  const url = employeeId ? `${BASE_API_URL}/employee/${employeeId}` : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data: data,
    isLoading,
    error,
  };
}
