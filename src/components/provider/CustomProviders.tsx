"use client";

import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function CustomProviders({ children }: Props) {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
