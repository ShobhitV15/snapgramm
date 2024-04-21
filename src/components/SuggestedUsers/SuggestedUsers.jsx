import { VStack, Flex, Text, Box, Link } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader/>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={'full'}>
            <Text fontSize={12} fontWeight={"bold"} color={"grey.500"}>
                Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={"bold"} _hover={{color:"blue.400"}} cursor={"pointer"}>
                See All
            </Text>

        </Flex>

        <SuggestedUser name='artist_a' followers={200} avatar='https://bit.ly/dan-abramov' />
        <SuggestedUser name='artist_a' followers={200} avatar='https://bit.ly/dan-abramov'/>
        <SuggestedUser name='artist_a' followers={200} avatar='https://bit.ly/dan-abramov'/>
        <Box
        fontSize={12} color={"gray.500"} mt={5} alignSelf={'start'}
        >
            © 2024 built by {" "}
            <Link href='https://github.com/ShobhitV15' target='blank' color={"blue.500"} fontSize={14}>
              Shobhit
            </Link>
        </Box>
    </VStack>
  )
}

export default SuggestedUsers