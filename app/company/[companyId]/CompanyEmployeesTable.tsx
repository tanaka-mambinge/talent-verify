"use client";
import { NextLink } from "@/app/nextLink";
import { useGetCompanyEmployees } from "@/hooks/useGetCompanyEmployees";
import { Link, Table, Text } from "@radix-ui/themes";

type Props = {
  companyId: string;
};

const columns = ["Name"];

function CompanyEmployeesTable({ companyId }: Props) {
  const { data, error, isLoading } = useGetCompanyEmployees(companyId);

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
            {data.map((employee) => (
              <Table.Row key={employee.id}>
                <Table.RowHeaderCell>
                  <Link asChild>
                    <NextLink href={`/employee/${employee.id}`}>
                      {employee.name}
                    </NextLink>
                  </Link>
                </Table.RowHeaderCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text>No employees found</Text>
      )}
    </>
  );
}

export default CompanyEmployeesTable;
