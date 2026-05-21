"use client";

import Flex from "@prettylab/core/components/layout/Flex/Flex";
import Typography from "@mui/material/Typography";
import Form from "@prettylab/form/Form";
import { useForm } from "react-hook-form";
import InputText from "@prettylab/form/input/InputText";
import Button from "@prettylab/core/components/layout/Button/Button";
import { BiKey } from "react-icons/bi";
import { useState } from "react";
import { validationEmail } from "@prettylab/core/utils/form/validation";
import { POST } from "@prettylab/api/utils/request";

export default function Page() {
  const form = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);

    const response = await POST(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      JSON.stringify(data),
    );

    setLoading(false);

    if (response.success) {
      window.location.reload();
    }
  };

  return (
    <Flex column sx={{ p: 3 }}>
      <Typography variant="h6">Login</Typography>
      <Form form={form} onSubmit={onSubmit}>
        <Flex column sx={{ gap: 2, mt: 4, maxWidth: 400 }}>
          <InputText
            name={"email"}
            label={"E-mail"}
            size="small"
            required
            rules={validationEmail}
          />
          <InputText
            name={"password"}
            type="password"
            label={"Password"}
            size="small"
            required
          />
          <Flex end>
            <Button
              type="submit"
              variant="contained"
              loading={loading}
              startIcon={<BiKey />}
            >
              Log in
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
}
