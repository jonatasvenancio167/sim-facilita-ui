import { Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../service/apiClient';

type LoginProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Login({setIsAuthenticated}: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleLogin = async () => {      
    try {
      const response = await api.post('login', { email, password })
      const user = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.log('falha na autenticação', error)
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
          <Input 
            variant="standard" 
            label="email" 
            crossOrigin={undefined} 
            onChange={handleEmailChange} 
          />
          <Input 
            type="password" 
            variant="standard" 
            label="Password" 
            crossOrigin={undefined} 
            onChange={handlePasswordChange} 
          />
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
