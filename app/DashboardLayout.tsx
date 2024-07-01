"use client";
import { BuildingOffice, MagnifyingGlass } from "@phosphor-icons/react";
import { Box, Flex, Grid, Heading, Link } from "@radix-ui/themes";
import React from "react";
import { NextLink } from "./nextLink";

type Props = {
  children: React.ReactNode;
};

const menuItems = [
  { icon: BuildingOffice, title: "Companies", href: "/" },
  { icon: MagnifyingGlass, title: "Search", href: "/search" },
];

function DashboardLayout({ children }: Props) {
  return (
    <Grid columns={{ initial: "4" }} gap={{ initial: "2" }} py={"6"}>
      <Box gridColumn={{ initial: "span 1" }}>
        <Heading size={"6"}>Talent Verify</Heading>

        <Flex direction={"column"} gap="2" mt={"4"}>
          {menuItems.map((item) => (
            <Link
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              key={item.title}
              asChild
            >
              <NextLink href={item.href}>
                <item.icon />
                {item.title}
              </NextLink>
            </Link>
          ))}
        </Flex>
      </Box>

      <Box gridColumn={{ initial: "span 3" }}>{children}</Box>
    </Grid>
  );
}

export default DashboardLayout;
