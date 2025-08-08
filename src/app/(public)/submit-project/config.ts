import { z } from 'zod';
import { ELevels } from './types';

export const teamMemberSchema = z.object({
  id: z.string(),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, "Full name can't be more than 100 characters"),
  rollNo: z
    .string()
    .min(12, 'Minimum 12 characters required')
    .max(15, "Roll can't be more than 15 characters")
    .regex(
      /^THA\d{3}[A-Z]{3}\d{3}$/,
      'Roll number must follow format: THAXXXYYYZZZ',
    ),
  photo: z
    .custom<File | null>()
    .refine((file) => !file || file.size <= 2_000_000, 'Max 2MB')
    .refine(
      (file) =>
        !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPG, PNG, or WebP',
    )
    .optional(),
});

export const projectFileSchema = z.object({
  id: z.string(),

  file: z
    .custom<File | null>()
    .refine((file) => file === null || file instanceof File, 'File is required')
    .refine(
      (file) => file === null || file.size <= 5_000_000,
      'Max file size is 5 MB',
    ),
  type: z.enum(['Report', 'Proposal', 'Other Info']).optional(),
});

export const basicInfoSchema = z.object({
  title: z
    .string()
    .min(3, 'Title is required')
    .max(255, 'Title cannot exceed 255 characters'),

  abstract: z
    .string()
    .min(100, { message: 'Minimum 100 characters are required.' })
    .max(500, { message: 'Maximum 500 characters are allowed.' }),
  level: z.enum(Object.keys(ELevels) as [string, ...string[]]),

  batch: z.object({ id: z.number(), year: z.number() }).nullable(),
  department: z.object({ id: z.number(), name: z.string() }).nullable(),
  category: z
    .object({
      id: z.number(),
      name: z.string(),
      projectCount: z.number(),
    })
    .nullable(),

  supervisor: z.string().optional(),
  teamMembers: z
    .array(teamMemberSchema)
    .min(1, 'At least one team member is required'),
});

export const projectDetailsSchema = z.object({
  description: z.string().refine(
    (val) => {
      if (!val) return false;

      // Strip HTML tags and decode common entities (basic)
      const text = val
        .replace(/<[^>]*>?/gm, ' ') // remove HTML tags, keep spaces
        .replace(/&nbsp;/g, ' ') // convert non-breaking spaces to normal spaces
        .trim();

      // Split by whitespace and filter empty strings
      const words = text.split(/\s+/).filter(Boolean);

      return words.length >= 200;
    },
    {
      message: 'Minimum 200 words are required.',
    },
  ),
});

export const technicalDetailsSchema = z.object({
  technologies: z.string().min(1, 'At least one technology'),
  githubUrl: z
    .string()
    .url('Enter a valid GitHub URL')
    .optional()
    .or(z.literal('')),
  documentationUrl: z
    .string()
    .url('Enter a valid Documentation URL')
    .optional()
    .or(z.literal('')),
  files: z.array(projectFileSchema),
});

export const formSchema = basicInfoSchema
  .merge(projectDetailsSchema)
  .merge(technicalDetailsSchema);

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type ProjectFormData = z.infer<typeof formSchema>;
export type ProjectFile = z.infer<typeof projectFileSchema>;

export const STEPS = [
  { id: 1, title: 'Basic Information' },
  { id: 2, title: 'Project Details' },
  { id: 3, title: 'Technical Details' },
  { id: 4, title: 'Review & Submit' },
] as const;

export const FILE_TYPES = ['Report', 'Proposal', 'Other Info'];
