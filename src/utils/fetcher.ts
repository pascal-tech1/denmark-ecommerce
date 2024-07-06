// utils/fetcher.ts
export const postFetcher = async <T>(url: string, data: T): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
