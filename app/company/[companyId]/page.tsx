"use client";
import Navbar from "@/components/Navbar";
import { useGetCompanyDetails } from "@/hooks/useGetCompanyDetails";
import { MicrosoftExcelLogo, Plus, UploadSimple } from "@phosphor-icons/react";
import { Box, Button, DropdownMenu, Flex, Tabs } from "@radix-ui/themes";
import React, { useState } from "react";
import AddDepartmentModal from "./AddDepartmentModal";
import AddEmployeeModal from "./AddEmployeeModal";
import CompanyDepartmentsTable from "./CompanyDepartmentsTable";
import CompanyDetailsCard from "./CompanyDetailsCard";
import CompanyEmployeesTable from "./CompanyEmployeesTable";

type Props = {
  params: {
    companyId: string;
  };
};

const DepartmentMenu = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => setOpen(true)}>
          <Plus />
          Add single
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <MicrosoftExcelLogo />
          Batch upload sample CSV
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <UploadSimple />
          Batch upload
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const EmployeeMenu = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => setOpen(true)}>
          <Plus />
          Add single
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <MicrosoftExcelLogo />
          Batch upload sample CSV
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <UploadSimple />
          Batch upload
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

function Page({ params }: Props) {
  const [addDeptOpen, setAddDeptOpen] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [tabValue, setTabValue] = useState("company");
  const { data, error, isLoading } = useGetCompanyDetails(params.companyId);
  const menuSelector = (tabValue: string): React.ReactNode => {
    if (tabValue == "departments")
      return <DepartmentMenu setOpen={setAddDeptOpen} />;
    if (tabValue == "employees")
      return <EmployeeMenu setOpen={setAddEmployeeOpen} />;
    return <></>;
  };

  return (
    <Flex direction="column" gap="4">
      <Navbar
        title={data?.name || ""}
        menu={menuSelector(tabValue)}
        backButtonUrl={"/"}
      />

      <Tabs.Root defaultValue={tabValue} onValueChange={setTabValue}>
        <Tabs.List>
          <Tabs.Trigger value="company">Company</Tabs.Trigger>
          <Tabs.Trigger value="departments">Departments</Tabs.Trigger>
          <Tabs.Trigger value="employees">Employees</Tabs.Trigger>
        </Tabs.List>

        <Box p={"4"}>
          <Tabs.Content value="company">
            <Flex gap="3" direction={"column"}>
              <CompanyDetailsCard companyId={params.companyId} />
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="departments">
            <Flex gap="3" direction={"column"}>
              <CompanyDepartmentsTable companyId={params.companyId} />
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="employees">
            <Flex gap="3" direction={"column"}>
              <CompanyEmployeesTable companyId={params.companyId} />
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>

      <AddDepartmentModal
        open={addDeptOpen}
        setOpen={setAddDeptOpen}
        companyId={params.companyId}
      />

      <AddEmployeeModal
        open={addEmployeeOpen}
        setOpen={setAddEmployeeOpen}
        companyId={params.companyId}
      />
    </Flex>
  );
}

export default Page;
