import { IRole } from "./role";

export interface IEmployee {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: IRole[];
}

export interface IEmployeeAdd {
  name: string;
  employeeCompanyId: string | null;
  companyId: string;
  departmentName: string;
  roleName: string;
  duties: string;
  startDate: Date;
  endDate: Date | null;
}

export interface IEmployeeSearch {
  employeeName: string;
  roleName: string;
  departmentName: string;
  startYear: string;
  endYear: string;
}
