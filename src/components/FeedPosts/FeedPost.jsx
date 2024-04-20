import React from 'react'
import { Box , Image} from '@chakra-ui/react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
const FeedPost = ({img,username,avatar}) => {
  return (
    <div>
        <PostHeader username={username} avatar={avatar}>

        </PostHeader>
        <Box my={2} borderRadius={20} overflow={'hidden'}>
            <Image src={img} alt={username}></Image>
        </Box>
        <PostFooter username={username} ></PostFooter>
    </div>
  )
}

export default FeedPost