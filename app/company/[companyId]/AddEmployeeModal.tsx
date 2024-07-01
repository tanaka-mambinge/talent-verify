import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

import { BASE_API_URL } from "@/constants/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/components/AppToast";
import { employeeAddSchema } from "@/schemas/employeeSchema";
import { IEmployeeAdd } from "@/types/employee";
import { addEmployee } from "@/utils/addEmployee";
import { CheckCircle } from "@phosphor-icons/react";
import { useSWRConfig } from "swr";

interface IForm {
  name: string;
  employeeCompanyId?: string | undefined;
  roleName: string;
  departmentName: string;
  duties: string;
  startDate: string;
}

type Props = {
  companyId: string;
  open?: boolean;
  setOpen: (open: boolean) => void;
};

function AddEmployeeModal({ open, setOpen, companyId }: Props) {
  const { mutate } = useSWRConfig();
  const { showToast } = useToast();

  const form = useForm<IForm>({
    defaultValues: {
      name: undefined,
      employeeCompanyId: undefined,
      roleName: undefined,
      departmentName: undefined,
      duties: undefined,
      startDate: undefined,
    },
    resolver: yupResolver<IForm>(employeeAddSchema),
  });

  const handleSubmit: SubmitHandler<IForm> = async (data) => {
    const formData: IEmployeeAdd = {
      name: data.name,
      employeeCompanyId: data.employeeCompanyId || null,
      roleName: data.roleName,
      companyId: companyId,
      departmentName: data.departmentName,
      duties: data.duties,
      startDate: new Date(data.startDate),
      endDate: null,
    };

    const res = await addEmployee(formData);
    if (res?.data) {
      const mutationUrl = `${BASE_API_URL}/company/${companyId}/employees`;
      mutate(mutationUrl);
      setOpen(false);
      showToast("Employee added successfully", <CheckCircle />);
      form.reset();
    } else {
      console.log(res?.errors);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add employee</Dialog.Title>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Flex gap="2" direction="column">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Employee name</Text>
                  <TextField.Root
                    placeholder="John Doe"
                    {...field}
                    color={form.formState.errors.name ? "red" : undefined}
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.name?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="employeeCompanyId"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Employee ID at company</Text>
                  <TextField.Root
                    placeholder="123"
                    {...field}
                    color={
                      form.formState.errors.employeeCompanyId
                        ? "red"
                        : undefined
                    }
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.employeeCompanyId?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="roleName"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Role name</Text>
                  <TextField.Root
                    placeholder="CEO"
                    {...field}
                    color={form.formState.errors.roleName ? "red" : undefined}
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.roleName?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="departmentName"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Department name</Text>
                  <TextField.Root
                    placeholder="Board of Directors"
                    {...field}
                    color={
                      form.formState.errors.departmentName ? "red" : undefined
                    }
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.departmentName?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="duties"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Duties</Text>
                  <TextField.Root
                    placeholder="Lead the team"
                    {...field}
                    color={form.formState.errors.duties ? "red" : undefined}
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.duties?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Start date</Text>
                  <TextField.Root
                    type="date"
                    placeholder="John Doe"
                    {...field}
                    color={form.formState.errors.startDate ? "red" : undefined}
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.startDate?.message}
                  </Text>
                </>
              )}
            />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Add</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AddEmployeeModal;
