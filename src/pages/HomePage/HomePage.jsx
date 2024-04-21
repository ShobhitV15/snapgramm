import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import FeedPosts from '../../components/FeedPosts/FeedPosts'
<<<<<<< HEAD
=======
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers'
>>>>>>> bbc61d0 (Fifth commit SuggestedUser Added)

const HomePage = () => {
  return (
   <Container maxW={"container.lg"}>
    <Flex gap={20}>
      <Box flex={2} py={10} >
        <FeedPosts/>
      </Box>
      <Box flex={3} mr={20}
<<<<<<< HEAD
      display={{base:'none',lg:"block"}} maxW={"300px"} border={"1px solid red"}>
        Suggested user
=======
      display={{base:'none',lg:"block"}} maxW={"300px"} >
        <SuggestedUsers/>
>>>>>>> bbc61d0 (Fifth commit SuggestedUser Added)
      </Box>
    </Flex>
   </Container>
  

  )
}

export default HomePage