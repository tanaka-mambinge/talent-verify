import * as yup from "yup";
export const employeeSchema = yup
  .object({
    name: yup
      .string()
      .required("Employee name is required")
      .min(1, "Employee name is required"),
  })
  .required();

export const employeeAddSchema = yup
  .object({
    name: yup
      .string()
      .required("Employee name is required")
      .min(1, "Employee name is required"),
    employeeCompanyId: yup.string(),
    roleName: yup
      .string()
      .required("Role name is required")
      .min(1, "Role name is required"),
    departmentName: yup
      .string()
      .required("Department name is required")
      .min(1, "Department name is required"),
    duties: yup
      .string()
      .required("Duties are required")
      .min(1, "Duties are required"),
    startDate: yup
      .string()
      .required("Start date is required")
      .matches(
        /\d{4}-\d{2}-\d{2}/,
        "Start date must be in the format yyyy-mm-dd"
      )
      .test(
        "is-date-in-the-past",
        "Start date must be in the past",
        (value) => {
          if (!value) {
            return false;
          }
          const date = new Date(value);
          return date < new Date();
        }
      ),
  })
  .required();

export const employeeSearchSchema = yup
  .object({
    employeeName: yup.string(),
    roleName: yup.string(),
    departmentName: yup.string(),
    startYear: yup.string(),
    endYear: yup.string(),
  })
  .required();
