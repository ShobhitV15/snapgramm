import React from 'react'
import { Flex, AvatarGroup,Avatar,VStack,Text,Button,} from '@chakra-ui/react'

const ProfileHeader = () => {
  return (
   <Flex gap={{base:10,sm:10}} py={10} direction={{base:"column",sm:'row'}} pl={20}>
    <AvatarGroup size={{base:"xl",md:"2xl"}} justifySelf={'center'} alignSelf={'self-start'} mx={'auto'}>
      <Avatar name='artist_1' src='/profilepic.png' alt="profile img">

      </Avatar>
    </AvatarGroup>


    <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>

      <Flex gap={4} direction={{base:"column",sm:'row'}} justifyContent={{base:'center',sm:'flex-start'}} alignItems={'center'} w={'full'}>

        <Text fontSize={{base:"sm,md:lg"}}>
          Artist_1
        </Text>

        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>

          <Button bg={'white'} color={'black'} _hover={{bg:"whiteAlpha.800"}} size={{base:'xs',md:'sm'}}> 
          Edit Profile

          </Button>

        </Flex>
      </Flex>

      <Flex alignItems={'center'} gap={{base:2,sm:4}}>
        <Text fontSize={{base:'xs',md:'sm'}}>
          <Text as="span" fontWeight={"bold"} mr={1} > 4 </Text>
          Posts
        </Text>

        <Text fontSize={{base:'xs',md:'sm'}}>
          <Text as="span" fontWeight={"bold"} mr={1} > 149 </Text>
          Followers
        </Text>

        <Text fontSize={{base:'xs',md:'sm'}}>
          <Text as="span" fontWeight={"bold"} mr={1} > 49 </Text>
          Following
        </Text>

      </Flex>

      <Flex alignItems={'center'} gap={4}>
        <Text fontSize={"sm"} fontWeight={'bold'}> Artist_1</Text>

      </Flex>

      <Text fontSize={'sm'}>Bio</Text>

    </VStack>

   </Flex>
  )
}

export default ProfileHeader