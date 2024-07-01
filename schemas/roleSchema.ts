import * as yup from "yup";

export const roleSchema = yup
  .object({
    name: yup
      .string()
      .required("Role name is required")
      .min(1, "Role name is required"),
    companyName: yup
      .string()
      .required("Company name is required")
      .min(1, "Company name is required"),
    employeeCompanyId: yup.string(),
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
    endDate: yup
      .string()
      .matches(/\d{4}-\d{2}-\d{2}/, "End date must be in the format yyyy-mm-dd")
      .test("is-date-in-the-past", "End date must be in the past", (value) => {
        if (!value) {
          return true;
        }
        const date = new Date(value);
        return date < new Date();
      }),
  })
  .required();
