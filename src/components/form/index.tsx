import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from 'zod'
import { AccountModal } from "../modal";
import { FormProvider, useForm } from "react-hook-form";
import api from "../../service/apiClient";
import { useToast } from "../../hooks/useNotify";
import { formValidation } from "../../validation/formValidation";
import { BeatLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { queryClient } from "../../service/queryClient";

type FormProps = {
  isEditing?: boolean,
  onDeleteAccount?: () => void
}

type CreateUserData = z.infer<typeof formValidation>

export function Form({ isEditing = false, onDeleteAccount }: FormProps){
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const methods = useForm<CreateUserData>({
    resolver: zodResolver(formValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods;

  console.log(errors)
  const DeleteAccount = () => {
    console.log('Mocked account deletion!');
  };

  const { notify } = useToast()

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

  const formUser = async ({ birthdate, email, lastName, name, password, phone }: CreateUserData) => {
    try {
      await api.post("/register", {
        birthdate, email, lastName, name, password, phone
      });

      notify({
        types: 'success',
        message: 'Cadastro realizado com sucesso!'
      })
      
      await queryClient.invalidateQueries(['register']);
    } catch (error) {
      notify({
        types: 'error',
        message: 'Erro ao realizar o cadastro'
      })
    }
  };

  const { mutate: requestBranch, isLoading } = useMutation(formUser)

  const onSubmit = async({
    birthdate, 
    email, 
    lastName, 
    name, 
    password, 
    phone}: CreateUserData) => {
      requestBranch({
        birthdate,
        email,
        lastName,
        name,
        password,
        phone
      })
  }

  const isEditingText = () => {
   const text = isEditing ? "Update Profile" : "Sign Up"

   return text
  }

  return(
    <>
      <FormProvider {...methods}>
        <form className="mt-8 mb-2 ml-8 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-6">
            <Input
              size="lg"
              variant="standard" 
              label="Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} crossOrigin={undefined}     
              {...register("name", { required: errors.name?.message})}     
            />
            <Input
              size="lg"
              variant="standard" 
              label="Last Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} crossOrigin={undefined}
              {...register("lastName", { required: errors.lastName?.message })}
            />
            <Input
              size="lg"
              variant="standard" 
              label="Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} crossOrigin={undefined}         
              {...register("email", { required: errors.email?.message })}
            />
            <Input
              size="lg"
              variant="standard" 
              label="Phone"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} crossOrigin={undefined}
              {...register("phone", { required: errors.phone?.message })}
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
              {...register("birthdate", { required: errors.birthdate?.message })} 
            /> 
            <Input
              type="password" 
              variant="standard"
              size="lg"
              label="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} crossOrigin={undefined}
              {...register("password", { required: errors.password?.message })}
            />
          </div>
          <button type="submit" className="mt-6 bg-black hover:bg-gray-900 w-full text-white py-2 px-4 rounded font-bold">
          {isLoading ? <BeatLoader color="#fffff" size={10} /> : isEditingText() } 
          </button>

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
              <Link to="/login" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography> : <div className="mt-10"></div>
          }
        </form>
      </FormProvider>
    </>
  )
}