"use client";
import { NextLink } from "@/app/nextLink";
import { IEmployee } from "@/types/employee";
import { Link, Table, Text } from "@radix-ui/themes";

type Props = {
  employees: IEmployee[];
};

const columns = ["Name"];

function ResultsTable({ employees }: Props) {
  return (
    <>
      {employees && employees.length > 0 ? (
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
            {employees.map((employee) => (
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

export default ResultsTable;
