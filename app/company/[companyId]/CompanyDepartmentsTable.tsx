"use client";
import { useToast } from "@/components/AppToast";
import { BASE_API_URL } from "@/constants/urls";
import { useGetCompanyDepartments } from "@/hooks/useGetCompanyDepartments";
import { departmentSchema } from "@/schemas/departmentSchema";
import { IDepartment } from "@/types/department";
import { updateDepartment } from "@/utils/updateDepartment";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CheckCircle,
  DotsThreeVertical,
  FloppyDisk,
  TrashSimple,
  WarningOctagon,
} from "@phosphor-icons/react";
import {
  Button,
  DropdownMenu,
  Flex,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

const TextFieldMinWidth = "300px";

type Props = {
  companyId: string;
};

type TableRowProps = {
  department: IDepartment;
};

interface IForm {
  name: string;
}

const TableRow = ({ department }: TableRowProps) => {
  const { showToast } = useToast();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const form = useForm<IForm>({
    defaultValues: {
      name: undefined,
    },
    resolver: yupResolver<IForm>(departmentSchema),
  });

  const handleSubmit: SubmitHandler<IForm> = async (data) => {
    const formData: IDepartment = {
      id: department.id,
      companyId: department.companyId,
      name: data.name,
    };

    const res = await updateDepartment(formData).catch((err) => {
      console.log(err);
    });

    if (res?.data) {
      const mutationUrl = `${BASE_API_URL}/company/${department.companyId}/departments`;
      mutate(mutationUrl);
      showToast("Department details updated", <CheckCircle />);
    }

    if (res?.errors) {
      console.log(res.errors);
    }
  };

  const handleDelete = async (companyId: string, departmentId: string) => {
    const res = await fetch(`${BASE_API_URL}/department/${departmentId}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        if (res.status == 204) {
          const mutationUrl = `${BASE_API_URL}/company/${companyId}/departments`;
          mutate(mutationUrl);
          showToast("Department deleted", <CheckCircle />);
        } else {
          const err = await res.json();
          throw new Error(err?.detail || "Error deleting department");
        }
      })
      .catch((err) => {
        showToast(err.message, <WarningOctagon color="red" />);
      });
  };

  useEffect(() => {
    if (department) {
      form.reset({
        name: department.name,
      });
    }
  }, [department]);

  return (
    <Table.Row>
      <Table.RowHeaderCell>
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <Flex direction={"column"} gap={"2"}>
              <TextField.Root
                placeholder="Talent Verify"
                {...field}
                color={form.formState.errors.name ? "red" : undefined}
                style={{ minWidth: TextFieldMinWidth }}
              />
              <Text size="1" color="red">
                {form.formState.errors.name?.message}
              </Text>
            </Flex>
          )}
        />
      </Table.RowHeaderCell>

      <Table.Cell>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              <DotsThreeVertical />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item onClick={form.handleSubmit(handleSubmit)}>
              <FloppyDisk />
              Update row
            </DropdownMenu.Item>

            <DropdownMenu.Item
              color="red"
              onClick={() => {
                handleDelete(department.companyId, department.id as string);
              }}
            >
              <TrashSimple />
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Table.Cell>
    </Table.Row>
  );
};

function CompanyDepartmentsTable({ companyId }: Props) {
  const columns = ["Name", ""];
  const { data, error, isLoading } = useGetCompanyDepartments(companyId);

  if (error) {
    return <Text>Error loading departments</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {data && data.length > 0 ? (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column}>
                  {column}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((department) => (
              <TableRow key={department.id} department={department} />
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text>No departments found</Text>
      )}
    </>
  );
}

export default CompanyDepartmentsTable;
