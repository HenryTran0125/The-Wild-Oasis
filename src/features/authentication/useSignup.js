import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpApi,

    onSuccess: (data) => {
      console.log(data);
      toast.success("Sign up successfully");
    },
  });

  return { signup, isLoading };
}
