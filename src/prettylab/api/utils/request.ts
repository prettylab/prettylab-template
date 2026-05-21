import isClient from "@prettylab/core/utils/ssr/isClient";
import isServer from "@prettylab/core/utils/ssr/isServer";
import message, { matchMessageMeta } from "@prettylab/api/consts/message";
import getValue from "@prettylab/core/utils/data/getValue";
import config from "@prettylab/config";

export async function GET(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  return handleResponse(res, true);
}

export async function POST(url: string, body: string) {
  const res = await fetch(url, {
    method: "POST",
    body,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  return handleResponse(res);
}

export async function PATCH(url: string, body?: string) {
  const res = await fetch(url, {
    method: "PATCH",
    body,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  return handleResponse(res);
}

export async function DELETE(url: string) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });

  return handleResponse(res);
}

async function handleResponse(res: Response, disableSuccess?: boolean) {
  const data = await res.json().catch(async () => {
    if (isClient()) {
      try {
        // @ts-ignore
        const { notify } = await import("@prettylab/notify/notify");
        notify(message.INTERNAL_SERVER_ERROR, {
          variant:
            matchMessageMeta[message.INTERNAL_SERVER_ERROR]?.notifyWariant,
        });
      } catch {
        console.error(message.INTERNAL_SERVER_ERROR);
      }
    }

    if (isServer()) {
      console.log(message.INTERNAL_SERVER_ERROR);
    }
  });

  const responseMessage = getValue(data, config.api.messagePath);

  const isSuccess = matchMessageMeta[responseMessage]?.success || false;
  if (!disableSuccess || (disableSuccess && !isSuccess)) {
    if (isClient()) {
      if (!matchMessageMeta[responseMessage]?.notifyWariant) {
        console.log(responseMessage);
      }

      try {
        // @ts-ignore
        const { notify } = await import("@prettylab/notify/notify");
        notify(responseMessage, {
          variant: matchMessageMeta[responseMessage]?.notifyWariant,
        });
      } catch {
        console.log(responseMessage);
      }
    }

    if (isServer()) {
      console.log(responseMessage);
    }
  }

  return { ...data, success: isSuccess };
}
