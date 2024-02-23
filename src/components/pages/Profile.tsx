import { useAuthState } from "react-firebase-hooks/auth";
import { ProfileForm } from "@/components/forms/profile-form";
import { auth, storage } from "@/firebase/config";
import { ImagePlusIcon, Loader2, PencilIcon } from "lucide-react";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarFallbackGenarator from "@/components/avatar-fallback-generator";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ImagePicker from "../ImagePicker";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [pickedImage, setPickedImage] = useState<File | null>(null);
  const [isImagePicked, setIsImagePicked] = useState<boolean>(false);

  const [user, loading] = useAuthState(auth);

  const userName = user?.displayName;
  const profilePic = user?.photoURL;

  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();

  const ref = storageRef(
    storage,
    `/userPhotoUrls/${uuidv4()}${pickedImage?.name}`
  );

  const [updateProfile, updating, userProfileUpdateError] =
    useUpdateProfile(auth);

  useEffect(() => {
    if (pickedImage !== null) {
      setIsImagePicked(true);
    } else {
      setIsImagePicked(false);
    }
  }, [pickedImage]);

  const handleImageUpload = async () => {
    try {
      if (pickedImage) {
        await uploadFile(ref, pickedImage, {
          contentType: pickedImage.type,
        });
        const photoURL = await getDownloadURL(ref);
        updateProfile({ photoURL });
        toast.success("Photo updated successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (pickedImage !== null && userProfileUpdateError) {
    toast.error(userProfileUpdateError.message);
  }

  if (pickedImage !== null && uploadError) {
    toast.error(uploadError.message);
  }

  const handleFileReceive = (file: File) => {
    // Handle the file received from the ImagePicker component
    if (file !== null) {
      setPickedImage(file);
    } else {
      setPickedImage(null);
    }
  };
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
          <div className="relative flex items-center justify-center p-2">
            {(uploading || updating) && (
              <Loader2 className="absolute text-primary w-full h-full animate-spin" />
            )}

            <AlertDialog>
              <AlertDialogTrigger
                disabled={uploading || updating}
                className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full h-6 absolute z-10 bottom-0 right-0 p-1"
              >
                <PencilIcon className="h-4 w-4 text-primary" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                  <ImagePicker onFilePick={handleFileReceive} />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={!isImagePicked}
                    onClick={handleImageUpload}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Avatar className="h-14 w-14">
              <AvatarImage src={profilePic?.toString()} alt={userName!} />
              <AvatarFallback>
                {avatarFallbackGenarator(userName || "Daily Task")}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full">
              <ImagePlusIcon />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <ImagePicker onFilePick={handleFileReceive} />
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={!isImagePicked}
                  onClick={() => handleImageUpload}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <ProfileForm />
    </div>
  );
};

export default Profile;
