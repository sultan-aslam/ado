import sign from "jwt-encode";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || ""; 
const generateGuestToken = () => {
  const data = { exp: new Date().getTime() + 120000 };
  return sign(data, secret);
};

export const guestToken = generateGuestToken();
