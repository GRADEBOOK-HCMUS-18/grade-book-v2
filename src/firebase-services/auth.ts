import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from './config';

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const googleLogin = async () => {
  try {
    const response: any = await signInWithPopup(auth, googleProvider);
    const { user } = response;
    return {
      userName: user.displayName,
      email: user.email,
      imageUrl: user.photoURL,
      firstName: response._tokenResponse.firstName,
      lastName: response._tokenResponse.lastName,
    };
  } catch (err: any) {
    console.log(err.message);
  }
};
