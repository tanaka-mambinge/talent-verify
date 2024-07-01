import { formatDate } from "@/utils/formatDate";
import * as yup from "yup";

export const departmentSchema = yup
  .object({
    name: yup
      .string()
      .required("Department name is required")
      .min(1, "Department name is required"),
  })
  .required();
