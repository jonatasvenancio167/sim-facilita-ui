import {
  Card,
  Typography,
} from "@material-tailwind/react";
import { Form } from "../../components/form";
import { Upload } from "../../components/upload";
import { ImageProfile } from "../../components/imageProfile";
import { useState } from "react";

export function Register() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (file: File) => {
    setSelectedImage(file);
  };

  return(
    <div className="md:container md:mx-auto">
      <Card className="mt-6 w-full">
        <div className="flex justify-between">
          <div className="ml-60">
           <ImageProfile selectedImage={selectedImage} />
            <Upload onFileChange={handleImageChange} />
          </div>
          <div className="mr-10">
            <Typography variant="h4" className="ml-8" color="gray">
              SIGN UP
            </Typography>
            <Typography color="gray" className="mt-1 ml-8 font-normal">
              Nice to meet you! Enter your details to register.
            </Typography>
            <Form/>
          </div>
        </div>
      </Card>
    </div>
  )
}