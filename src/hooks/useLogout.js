import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOutUser } from "../lib/api";

const useLogout = () => {
 const queryClient = useQueryClient();

 const { mutate: logoutMutation } = useMutation({
  mutationFn: logOutUser,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["authUser"] });
  },
 });

 return { logoutMutation };
};

export default useLogout;
