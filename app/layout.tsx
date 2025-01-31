import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import IconProvider from "./iconProvider";
import DashboardLayout from "./DashboardLayout";
import { ToastProvider } from "@/components/AppToast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Theme
          appearance="dark"
          accentColor="lime"
          grayColor="olive"
          panelBackground="solid"
          radius="full"
        >
          <IconProvider>
            <ToastProvider>
              <Container px={"2"}>
                {/* <ThemePanel /> */}
                <DashboardLayout>{children}</DashboardLayout>
              </Container>
            </ToastProvider>
          </IconProvider>
        </Theme>
      </body>
    </html>
  );
}
