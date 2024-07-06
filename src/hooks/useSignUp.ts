// hooks/useSignUp.ts
import useSWRMutation from "swr/mutation";

async function sendPostRequest(url: string, { arg }: { arg: any }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(arg)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error uploading data ");
  }

  return response.json();
}

export default function useSendPostRequest(url: string) {
  const { trigger, data, error, isMutating, reset } = useSWRMutation(
    url,
    sendPostRequest
  );

  return {
    trigger,
    data,
    error,
    isMutating,
    reset
  };
}
