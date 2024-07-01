"use client";
import { useToast } from "@/components/AppToast";
import { BASE_API_URL } from "@/constants/urls";
import { useGetEmployeeDetails } from "@/hooks/useGetEmployeeDetails";
import { employeeSchema } from "@/schemas/employeeSchema";
import { IEmployee } from "@/types/employee";
import { updateEmployee } from "@/utils/updateEmployee";
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
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import EmployeeRolesTable from "./EmployeeRolesTable";

type Props = {
  employeeId: string;
};

const TextFieldMinWidth = "300px";

interface IForm {
  name: string;
}

function EmployeeDetailsCard({ employeeId }: Props) {
  const { showToast } = useToast();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { data, error, isLoading } = useGetEmployeeDetails(employeeId);

  const form = useForm<IForm>({
    defaultValues: {
      name: undefined,
    },
    resolver: yupResolver<IForm>(employeeSchema),
  });

  const handleSubmit: SubmitHandler<IForm> = async (data) => {
    const formData: IEmployee = {
      id: employeeId,
      name: data.name,
    };

    const res = await updateEmployee(formData).catch((err) => {
      console.log(err);
    });

    if (res?.data) {
      const mutationUrl = `${BASE_API_URL}/employee/${employeeId}`;
      showToast("Employee details updated", <CheckCircle />);
      mutate(mutationUrl);
    } else {
      console.log(res?.errors);
    }
  };

  const handleDelete = async (employeeId: string) => {
    const res = await fetch(`${BASE_API_URL}/employee/${employeeId}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        if (res.status == 204) {
          showToast("Employee deleted", <CheckCircle />);
          router.push("/");
        } else {
          const err = await res.json();
          throw new Error(err?.detail || "Error deleting employee");
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
      });
    }
  }, [data]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error loading employee details</Text>;
  }

  return (
    <>
      {data ? (
        <>
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
                              placeholder="John Doe"
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
                </DataList.Root>
              </Box>

              <Flex justify={"end"} gap={"2"} p={"2"}>
                <Button type="submit">Save changes</Button>
                <Button
                  color="red"
                  type="button"
                  onClick={() => handleDelete(employeeId)}
                >
                  Delete
                </Button>
              </Flex>
            </form>
          </Card>

          <EmployeeRolesTable roles={data.roles} />
        </>
      ) : (
        <Text>Details not found</Text>
      )}
    </>
  );
}

export default EmployeeDetailsCard;
