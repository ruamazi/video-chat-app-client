import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOutUser } from "../lib/api";

const useLogout = () => {
 const queryClient = useQueryClient();

 const { mutate: logoutMutation } = useMutation({
  mutationFn: logOutUser,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["authUser"] });
   window.location.reload();
  },
 });

 return { logoutMutation };
};

export default useLogout;
