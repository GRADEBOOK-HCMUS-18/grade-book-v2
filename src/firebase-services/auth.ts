import { signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from './config';

const auth = getAuth(app);

export const socialLogin = async (provider: any) => {
  try {
    const response = await signInWithPopup(auth, provider);
    console.log(response);
    return response;
  } catch (error) {}
};
