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
import { companySchema } from "@/schemas/companySchema";

interface IForm {
  name: string;
  registrationDate: string;
  registrationNumber: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
}

type Props = {
  open?: boolean;
  setOpen: (open: boolean) => void;
};

function AddCompanyModal({ open, setOpen }: Props) {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState<boolean>(false);

  const form = useForm<IForm>({
    defaultValues: {
      name: undefined,
      registrationDate: undefined,
      registrationNumber: undefined,
      address: undefined,
      contactPerson: undefined,
      contactNumber: undefined,
      email: undefined,
    },
    resolver: yupResolver<IForm>(companySchema),
  });

  const handleSubmit: SubmitHandler<IForm> = async (data) => {
    const formData: ICompany = {
      name: data.name,
      registrationDate: new Date(data.registrationDate),
      registrationNumber: data.registrationNumber,
      address: data.address,
      contactPerson: data.contactPerson,
      contactPhone: data.contactNumber,
      email: data.email,
    };

    const res = await addCompany(formData).catch((err) => {
      setError(true);
    });

    if (res?.data) {
      const mutationUrl = `${BASE_API_URL}/company`;

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
        <Dialog.Title>Add company</Dialog.Title>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Flex gap="2" direction="column">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Name</Text>
                  <TextField.Root
                    placeholder="Talent Verify"
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
              name="address"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Address</Text>
                  <TextField.Root
                    placeholder="123 Main St, Harare, Zimbabwe"
                    {...field}
                    color={form.formState.errors.address ? "red" : undefined}
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.address?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="registrationDate"
              control={form.control}
              render={({ field }) => {
                console.log(field);
                return (
                  <>
                    <Text size={"2"}>Registration date</Text>
                    <TextField.Root
                      type="date"
                      {...field}
                      color={
                        form.formState.errors.registrationDate
                          ? "red"
                          : undefined
                      }
                    />
                    <Text size="1" color="red">
                      {form.formState.errors.registrationDate?.message}
                    </Text>
                  </>
                );
              }}
            />

            <Controller
              name="registrationNumber"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Registration Number</Text>
                  <TextField.Root
                    placeholder="C123456"
                    {...field}
                    color={
                      form.formState.errors.registrationNumber
                        ? "red"
                        : undefined
                    }
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.registrationNumber?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="contactPerson"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Contact Person</Text>
                  <TextField.Root
                    placeholder="John Doe"
                    {...field}
                    color={
                      form.formState.errors.contactPerson ? "red" : undefined
                    }
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.contactPerson?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="contactNumber"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Contact phone</Text>
                  <TextField.Root
                    placeholder="+263 777 777 777"
                    {...field}
                    color={
                      form.formState.errors.contactNumber ? "red" : undefined
                    }
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.contactNumber?.message}
                  </Text>
                </>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Email</Text>
                  <TextField.Root
                    type="email"
                    placeholder="support@talentverify.com"
                    {...field}
                    color={form.formState.errors.email ? "red" : undefined}
                  />
                  <Text size="1" color="red">
                    {form.formState.errors.email?.message}
                  </Text>
                </>
              )}
            />

            {/* <Controller
              name="available"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text size="2">Available</Text>
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="yes">Yes</Select.Item>
                      <Select.Item value="no">No</Select.Item>
                    </Select.Content>
                  </Select.Root>

                  <Text size="1" color="red">
                    {form.formState.errors.available?.message}
                  </Text>
                </>
              )}
            /> */}
          </Flex>

          {error && (
            <Callout.Root color="red" role="alert" my="2">
              <Callout.Icon>
                <WarningCircle />
              </Callout.Icon>
              <Callout.Text>Failed to add company</Callout.Text>
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

export default AddCompanyModal;
