import { z } from "zod";

const formValidation = z.object({
  name: z.string().nonempty({ 
    message: 'Nome não pode ficar em branco'
  }),
  lastName: z.string().nonempty(),
  email: z.string().nonempty(),
  phone: z.string().min(11, 'Número de telefone inválido').nonempty(),
  birthdate: z.string().nonempty(),
  password: z.string().nonempty()
})

export { formValidation }
