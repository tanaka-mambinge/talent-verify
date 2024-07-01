"use client";
import { XCircle } from "@phosphor-icons/react";
import * as RadixToast from "@radix-ui/react-toast";
import { Card, Flex, Grid, IconButton, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  ElementRef,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";

const ToastContext = createContext<{
  showToast: (text: string, icon: React.ReactNode) => void;
}>({
  showToast: () => {
    throw new Error(
      "You can't call showToast() outside of a <ToastProvider> – add it to your tree."
    );
  },
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<
    { id: string; text: string; icon: React.ReactNode }[]
  >([]);

  function showToast(text: string, icon: React.ReactNode) {
    setMessages((toasts) => [
      ...toasts,
      {
        id: window.crypto.randomUUID(),
        text,
        icon,
      },
    ]);
  }

  return (
    <RadixToast.Provider>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>

      <AnimatePresence mode="popLayout">
        {messages.map((toast) => (
          <Toast
            key={toast.id}
            text={toast.text}
            icon={toast.icon}
            onClose={() =>
              setMessages((toasts) => toasts.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </AnimatePresence>
      <Flex
        asChild
        direction="column-reverse"
        width="auto"
        position="fixed"
        overflow="hidden"
        // maxHeight="70vh"
        top="6rem"
        right="4"
        gap="1"
        p="0"
        m="0"
      >
        <RadixToast.Viewport />
      </Flex>

      {/* <RadixToast.Viewport className="max-sm:top-20 fixed top-4 right-4 flex w-80 flex-col-reverse gap-3" /> */}
    </RadixToast.Provider>
  );
}

const Toast = forwardRef<
  ElementRef<typeof RadixToast.Root>,
  {
    onClose: () => void;
    text: string;
    icon: React.ReactNode;
  }
>(function Toast({ onClose, text, icon }, forwardedRef) {
  let width = 320;
  let margin = 16;

  return (
    <RadixToast.Root
      ref={forwardedRef}
      asChild
      forceMount
      onOpenChange={onClose}
      duration={2500}
    >
      <motion.li
        layout
        initial={{ x: width + margin }}
        animate={{ x: 0 }}
        exit={{
          opacity: 0,
          zIndex: -1,
          transition: {
            opacity: {
              duration: 0.2,
            },
          },
        }}
        transition={{
          type: "spring",
          mass: 1,
          damping: 30,
          stiffness: 200,
        }}
        style={{
          width,
          WebkitTapHighlightColor: "transparent",
          listStyle: "none",
        }}
      >
        <Card style={{ paddingRight: "1rem" }} variant="surface">
          <Grid columns="8" gap="2">
            {icon}
            <RadixToast.Description
              style={{
                gridColumn: "2 / 8",
              }}
            >
              <Text wrap={"pretty"}>{text}</Text>
            </RadixToast.Description>
            <RadixToast.Close asChild>
              <IconButton size="1" variant="ghost" radius="full" color="gray">
                <XCircle />
              </IconButton>
            </RadixToast.Close>
          </Grid>
        </Card>
      </motion.li>
    </RadixToast.Root>
  );
});
