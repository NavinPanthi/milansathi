import { z } from "zod";

export const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const signupFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Firstname is required" })
    .min(3, { message: "Firstname must be at least 3 char long" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .min(3, { message: "Last name must be at least 3 char long" }),
  maritalStatusId: z.number().positive("Marital Status is required"),
  gender: z.string().min(1, { message: "Gender is required" }),
  dateOfBirth: z.date().refine(
    (value) => {
      const ageDifMs = Date.now() - value.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= 18; // Return true if age is greater than or equal to 18
    },
    {
      message: "You should be at least 18 years old",
    }
  ),
  religionId: z.number().positive("Religion is required"),
  cityId: z.number().positive("City is required"),
  countryId: z.number().positive("Country is required"),
  motherTongueId: z.number().positive("Mother Tongue is required"),
  communityId: z.number().positive("Community is required"),

  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8)
    .refine((value) => value.length >= 8, {
      message: "Password must be at least 8 char long",
    }),
});
