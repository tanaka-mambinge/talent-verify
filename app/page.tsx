"use client";
import {
  Airplay,
  Drop,
  MicrosoftExcelLogo,
  Plus,
  UploadSimple,
} from "@phosphor-icons/react";
import {
  Button,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import CompanyTable from "./CompanyTable";
import Navbar from "@/components/Navbar";
import AddCompanyModal from "./AddCompanyModal";
import { useState } from "react";

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

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Flex direction="column" gap="4">
      <Navbar title="Company management" menu={<Menu setOpen={setOpen} />} />
      <AddCompanyModal open={open} setOpen={setOpen} />
      <CompanyTable />
    </Flex>
  );
}
