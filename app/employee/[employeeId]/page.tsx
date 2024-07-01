"use client";
import React, { useState } from "react";
import EmployeeDetailsCard from "./EmployeeDetailsCard";
import Navbar from "@/components/Navbar";
import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { Plus } from "@phosphor-icons/react";
import EmployeeRolesTable from "./EmployeeRolesTable";
import AddRoleModal from "./AddRoleModal";

type Props = {
  params: {
    employeeId: string;
  };
};

const Menu = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
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
          Add role
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

function Page({ params }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Flex direction="column" gap="4">
      <Navbar title="Employee management" menu={<Menu setOpen={setOpen} />} />
      <EmployeeDetailsCard employeeId={params.employeeId} />
      <AddRoleModal
        open={open}
        setOpen={setOpen}
        employeeId={params.employeeId}
      />
    </Flex>
  );
}

export default Page;
