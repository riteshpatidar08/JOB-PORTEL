import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  role: z.enum(['jobseeker', 'recruiter'], 'Select a valid role'),
  degree: z.string().optional(),
  institution: z.string().optional(),
  year: z
    .number({ invalid_type_error: 'Year must be a number' })
    .positive('Year must be positive')
    .optional(),
  company: z.string().optional(),
  duration: z
    .number({ invalid_type_error: 'Duration must be a number' })
    .nonnegative('Duration must be non-negative')
    .optional(),
  jobRole: z.string().optional(),
  skills: z.string().optional(),
  resume: z
    .any()
    .refine(
      (file) =>
        file &&
        file.length > 0 &&
        [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file[0]?.type),
      {
        message: 'Resume must be a .pdf or .docx file',
      }
    )
    .optional(),
  companyName: z.string().optional(),
  companyWebsite: z.string().url('Invalid URL format').optional(),
});

export default SignupSchema;
