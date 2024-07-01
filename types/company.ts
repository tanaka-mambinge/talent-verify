export interface ICompany {
  id?: string;
  name: string;
  registrationNumber: string;
  address: string;
  contactPhone: string;
  registrationDate: Date;
  contactPerson: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
