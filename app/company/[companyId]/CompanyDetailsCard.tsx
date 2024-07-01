"use client";
import { useToast } from "@/components/AppToast";
import { BASE_API_URL } from "@/constants/urls";
import { useGetCompanyDetails } from "@/hooks/useGetCompanyDetails";
import { companySchema } from "@/schemas/companySchema";
import { ICompany } from "@/types/company";
import { formatDate } from "@/utils/formatDate";
import { updateCompany } from "@/utils/updateCompany";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircle, WarningOctagon } from "@phosphor-icons/react";
import {
  Box,
  Button,
  Card,
  DataList,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

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
  companyId: string;
};

const TextFieldMinWidth = "300px";

function CompanyDetailsCard({ companyId }: Props) {
  const { showToast } = useToast();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { data, error, isLoading } = useGetCompanyDetails(companyId);
  const [errMsg, setErrMsg] = useState<string>("");
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
      id: companyId,
      name: data.name,
      registrationDate: new Date(data.registrationDate),
      registrationNumber: data.registrationNumber,
      address: data.address,
      contactPerson: data.contactPerson,
      contactPhone: data.contactNumber,
      email: data.email,
    };

    const res = await updateCompany(formData).catch((err) => {
      setErrMsg("Error updating company details");
    });

    if (res?.data) {
      const mutationUrl = `${BASE_API_URL}/company/${companyId}`;
      showToast("Company details updated", <CheckCircle />);
      setErrMsg("");
      mutate(mutationUrl);
    } else {
      console.log(res?.errors);
    }
  };

  const handleDelete = async (companyId: string) => {
    const res = await fetch(`${BASE_API_URL}/company/${companyId}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        if (res.status == 204) {
          const mutationUrl = `${BASE_API_URL}/company`;
          mutate(mutationUrl);
          showToast("Company deleted", <CheckCircle />);
          router.push("/");
        } else {
          const err = await res.json();
          throw new Error(err?.detail || "Error deleting company");
        }
      })
      .catch((err) => {
        showToast(err.message, <WarningOctagon color="red" />);
      });
  };

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        registrationDate: formatDate(data.registrationDate.toISOString()),
        registrationNumber: data.registrationNumber,
        address: data.address,
        contactPerson: data.contactPerson,
        contactNumber: data.contactPhone,
        email: data.email,
      });
    }
  }, [data]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error loading company details</Text>;
  }

  return (
    <>
      {data ? (
        <Card>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box p={"2"}>
              <DataList.Root>
                <DataList.Item>
                  <DataList.Label>Name</DataList.Label>
                  <DataList.Value>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <Flex direction={"column"} gap={"2"}>
                          <TextField.Root
                            placeholder="Talent Verify"
                            {...field}
                            color={
                              form.formState.errors.name ? "red" : undefined
                            }
                            style={{ minWidth: TextFieldMinWidth }}
                          />
                          <Text size="1" color="red">
                            {form.formState.errors.name?.message}
                          </Text>
                        </Flex>
                      )}
                    />
                  </DataList.Value>
                </DataList.Item>

                <DataList.Item>
                  <DataList.Label>Address</DataList.Label>
                  <DataList.Value>
                    <Controller
                      name="address"
                      control={form.control}
                      render={({ field }) => (
                        <Flex direction={"column"} gap={"2"}>
                          <TextField.Root
                            placeholder="123 Main St, Harare, Zimbabwe"
                            {...field}
                            color={
                              form.formState.errors.address ? "red" : undefined
                            }
                            style={{ minWidth: TextFieldMinWidth }}
                          />
                          <Text size="1" color="red">
                            {form.formState.errors.address?.message}
                          </Text>
                        </Flex>
                      )}
                    />
                  </DataList.Value>
                </DataList.Item>

                <DataList.Item>
                  <DataList.Label>Phone</DataList.Label>
                  <DataList.Value>
                    <Controller
                      name="contactNumber"
                      control={form.control}
                      render={({ field }) => (
                        <Flex direction={"column"} gap={"2"}>
                          <TextField.Root
                            placeholder="+263 777 777 777"
                            {...field}
                            color={
                              form.formState.errors.contactNumber
                                ? "red"
                                : undefined
                            }
                            style={{ minWidth: TextFieldMinWidth }}
                          />
                          <Text size="1" color="red">
                            {form.formState.errors.contactNumber?.message}
                          </Text>
                        </Flex>
                      )}
                    />
                  </DataList.Value>
                </DataList.Item>

                <DataList.Item>
                  <DataList.Label>Email</DataList.Label>
                  <DataList.Value>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <Flex direction={"column"} gap={"2"}>
                          <TextField.Root
                            type="email"
                            placeholder="support@talentverify.com"
                            {...field}
                            color={
                              form.formState.errors.email ? "red" : undefined
                            }
                            style={{ minWidth: TextFieldMinWidth }}
                          />
                          <Text size="1" color="red">
                            {form.formState.errors.email?.message}
                          </Text>
                        </Flex>
                      )}
                    />
                  </DataList.Value>
                </DataList.Item>

                <DataList.Item>
                  <DataList.Label>Contact Person</DataList.Label>
                  <DataList.Value>
                    <Controller
                      name="contactPerson"
                      control={form.control}
                      render={({ field }) => (
                        <Flex direction={"column"} gap={"2"}>
                          <TextField.Root
                            type="tel"
                            placeholder="John Doe"
                            {...field}
                            color={
                              form.formState.errors.contactPerson
                                ? "red"
                                : undefined
                            }
                            style={{ minWidth: TextFieldMinWidth }}
                          />
                          <Text size="1" color="red">
                            {form.formState.errors.contactPerson?.message}
                          </Text>
                        </Flex>
                      )}
                    />
                  </DataList.Value>
                </DataList.Item>

                <DataList.Item>
                  <DataList.Label>Registration Number</DataList.Label>
                  <DataList.Value>
                    <Controller
                      name="registrationNumber"
                      control={form.control}
                      render={({ field }) => (
                        <Flex direction={"column"} gap={"2"}>
                          <TextField.Root
                            placeholder="123456"
                            {...field}
                            color={
                              form.formState.errors.registrationNumber
                                ? "red"
                                : undefined
                            }
                            style={{ minWidth: TextFieldMinWidth }}
                          />
                          <Text size="1" color="red">
                            {form.formState.errors.registrationNumber?.message}
                          </Text>
                        </Flex>
                      )}
                    />
                  </DataList.Value>
                </DataList.Item>

                <DataList.Item>
                  <DataList.Label>Registration Date</DataList.Label>
                  <DataList.Value>
                    <Controller
                      name="registrationDate"
                      control={form.control}
                      render={({ field }) => (
                        <Flex direction={"column"} gap={"2"}>
                          <TextField.Root
                            type="date"
                            placeholder="Talent Verify"
                            {...field}
                            color={
                              form.formState.errors.registrationDate
                                ? "red"
                                : undefined
                            }
                            style={{ minWidth: TextFieldMinWidth }}
                          />
                          <Text size="1" color="red">
                            {form.formState.errors.registrationDate?.message}
                          </Text>
                        </Flex>
                      )}
                    />
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </Box>

            <Flex justify={"end"} gap={"2"} p={"2"}>
              <Button type="submit">Save changes</Button>
              <Button
                color="red"
                type="button"
                onClick={() => handleDelete(companyId)}
              >
                Delete
              </Button>
            </Flex>
          </form>
        </Card>
      ) : (
        <Text>Details not found</Text>
      )}
    </>
  );
}

export default CompanyDetailsCard;
