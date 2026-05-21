import { OptionsWithExtraProps } from "notistack";
import isServer from "@prettylab/core/utils/ssr/isServer";

export const notify = async (
  message: unknown,
  options?: OptionsWithExtraProps<any>,
) => {
  if (isServer()) return;

  const text =
    typeof message === "string"
      ? message
      : message instanceof Error
        ? message.message
        : message == null
          ? ""
          : String(message);

  if (!text) return;

  const { enqueueSnackbar } = await import("notistack");
  enqueueSnackbar(text, { variant: "default", ...options });
};
