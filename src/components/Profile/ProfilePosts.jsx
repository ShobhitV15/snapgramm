import React, { useEffect, useState } from 'react'
import ProfilePost from './ProfilePost'
import { Grid,VStack,Skeleton,Box, useDisclosure } from '@chakra-ui/react'

const ProfilePosts = () => {
  const[isLoading,setLoading]=useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])
  return (
    <Grid templateColumns={{sm:"repeat(1,1fr)",md:"repeat(3,1fr)"}} gap={1} columnGap={1}>
      {isLoading&&[1,2,3,4,5,6].map((_,idx)=>(
        <VStack key={idx} alignItems={'flex-start'} gap={4}> 
        <Skeleton>
          <Box h={'300px'}>
            Contents Wrapped
          </Box>

        </Skeleton>
        </VStack>
      ))}

      {!isLoading &&(
        <>
        <ProfilePost img='img1.png'/>
        <ProfilePost img='img2.png'/>
        <ProfilePost img='img3.png'/>
        <ProfilePost img='img4.png'/>

        
        </>
      )}
    </Grid>
  )
}

export default ProfilePosts