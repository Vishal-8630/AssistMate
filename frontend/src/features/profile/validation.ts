import { ProfileFormValues } from "./types";

export const validateProfile = ( values: ProfileFormValues) : string | null => {
    if (!values.firstName.trim()) 
        return "First name is required";

    if (!values.lastName.trim())
        return "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.email && !emailRegex.test(values.email))
        return "Invalid email format";

    return null;
}