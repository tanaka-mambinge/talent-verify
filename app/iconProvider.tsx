"use client";
import React from "react";

import { IconContext } from "@phosphor-icons/react";
type Props = { children: React.ReactNode };

function IconProvider({ children }: Props) {
  return (
    <IconContext.Provider
      value={{
        size: 24,
        // weight: "fill",
      }}
    >
      {children}
    </IconContext.Provider>
  );
}

export default IconProvider;
