import z from 'zod'

export const authValidationSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
  password: z.string({
    required_error: 'email is required',
    invalid_type_error: 'password should be string',
  }),
})
