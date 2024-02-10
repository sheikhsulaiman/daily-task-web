import { useAuthState } from "react-firebase-hooks/auth";
import { ProfileForm } from "@/components/forms/profile-form";
import { auth } from "@/firebase/config";
import { ImagePlusIcon, Loader2 } from "lucide-react";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        {loading && <Loader2 className="animate-spin" />}
        {user?.photoURL ? (
          <img
            className="rounded-full h-12 w-12"
            src={user.photoURL}
            alt="profile-pic"
          />
        ) : (
          <ImagePlusIcon />
        )}
      </div>
      <ProfileForm />
    </div>
  );
};

export default Profile;
