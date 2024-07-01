import { formatDate } from "@/utils/formatDate";
import * as yup from "yup";

export const companySchema = yup
  .object({
    name: yup
      .string()
      .required("Company name is required")
      .min(1, "Company name is required"),
    registrationDate: yup
      .string()
      .required("Registration date is required")
      .matches(
        /\d{4}-\d{2}-\d{2}/,
        "Registration date must be in the format yyyy-mm-dd"
      )
      .test(
        "is-date-in-the-past",
        "Registration date must be in the past",
        (value) => {
          if (!value) {
            return false;
          }
          const date = new Date(value);
          return date < new Date();
        }
      ),
    registrationNumber: yup
      .string()
      .required("Registration number is required"),
    address: yup.string().required("Address is required"),
    contactPerson: yup.string().required("Contact person is required"),
    contactNumber: yup.string().required("Contact number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();
