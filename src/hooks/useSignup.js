import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpUser } from "../lib/api";

const useSignup = () => {
 const queryClient = useQueryClient();

 const {
  mutate: signUpMutation,
  isPending,
  error,
 } = useMutation({
  mutationFn: signUpUser,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["authUser"] });
  },
 });

 return { signUpMutation, isPending, error };
};

export default useSignup;
