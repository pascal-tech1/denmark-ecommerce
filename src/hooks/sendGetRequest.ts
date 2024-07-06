// hooks/useFetchData.ts
import useSWRMutation from "swr/mutation";
 async function sendGetRequest(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching data");
  }

  return response.json();
}

export default function useFetchData(url: string) {
  const { trigger, data, error, isMutating, reset } = useSWRMutation(
    url,
    sendGetRequest
  );

  return {
    trigger,
    data,
    error,
    isMutating,
    reset
  };
}
