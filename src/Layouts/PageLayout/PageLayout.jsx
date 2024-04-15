import React from 'react'
import {Flex  ,Box} from '@chakra-ui/react'
import Sidebar from "../../components/Sidebar"
export const PageLayout = ({children}) => {
  return (
    <Flex>
        {/**Side bar on the left */}
        <Box w={{base:'70px',md:"240px"}}>
            <Sidebar/>
        </Box>
        {/**The page content on the right*/}
        <Box>
            {children}
        </Box>
    </Flex>
  )
}
