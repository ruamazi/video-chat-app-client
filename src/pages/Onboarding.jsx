import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
 LoaderIcon,
 MapPinIcon,
 ShipWheelIcon,
 ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const Onboarding = () => {
 const { authUser } = useAuthUser();
 const queryClient = useQueryClient();

 const [formState, setFormState] = useState({
  username: authUser?.username || "",
  bio: authUser?.bio || "",
  nativeLanguage: authUser?.nativeLanguage || "",
  learningLanguage: authUser?.learningLanguage || "",
  location: authUser?.location || "",
  avatar: authUser?.avatar || "",
 });
 const [isAvatarLoading, setIsAvatarLoading] = useState(false);
 const [avatarTriggeredByUser, setAvatarTriggeredByUser] = useState(false);

 const { mutate: onboardingMutation, isPending } = useMutation({
  mutationFn: completeOnboarding,
  onSuccess: () => {
   toast.dismiss();
   toast.success("Profile completed successfully!");
   queryClient.invalidateQueries(["authUser"]);
  },
  onError: (err) => {
   toast.dismiss();
   toast.error(err?.response?.data?.error || "Something went wrong!");
  },
 });

 const handleSubmit = (e) => {
  e.preventDefault();
  onboardingMutation(formState);
 };

 const handleRandomAvatar = () => {
  toast.dismiss();
  const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
  const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
  setAvatarTriggeredByUser(true);
  setIsAvatarLoading(true);
  setFormState({ ...formState, avatar: randomAvatar });
 };

 return (
  <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
   <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
    <div className="card-body p-6 sm:p-8">
     <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
      Complete Your Profile
     </h1>

     <form onSubmit={handleSubmit} className="space-y-6">
      {/* PROFILE PIC CONTAINER */}
      <div className="flex flex-col items-center justify-center space-y-4">
       {/* IMAGE PREVIEW */}
       <div className="size-32 rounded-full bg-base-300 overflow-hidden">
        {formState.avatar ? (
         <img
          src={formState.avatar}
          alt="Profile Preview"
          className="w-full h-full object-cover"
          onLoad={() => {
           setIsAvatarLoading(false);
           if (avatarTriggeredByUser) {
            toast.success("Random avatar loaded!");
            setAvatarTriggeredByUser(false); // reset flag
           }
          }}
          onError={() => {
           setIsAvatarLoading(false);
           if (avatarTriggeredByUser) {
            toast.error("Failed to load avatar.");
            setAvatarTriggeredByUser(false); // reset flag
           }
          }}
         />
        ) : (
         <div className="flex items-center justify-center h-full">
          <CameraIcon className="size-12 text-base-content opacity-40" />
         </div>
        )}
       </div>

       {/* Generate Random Avatar BTN */}
       <div className="flex items-center gap-2">
        <button
         type="button"
         onClick={handleRandomAvatar}
         className="btn btn-accent"
         disabled={isAvatarLoading}
        >
         {isAvatarLoading ? (
          <>
           <LoaderIcon className="size-4 animate-spin mr-2" />
           Loading...
          </>
         ) : (
          <>
           <ShuffleIcon className="size-4 mr-2" />
           Generate Random Avatar
          </>
         )}
        </button>
       </div>
      </div>

      {/* USERNAME */}
      <div className="form-control">
       <label className="label">
        <span className="label-text">Username</span>
       </label>
       <input
        type="text"
        name="username"
        value={formState.username}
        onChange={(e) =>
         setFormState({ ...formState, username: e.target.value })
        }
        className="input input-bordered w-full"
        placeholder="Your username"
       />
      </div>

      {/* BIO */}
      <div className="form-control">
       <label className="label">
        <span className="label-text">Bio</span>
       </label>
       <textarea
        name="bio"
        value={formState.bio}
        onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
        className="textarea textarea-bordered h-24"
        placeholder="Tell others about yourself ..."
       />
      </div>

      {/* LANGUAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {/* NATIVE LANGUAGE */}
       <div className="form-control">
        <label className="label">
         <span className="label-text">Native Language</span>
        </label>
        <select
         name="nativeLanguage"
         value={formState.nativeLanguage}
         onChange={(e) =>
          setFormState({ ...formState, nativeLanguage: e.target.value })
         }
         className="select select-bordered w-full"
        >
         <option value="">Select your native language</option>
         {LANGUAGES.map((lang) => (
          <option key={`native-${lang}`} value={lang.toLowerCase()}>
           {lang}
          </option>
         ))}
        </select>
       </div>

       {/* LEARNING LANGUAGE */}
       <div className="form-control">
        <label className="label">
         <span className="label-text">Learning Language</span>
        </label>
        <select
         name="learningLanguage"
         value={formState.learningLanguage}
         onChange={(e) =>
          setFormState({ ...formState, learningLanguage: e.target.value })
         }
         className="select select-bordered w-full"
        >
         <option value="">Select language you're learning</option>
         {LANGUAGES.map((lang) => (
          <option key={`learning-${lang}`} value={lang.toLowerCase()}>
           {lang}
          </option>
         ))}
        </select>
       </div>
      </div>

      {/* LOCATION */}
      <div className="form-control">
       <label className="label">
        <span className="label-text">Location</span>
       </label>
       <div className="relative">
        <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
        <input
         type="text"
         name="location"
         value={formState.location}
         onChange={(e) =>
          setFormState({ ...formState, location: e.target.value })
         }
         className="input input-bordered w-full pl-10"
         placeholder="City, Country"
        />
       </div>
      </div>

      {/* SUBMIT BUTTON */}

      <button
       className="btn btn-primary w-full"
       disabled={isPending}
       type="submit"
      >
       {!isPending ? (
        <>
         <ShipWheelIcon className="size-5 mr-2" />
         Save Changes
        </>
       ) : (
        <>
         <LoaderIcon className="animate-spin size-5 mr-2" />
         Onboarding...
        </>
       )}
      </button>
     </form>
    </div>
   </div>
  </div>
 );
};

export default Onboarding;
