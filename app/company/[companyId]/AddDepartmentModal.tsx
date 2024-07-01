import { WarningCircle } from "@phosphor-icons/react";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";

import { BASE_API_URL } from "@/constants/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircle } from "@phosphor-icons/react";
import { Badge } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useSWRConfig } from "swr";
import * as yup from "yup";
import { ICompany } from "@/types/company";
import { addCompany } from "@/utils/addCompany";
import { formatDate } from "@/utils/formatDate";
import { isDate } from "util/types";
import { addDepartment } from "@/utils/addDepartment";
import { IDepartment } from "@/types/department";
import { departmentSchema } from "@/schemas/departmentSchema";

interface IForm {
  name: string;
}

type Props = {
  companyId: string;
  open?: boolean;
  setOpen: (open: boolean) => void;
};

function AddDepartmentModal({ open, setOpen, companyId }: Props) {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState<boolean>(false);

  const form = useForm<IForm>({
    defaultValues: {
      name: undefined,
    },
    resolver: yupResolver<IForm>(departmentSchema),
  });

  const handleSubmit: SubmitHandler<IForm> = async (data) => {
    const formData: IDepartment = {
      name: data.name,
      companyId: companyId,
    };

    const res = await addDepartment(formData).catch((err) => {
      setError(true);
    });

    if (res?.data) {
      const mutationUrl = `${BASE_API_URL}/company/${companyId}/departments`;

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
        <Dialog.Title>Add departmet</Dialog.Title>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Flex gap="2" direction="column">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Name</Text>
                  <TextField.Root
                    placeholder="Accounting & finance"
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

          {error && (
            <Callout.Root color="red" role="alert" my="2">
              <Callout.Icon>
                <WarningCircle />
              </Callout.Icon>
              <Callout.Text>Failed to add department</Callout.Text>
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

export default AddDepartmentModal;
