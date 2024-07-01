"use client";
import { useGetCompanies } from "@/hooks/useGetCompanies";
import { Link, Table, Text } from "@radix-ui/themes";
import React from "react";
import { NextLink } from "./nextLink";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { formatDate } from "@/utils/formatDate";

type Props = {};

const columns = [
  "Name",
  "Address",
  "Phone",
  "Email",
  "Registration Number",
  "Registration Date",
  "Contact Person",
];

const CellMinWidth = "160px";

function CompanyTable({}: Props) {
  const { data, error, isLoading } = useGetCompanies();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error getting company data</Text>;
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
            {data.map((company) => (
              <Table.Row key={company.id}>
                <Table.RowHeaderCell style={{ minWidth: CellMinWidth }}>
                  <Link asChild>
                    <NextLink href={`/company/${company.id}`}>
                      {company.name}
                    </NextLink>
                  </Link>
                </Table.RowHeaderCell>
                <Table.Cell style={{ minWidth: CellMinWidth }}>
                  {company.address}
                </Table.Cell>
                <Table.Cell style={{ minWidth: CellMinWidth }}>
                  {company.contactPhone}
                </Table.Cell>
                <Table.Cell style={{ minWidth: CellMinWidth }}>
                  {company.email}
                </Table.Cell>
                <Table.Cell style={{ minWidth: CellMinWidth }}>
                  {company.registrationNumber}
                </Table.Cell>
                <Table.Cell style={{ minWidth: CellMinWidth }}>
                  {formatDate(company.registrationDate.toISOString())}
                </Table.Cell>
                <Table.Cell style={{ minWidth: CellMinWidth }}>
                  {company.contactPerson}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text>No companies found</Text>
      )}
    </>
  );
}

export default CompanyTable;
