import { Container, VStack, Flex, SkeletonCircle, Skeleton, Box} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'

const FeedPosts = () => {
    const[isLoading,setLoading]=useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },2000)
    },[])
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
        {true && [0,1,2,3,4].map((_,idx)=>{
            <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
                <Flex gap={2}>
                    <SkeletonCircle size={10}/>
                    <VStack gap={10} alignItems={"flex-start"}>
                        <Skeleton height='10px' w={"200px"}/>
                        <Skeleton height='10px' w={"200px"}/>
                    </VStack>
                </Flex>
                <Skeleton w={'full'}>
                    <Box h={"500px"} >
                        content Wrapped
                    </Box>
                </Skeleton>
            </VStack>
        })}
        {!false && (
            <>
            <FeedPost img='/img1.png' username='artist_1' avatar='/img1.png'/>
            <FeedPost img='/img2.png' username='artist_2' avatar='/img2.png'/>
            <FeedPost img='/img3.png' username='artist_3' avatar='/img3.png'/>
            <FeedPost img='/img4.png' username='artist_4' avatar='/img4.png'/>
            </>
        ) }
    </Container>
  )
}

export default FeedPosts