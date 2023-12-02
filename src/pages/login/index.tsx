import { Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type LoginProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Login({setIsAuthenticated}: LoginProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: 'john.doe@example.com',
    password: 'senha123',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleLogin = () => {      
    const mockUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      phoneNumber: '+1 123-456-7890',
      email: 'john.doe@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    };

    if (formData.email === mockUser.email && formData.password === 'senha123') {
      localStorage.setItem('user', JSON.stringify(mockUser));

      setIsAuthenticated(true);

      navigate('/');
    } else {
      console.error('Falha na autenticação');
    }
  };
  
  return (
    <div className="flex justify-center items-center">
      <Card className="mt-6 w-96">
        <CardBody>
        <Typography
          variant="h3"
          color="gray"
          className="mb-6 flex justify-center"
        >
          Sim Facilita 
        </Typography>
        <div className="flex w-72 flex-col gap-6">
          <Input variant="standard" label="email" crossOrigin={undefined} />
          <Input type="password" variant="standard" label="Password" crossOrigin={undefined} />
        </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="grid grid-cols-2 gap-4 content-end">
            <Button onClick={handleLogin}>Sign in</Button>
            <Link to="/register">
              <Button variant="outlined">Sign up</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
