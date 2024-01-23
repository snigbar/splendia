import { z } from 'zod'

const userValidationSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
  password: z.string({ required_error: 'password is required' }).min(8).max(20),
  firstName: z.string({ required_error: 'first name is required' }),
  lastName: z.string({ required_error: 'last name is required' }),
})

const userValidations = {
  userValidationSchema,
}

export default userValidations
