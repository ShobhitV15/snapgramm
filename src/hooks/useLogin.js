import React from 'react'
import useShowToast from './useShowToast'
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useAuthStore from '../store/authStore';

const useLogin = () => {
 const showToast=useShowToast();
 const [
    signInWithEmailAndPassword,
    ,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const loginUser=useAuthStore((state)=>state.login)



  const login=async(inputs)=>{

    if(!inputs.email||!inputs.password){
        return showToast('error',error.message,'error')
    }
    try {
        const userCred= await signInWithEmailAndPassword(inputs.email,inputs.password)

        const docRef= doc(firestore,'users',userCred.user.uid);
        const docSnap=await getDoc(docRef)
        localStorage.setItem('user-info',JSON.stringify(docSnap.data()))
        loginUser(docSnap.data())
        
        console.log("Login successfully")
        
    } catch (error) {
        showToast('error',error.message,'error')
    }
  }
  return {loading,error,login}
}

export default useLogin