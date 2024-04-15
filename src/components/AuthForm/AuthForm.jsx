import {Box, Button, Input, VStack, Image, Flex ,Text} from '@chakra-ui/react'
import { color } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthForm = () => {
    const [isLogin, setIsLogin]=useState(true)

    const [inputs,setInputs]=useState({
        email:'',
        password:'',
        confirmPassword:''
    })

    const navigate=useNavigate();

    const handleAuth=()=>{
        if(!inputs.email || !inputs.password){
        alert("Please Fill the details")
        return
        }
        navigate('/home')  // when the login or sign up button is clicked this fucntion triggers and navigate us to the home page
    }
  return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src='/logo.png' h={24} cursor={"pointer"} alt="Instagram logo"/>

            <Input placeholder='Email' type='email' fontSize={14}
             value={inputs.email}
             onChange={(e)=>
                setInputs({...inputs,email : e.target.value}) 
             }/>

            <Input placeholder='Password' type='password' fontSize={14}
            value={inputs.password}
            onChange={(e)=>setInputs({...inputs,password : e.target.value})}/>

            {!isLogin ? <Input placeholder=' Confirm Password'
            value={inputs.confirmPassword}
            onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
            type='password' fontSize={14}/>: null}  {/**For sign up input  */}

            <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} onClick={handleAuth}>
                {isLogin ? "Log In": "Sign Up"}
            </Button>


            {/**------OR------- */}

            <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                <Box flex={2} h={"1px"} bg={"gray.400"}/>
                <Text mx={1} color={'white'}>
                    OR
                </Text>
                <Box flex={2} h={"1px"} bg={"gray.400"}/>
            </Flex>

            <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}> 
                <Image src='/google.png' w={5} alt='Google Logo'/>
                <Text mx="2" color={"blue.500"}>Log in With Google</Text>
            </Flex>

        </VStack>
    </Box>



    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
            <Box mx={2} fontSize={14}>
                {isLogin ? "Don't have an account": "Already have an Account"}
            </Box>
            <Box onClick={()=>{                 // Onclick sign up opens
                setIsLogin(!isLogin)
            }} color={'blue.500'} cursor={'pointer'}> 
                {isLogin ? "Sign Up": "Log In"}
            </Box>
        </Flex>
    </Box>
    </>
  )
}

export default AuthForm