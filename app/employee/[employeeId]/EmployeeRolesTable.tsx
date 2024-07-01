import { useToast } from "@/components/AppToast";
import { BASE_API_URL } from "@/constants/urls";
import { roleSchema } from "@/schemas/roleSchema";
import { IRole } from "@/types/role";
import { formatDate } from "@/utils/formatDate";
import { updateRole } from "@/utils/updateRole";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CheckCircle,
  FloppyDisk,
  TrashSimple,
  WarningOctagon,
} from "@phosphor-icons/react";
import { DotsThreeVertical } from "@phosphor-icons/react/dist/ssr";
import {
  Button,
  DropdownMenu,
  Flex,
  ScrollArea,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

type Props = {
  roles?: IRole[];
};

type TableRowProps = {
  role: IRole;
};

const columns = [
  "Role",
  "Duties",
  "Company",
  "Department",
  "Company employee ID",
  "Start date",
  "End date",
  "",
];

const TextFieldMinWidth = "160px";

interface IForm {
  name: string;
  companyName: string;
  employeeCompanyId?: string | undefined;
  departmentName: string;
  duties: string;
  startDate: string;
  endDate?: string | undefined;
}

const TableRow = ({ role }: TableRowProps) => {
  const { showToast } = useToast();
  const { mutate } = useSWRConfig();
  const form = useForm<IForm>({
    defaultValues: {
      name: undefined,
      companyName: undefined,
      departmentName: undefined,
      employeeCompanyId: undefined,
      duties: undefined,
      startDate: undefined,
      endDate: undefined,
    },
    resolver: yupResolver<IForm>(roleSchema),
  });

  const handleSubmit: SubmitHandler<IForm> = async (data) => {
    const formData: IRole = {
      id: role.id,
      name: data.name,
      companyName: data.companyName,
      employeeCompanyId: data.employeeCompanyId || undefined,
      departmentName: data.departmentName,
      duties: data.duties,
      startDate: new Date(data.startDate),
      endDate: (data.endDate && new Date(data.endDate)) || null,
    };

    const res = await updateRole(formData).catch((err) => {
      console.log(err);
    });

    if (res?.data) {
      const mutationUrl = `${BASE_API_URL}/employee/${role.employeeId}`;
      mutate(mutationUrl);
      showToast("Role updated", <CheckCircle />);
    }

    if (res?.errors) {
      console.log(res.errors);
    }
  };

  const handleDelete = async (roleId: string) => {
    const res = await fetch(`${BASE_API_URL}/role/${roleId}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        if (res.status == 204) {
          const mutationUrl = `${BASE_API_URL}/employee/${role.employeeId}`;
          mutate(mutationUrl);
          showToast("Role deleted", <CheckCircle />);
        } else {
          const err = await res.json();
          throw new Error(err?.detail || "Error deleting role");
        }
      })
      .catch((err) => {
        showToast(err.message, <WarningOctagon color="red" />);
      });
  };

  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name,
        employeeCompanyId: role.employeeCompanyId || undefined,
        companyName: role.company?.name || undefined,
        departmentName: role.department?.name || undefined,
        duties: role.duties,
        startDate: formatDate(role.startDate.toISOString()),
        endDate:
          (role.endDate && formatDate(role.endDate.toISOString())) || undefined,
      });
    }
  }, [role]);

  return (
    <Table.Row>
      <Table.RowHeaderCell>
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <Flex direction={"column"} gap={"2"}>
              <TextField.Root
                placeholder="CEO"
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
        <Controller
          name="duties"
          control={form.control}
          render={({ field }) => (
            <Flex direction={"column"} gap={"2"}>
              <TextField.Root
                placeholder="Leading the company"
                {...field}
                color={form.formState.errors.duties ? "red" : undefined}
                style={{ minWidth: TextFieldMinWidth }}
              />
              <Text size="1" color="red">
                {form.formState.errors.duties?.message}
              </Text>
            </Flex>
          )}
        />
      </Table.Cell>

      <Table.Cell>
        <Controller
          name="companyName"
          control={form.control}
          render={({ field }) => (
            <Flex direction={"column"} gap={"2"}>
              <TextField.Root
                placeholder="Talent verify"
                {...field}
                color={form.formState.errors.companyName ? "red" : undefined}
                style={{ minWidth: TextFieldMinWidth }}
              />
              <Text size="1" color="red">
                {form.formState.errors.companyName?.message}
              </Text>
            </Flex>
          )}
        />
      </Table.Cell>

      <Table.Cell>
        <Controller
          name="departmentName"
          control={form.control}
          render={({ field }) => (
            <Flex direction={"column"} gap={"2"}>
              <TextField.Root
                placeholder="Human resources"
                {...field}
                color={form.formState.errors.departmentName ? "red" : undefined}
                style={{ minWidth: TextFieldMinWidth }}
              />
              <Text size="1" color="red">
                {form.formState.errors.departmentName?.message}
              </Text>
            </Flex>
          )}
        />
      </Table.Cell>

      <Table.Cell>
        <Controller
          name="employeeCompanyId"
          control={form.control}
          render={({ field }) => (
            <Flex direction={"column"} gap={"2"}>
              <TextField.Root
                placeholder="TV0001"
                {...field}
                color={
                  form.formState.errors.employeeCompanyId ? "red" : undefined
                }
                style={{ minWidth: TextFieldMinWidth }}
              />
              <Text size="1" color="red">
                {form.formState.errors.employeeCompanyId?.message}
              </Text>
            </Flex>
          )}
        />
      </Table.Cell>

      <Table.Cell>
        <Controller
          name="startDate"
          control={form.control}
          render={({ field }) => (
            <Flex direction={"column"} gap={"2"}>
              <TextField.Root
                type="date"
                {...field}
                color={form.formState.errors.startDate ? "red" : undefined}
                style={{ minWidth: TextFieldMinWidth }}
              />
              <Text size="1" color="red">
                {form.formState.errors.startDate?.message}
              </Text>
            </Flex>
          )}
        />
      </Table.Cell>

      <Table.Cell>
        <Controller
          name="endDate"
          control={form.control}
          render={({ field }) => (
            <Flex direction={"column"} gap={"2"}>
              <TextField.Root
                type="date"
                {...field}
                color={form.formState.errors.endDate ? "red" : undefined}
                style={{ minWidth: TextFieldMinWidth }}
              />
              <Text size="1" color="red">
                {form.formState.errors.endDate?.message}
              </Text>
            </Flex>
          )}
        />
      </Table.Cell>

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
              onClick={() => handleDelete(role?.id || "")}
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

function EmployeeRolesTable({ roles }: Props) {
  return (
    <ScrollArea>
      {roles && roles.length > 0 ? (
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
            {roles.map((role) => {
              console.log(role.startDate.toISOString());
              return <TableRow key={role.id} role={role} />;
            })}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text>No roles found</Text>
      )}
    </ScrollArea>
  );
}

export default EmployeeRolesTable;
