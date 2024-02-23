import { useAuthState } from "react-firebase-hooks/auth";
import { ProfileForm } from "@/components/forms/profile-form";
import { auth, storage } from "@/firebase/config";
import { ImagePlusIcon, Loader2, PencilIcon } from "lucide-react";
import { getStorage, ref as storageRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarFallbackGenarator from "@/components/avatar-fallback-generator";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ImagePicker from "../ImagePicker";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [isImagePicked, setIsImagePicked] = useState<boolean>(false);

  const userName = user?.displayName;
  const profilePic = user?.photoURL;

  const [pickedImage, setPickedImage] = useState<File | null>(null);

  useEffect(() => {
    if (pickedImage !== null) {
      setIsImagePicked(true);
    } else {
      setIsImagePicked(false);
    }
  }, [pickedImage]);

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const ref = storageRef(storage, `/userPhotoUrls/${pickedImage?.name}`);

  const handleImageUpload = async () => {
    console.log("handleImageUpload");
    try {
      if (pickedImage) {
        const newPhotoUrl = await uploadFile(ref, pickedImage, {
          contentType: pickedImage.type,
        });
        toast.success("Photo updated successfully.");
        alert(`Result: ${JSON.stringify(newPhotoUrl)}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again later.");
    }
  };

  // const pickedImageHandler = (isPicked: boolean) => {
  //   if (isPicked) {
  //     setIsImagePicked(true);
  //   } else {
  //     setIsImagePicked(false);
  //   }
  // };

  if (error) {
    toast.error(error.message);
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
          <div className="relative flex p-2">
            <AlertDialog>
              <AlertDialogTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full h-6 absolute z-10 bottom-0 right-0 p-1">
                <PencilIcon className="h-4 w-4 text-primary" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <ImagePicker onFilePick={handleFileReceive} />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={!isImagePicked || uploading}
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
                <AlertDialogDescription>
                  <ImagePicker onFilePick={handleFileReceive} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={!isImagePicked || uploading}
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
