"use client";
import { useSearchEmployees } from "@/hooks/useSearchEmployees";
import { employeeSearchSchema } from "@/schemas/employeeSchema";
import { IEmployeeSearch } from "@/types/employee";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ResultsTable from "./ResultsTable";

type Props = {};

interface IForm {
  employeeName?: string | undefined;
  roleName?: string | undefined;
  departmentName?: string | undefined;
  startYear?: string | undefined;
  endYear?: string | undefined;
}

function Page({}: Props) {
  const [qParams, setQParams] = React.useState<string>("");
  const { data, error, isLoading } = useSearchEmployees(qParams);

  const form = useForm<IForm>({
    defaultValues: {
      employeeName: undefined,
      roleName: undefined,
      departmentName: undefined,
      startYear: undefined,
      endYear: undefined,
    },
    resolver: yupResolver<IForm>(employeeSearchSchema),
  });

  const handleSubmit: SubmitHandler<IForm> = async (data) => {
    const formData: IEmployeeSearch = {
      employeeName: data.employeeName || "",
      roleName: data.roleName || "",
      departmentName: data.departmentName || "",
      startYear: data.startYear || "",
      endYear: data.endYear || "",
    };

    const params = new URLSearchParams();
    params.append("employee_name", formData.employeeName);
    params.append("role_name", formData.roleName);
    params.append("department_name", formData.departmentName);
    params.append("start_year", formData.startYear);
    params.append("end_year", formData.endYear);

    setQParams(params.toString());
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <Flex gap="2" direction={"column"}>
      <Card>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Heading>Search employees</Heading>

          <Flex gap={"2"} direction={"column"} mt="4">
            <Grid columns="4" gap="4">
              <Box gridColumn={{ initial: "span 2" }}>
                <Flex gap="2" direction="column">
                  <Controller
                    name="employeeName"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <Text size="2">Employee name</Text>
                        <TextField.Root
                          placeholder="John Doe"
                          {...field}
                          color={
                            form.formState.errors.employeeName
                              ? "red"
                              : undefined
                          }
                        />
                      </>
                    )}
                  />
                </Flex>
              </Box>

              <Box gridColumn={{ initial: "span 2" }}>
                <Flex gap="2" direction="column">
                  <Controller
                    name="roleName"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <Text size="2">Role name</Text>
                        <TextField.Root
                          placeholder="Senior developer"
                          {...field}
                          color={
                            form.formState.errors.roleName ? "red" : undefined
                          }
                        />
                      </>
                    )}
                  />
                </Flex>
              </Box>

              <Box gridColumn={{ initial: "span 2" }}>
                <Flex gap="2" direction="column">
                  <Controller
                    name="departmentName"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <Text size="2">Department name</Text>
                        <TextField.Root
                          placeholder="Engineering"
                          {...field}
                          color={
                            form.formState.errors.departmentName
                              ? "red"
                              : undefined
                          }
                        />
                      </>
                    )}
                  />
                </Flex>
              </Box>

              <Box gridColumn={{ initial: "span 1" }}>
                <Flex gap="2" direction="column">
                  <Controller
                    name="startYear"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <Text size="2">Start year</Text>
                        <TextField.Root
                          placeholder="2021"
                          {...field}
                          color={
                            form.formState.errors.startYear ? "red" : undefined
                          }
                        />
                      </>
                    )}
                  />
                </Flex>
              </Box>

              <Box gridColumn={{ initial: "span 1" }}>
                <Flex gap="2" direction="column">
                  <Controller
                    name="endYear"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <Text size="2">End year</Text>
                        <TextField.Root
                          placeholder="2022"
                          {...field}
                          color={
                            form.formState.errors.endYear ? "red" : undefined
                          }
                        />
                      </>
                    )}
                  />
                </Flex>
              </Box>
            </Grid>

            <Flex justify={"end"}>
              <Button type="submit">Search</Button>
            </Flex>
          </Flex>
        </form>
      </Card>

      {data ? (
        <ResultsTable employees={data} />
      ) : (
        <Text>No employees found</Text>
      )}
    </Flex>
  );
}

export default Page;
