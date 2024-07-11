// useUploadMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUploadMutation = (url: string, queryKeys: string[]) => {
  const queryClient = useQueryClient();

  const { isError, isIdle, isPending, mutate, isSuccess, data, error } =
    useMutation({
      mutationFn: (formData: any) => {
        return axios.post(url, formData);
      },
      onSuccess: () => {
        queryKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        );
      },
      onError: (error) => {
        console.error("Error uploading data:", error);
      }
    });

  return { isError, isIdle, isSuccess, isPending, data, error, mutate };
};

export default useUploadMutation;
