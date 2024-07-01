import { ICompany } from "./company";
import { IDepartment } from "./department";

export interface IRole {
  id?: string;
  name: string;
  duties: string;
  startDate: Date;
  endDate: Date | null;
  createdAt?: Date;
  updatedAt?: Date;

  employeeCompanyId?: string;
  employeeId?: string;

  companyId?: string;
  company?: ICompany;
  companyName?: string;

  departmentName?: string;
  departmentId?: string;
  department?: IDepartment;
}
