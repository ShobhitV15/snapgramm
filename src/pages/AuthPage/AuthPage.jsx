import React from 'react'
import {Container, Flex, VStack} from '@chakra-ui/react'
import {Box, Image} from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm'

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        {/**Left side */}
        <Box display={{base:'none',md:'block'}}>   {/** base signifies for smaller screen such as phones 
                                                    md for bigger screen */}
         <Image src="/auth.png" h={650} alt="Phone img"/>
        </Box>

        {/**Right side */}
        <VStack spacing={4} align={"stretch"}>
          <AuthForm/>
        </VStack>
      </Container>
    </Flex>
  )
}

export default AuthPage