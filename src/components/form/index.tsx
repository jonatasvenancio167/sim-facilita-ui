import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AccountModal } from "../modal";

type FormProps = {
  isEditing?: boolean,
  onDeleteAccount?: () => void
}

export function Form({ isEditing = false, onDeleteAccount }: FormProps){
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const DeleteAccount = () => {
    console.log('Mocked account deletion!');
  };

  const handleDeleteAccount = () => {
    if (onDeleteAccount) {
      onDeleteAccount();
    } else {
      DeleteAccount();
    }
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDeleteAccount = () => {
    if (onDeleteAccount) {
      onDeleteAccount();
    }
    closeDeleteModal();
  };

  return(
    <>
      <form className="mt-8 mb-2 ml-8 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Input
            size="lg"
            variant="standard" 
            label="Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} crossOrigin={undefined}          
          />
          <Input
            size="lg"
            variant="standard" 
            label="Last Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} crossOrigin={undefined}          
          />
          <Input
            size="lg"
            variant="standard" 
            label="Email"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} crossOrigin={undefined}          />
          <Input
            size="lg"
            variant="standard" 
            label="Phone"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} crossOrigin={undefined}   
          /> 
          <Input
            size="lg"
            variant="standard" 
            type="date"
            label="Birthdate"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} crossOrigin={undefined}   
          /> 
          <Input
            type="password" 
            variant="standard"
            size="lg"
            label="password"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }} crossOrigin={undefined}          />
        </div>
        <Button className="mt-6" fullWidth>
          {isEditing ? "Update Profile" : "Sign Up"}
        </Button>

        {isEditing && (
          <>
            <Button
              className="mt-4 bg-red-500 hover:bg-red-600"
              fullWidth
              onClick={openDeleteModal}
            >
              Delete Account
            </Button>

            <AccountModal
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onConfirm={confirmDeleteAccount}
            />
          </>
        )}
        {!isEditing ?
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography> : <div className="mt-10"></div>
        }
      </form>
    </>
  )
}