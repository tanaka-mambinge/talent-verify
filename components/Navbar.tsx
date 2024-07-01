import { NextLink } from "@/app/nextLink";
import { ArrowLeft, CaretLeft } from "@phosphor-icons/react";
import {
  Button,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Link,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  title: string;
  menu: JSX.Element | React.ReactNode;
  backButtonUrl?: string;
};

const Navbar = ({ title, menu, backButtonUrl }: Props) => {
  return (
    <Card>
      <Flex justify={"between"} align={"center"}>
        <Flex gap="2">
          {backButtonUrl && (
            <Link size={"1"} asChild>
              <NextLink href={backButtonUrl}>
                <IconButton variant="ghost">
                  <CaretLeft />
                </IconButton>
              </NextLink>
            </Link>
          )}
          <Heading size={"5"}>{title}</Heading>
        </Flex>

        <div>{menu}</div>
      </Flex>
    </Card>
  );
};

export default Navbar;
