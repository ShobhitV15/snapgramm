// for sign up with email and password
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React from 'react'
import { auth, firestore } from '../firebase/firebase'

import { doc, setDoc } from 'firebase/firestore';
import useShowToast from './useShowToast';

const useSignUp = () => {
    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth)

      const showToast=useShowToast();

      const signup=async(inputs)=>{
        if(!inputs.email||!inputs.username||!inputs.password||!inputs.fullName){
          showToast('Error','Please fill all the fields','error')
        return
      }try{
        const newUser=await createUserWithEmailAndPassword(inputs.email,inputs.password)
        console.log("User SignUp successfull")

        if(!newUser&&error){
          console.log('Show Toast')
          showToast('Error',error.message,'error')
          return
        }

        if(newUser){
          console.log("About to create the user")
          const userDoc={
            uid: newUser.user.uid,
            email:inputs.email,
            username:inputs.username,
            fullName:inputs.fullName,
            bio:"",
            profilePicURL:"",
            followers:[],
            following:[],
            posts:[],
            createdAt:Date.now()
          };
          await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
          localStorage.setItem("user-info",JSON.stringify(userDoc))
          console.log("hitting the firsestore data base")
        }

      }catch(error){
        console.log(error)
        showToast('Error',error.message,'error')
      }
    }


  return {loading,error,signup }
}

export default useSignUp