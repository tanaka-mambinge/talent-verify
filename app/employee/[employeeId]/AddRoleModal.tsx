import { WarningCircle } from "@phosphor-icons/react";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";

import { BASE_API_URL } from "@/constants/urls";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useSWRConfig } from "swr";

import { roleSchema } from "@/schemas/roleSchema";
import { addRole, IRoleAdd } from "@/utils/addRole";

interface IForm {
  name: string;
  companyName: string;
  employeeCompanyId?: string | undefined;
  departmentName: string;
  duties: string;
  startDate: string;
}

type Props = {
  employeeId: string;
  open?: boolean;
  setOpen: (open: boolean) => void;
};

function AddRoleModal({ open, setOpen, employeeId }: Props) {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState<boolean>(false);

  const form = useForm<IForm>({
    defaultValues: {
      name: undefined,
      companyName: undefined,
      departmentName: undefined,
      employeeCompanyId: undefined,
      duties: undefined,
      startDate: undefined,
    },
    resolver: yupResolver<IForm>(roleSchema),
  });

  const handleSubmit: SubmitHandler<IForm> = async (data) => {
    const formData: IRoleAdd = {
      employeeId: employeeId,
      name: data.name,
      companyName: data.companyName,
      employeeCompanyId: data.employeeCompanyId || null,
      departmentName: data.departmentName,
      duties: data.duties,
      startDate: new Date(data.startDate),
      endDate: null,
    };

    const res = await addRole(formData).catch((err) => {
      setError(true);
    });

    if (res?.data) {
      const mutationUrl = `${BASE_API_URL}/employee/${employeeId}`;

      form.reset();
      setOpen(false);
      setError(false);
      mutate(mutationUrl);
    } else {
      console.log(res?.errors);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add employee role</Dialog.Title>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Flex gap="2" direction="column">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Name</Text>
                  <TextField.Root
                    placeholder="Senior developer"
                    {...field}
                    color={form.formState.errors.name ? "red" : undefined}
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.name?.message}
                  </Text>
                </>
              )}
            />
          </Flex>

          <Flex gap="2" direction="column">
            <Controller
              name="companyName"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Company name</Text>
                  <TextField.Root
                    placeholder="Talent verify"
                    {...field}
                    color={
                      form.formState.errors.companyName ? "red" : undefined
                    }
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.companyName?.message}
                  </Text>
                </>
              )}
            />
          </Flex>

          <Flex gap="2" direction="column">
            <Controller
              name="employeeCompanyId"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Employee company ID</Text>
                  <TextField.Root
                    placeholder="TV0001"
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
          </Flex>

          <Flex gap="2" direction="column">
            <Controller
              name="departmentName"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Department name</Text>
                  <TextField.Root
                    placeholder="Accounting & finance"
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
          </Flex>

          <Flex gap="2" direction="column">
            <Controller
              name="duties"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Duties</Text>
                  <TextField.Root
                    placeholder="Leading the dev team"
                    {...field}
                    color={form.formState.errors.duties ? "red" : undefined}
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.duties?.message}
                  </Text>
                </>
              )}
            />
          </Flex>

          <Controller
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <>
                <Text size={"2"}>Start date</Text>
                <TextField.Root
                  type="date"
                  {...field}
                  color={form.formState.errors.startDate ? "red" : undefined}
                />
                <Text size="1" color="red">
                  {form.formState.errors.startDate?.message}
                </Text>
              </>
            )}
          />

          {error && (
            <Callout.Root color="red" role="alert" my="2">
              <Callout.Icon>
                <WarningCircle />
              </Callout.Icon>
              <Callout.Text>Failed to add role</Callout.Text>
            </Callout.Root>
          )}

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

export default AddRoleModal;
