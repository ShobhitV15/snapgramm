import React from 'react'
import {Flex  ,Box} from '@chakra-ui/react'

import {useLocation} from "react-router-dom"
import Sidebar from '../../components/Sidebar/Sidebar'

//instead of adding side bar to every page, we add it only once to PageLayout component and wrap the children with it.
// This way we can have a side bar to every page except auth page.

 const PageLayout = ({children}) => {

    const {pathname}=useLocation() // it gives us the current path of the page

  return (
    <Flex>


        {/**Side bar on the left */}
        {pathname!=='/auth' ? (           // the side bar is only visible when we arn't on auth page
        <Box w={{base:'70px',md:"240px"}}> 
            <Sidebar></Sidebar>
        </Box>
        ):null}
        


        {/**The page content on the right*/}
        <Box flex={1} w={{base:"calc(100%-70px)",md:"100%-240px"}}>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout;
