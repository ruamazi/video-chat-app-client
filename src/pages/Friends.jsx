import { UsersIcon } from "lucide-react";
import { Link } from "react-router";
import { getUserFriends } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import NoFriendFound from "../components/NoFriendFound";
import FriendCard from "../components/FriendCard";

const Friends = () => {
 const { data: friends = [], isLoading: loadingFriends } = useQuery({
  queryKey: ["friends"],
  queryFn: getUserFriends,
 });

 return (
  <div className="container mx-auto space-y-10 p-4">
   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
     Friends list
    </h2>
    <Link to="/notifications" className="btn btn-outline btn-sm">
     <UsersIcon className="mr-2 size-4" />
     Friend Requests
    </Link>
   </div>
   {loadingFriends ? (
    <div className="flex justify-center py-12">
     <span className="loading loading-spinner loading-lg" />
    </div>
   ) : friends.length === 0 ? (
    <NoFriendFound />
   ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
     {friends.map((friend) => (
      <FriendCard key={friend._id} friend={friend} />
     ))}
    </div>
   )}
  </div>
 );
};

export default Friends;
