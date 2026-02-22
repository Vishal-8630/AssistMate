export const validatePhone = (phone: string): string | null => {
  if (!phone)  
    return "Phone number is required";

  if (!/^\d{10}$/.test(phone)) 
    return "Phone number must be exactly 10 digits";

  return null;
};


export const validateOtp = (otp: string): string | null => {
    if (!otp) 
        return "OTP is required";

    if (!/^\d{6}$/.test(otp))
        return "OTP must be exactly 6 digits";

    return null;
}