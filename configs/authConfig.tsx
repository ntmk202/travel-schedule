import { createUserWithEmailAndPassword, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "@/configs/FirebaseConfig"; // Adjust according to your Firebase config structure
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean | undefined;
  signup: (email: string, password: string, username: string, avatar: string | null) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (email:string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  updateUserData: (userId: string) => Promise<any>;
}

interface User {
  email: string;
  username: string;
  avatar: string | null;
  userId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => { 
      if (user) {
        setIsAuthenticated(true);
        setUser(user)
        await updateUserData(user.uid); 
        
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsubscribe;
  }, []); 

  const updateUserData = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser((prevUser:any) => ({
        ...prevUser,        
        username: data.username, 
        avatar: data.avatar
      }));
    } else {
      console.log("No such document!");
      return null; 
    }
  };

  const signup = async (email: string, password: string, username: string, avatar: string | null): Promise<void> => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential?.user);

        await setDoc(doc(db, "users", userCredential.user.uid), {
            email: userCredential?.user?.email,
            username,
            avatar,
            userId: userCredential?.user?.uid
        })
        console.log('signed up', userCredential?.user)
    }catch(e:any){
        console.log('Error sign up',e.messege)
    }
  };

  const signin = async (email: string, password: string): Promise<void> => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
        console.log('signed in')
    }catch(e:any){
        console.log('Error sign in',e.message)
    }
  };

  const logout = async (): Promise<void> => {
    try{
        await signOut(auth);
        // setUser(null);
        // setIsAuthenticated(false);
        console.log("User signed out!")
    }catch(e:any){
        console.error("Error signing out:", e.message);
    }
  };

  const verifyEmail = async (email:string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password recovery email has been sent");
      } catch (error:any) {
        console.error("Email verification failed", error.message);
      }
  }

  const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
    const user = auth.currentUser;
    if (!user) return;

    const credential = EmailAuthProvider.credential(user.email!, oldPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      console.log('Password updated successfully');
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup, signin, logout, verifyEmail, changePassword, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
