import React from 'react'
import {Container, Flex, VStack} from '@chakra-ui/react'
import {Box, Image} from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm'

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4} >    {/* main flex containing other flexes*/}
      <Container maxW={"container.md"} padding={0}>
       
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>

           {/**Left side */}
        <Box display={{base:'none',md:'block'}} >   {/** base signifies for smaller screen such as phones 
                                                    md for bigger screen */}
         <Image src="/auth.png" h={500} alt="Phone img" borderRadius={'20px'}/>
        </Box>



              {/**Right side */}
        <VStack spacing={4}  align={"stretch"} minW={'300px'}  >
          <AuthForm/>
        </VStack>

        </Flex>      
      </Container>
    </Flex>
  )
}

export default AuthPage