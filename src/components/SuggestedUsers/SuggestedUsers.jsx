import { VStack, Flex, Text, Box, Link } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUser'

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

	// optional: render loading skeleton
	if (isLoading) return null;
  return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader/>
        {suggestedUsers.length !== 0 && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested for you
					</Text>
				</Flex>
			)}

        {suggestedUsers.map((user) => (
				<SuggestedUser user={user} key={user.id} />
			))}
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