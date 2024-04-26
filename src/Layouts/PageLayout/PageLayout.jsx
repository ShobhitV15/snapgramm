import React from 'react'
import {Flex  ,Box, Spinner} from '@chakra-ui/react'

import {useLocation} from "react-router-dom"
import Sidebar from '../../components/Sidebar/Sidebar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import Navbar from '../../components/Navbar/Navbar'

//instead of adding side bar to every page, we add it only once to PageLayout component and wrap the children with it.
// This way we can have a side bar to every page except auth page.

 const PageLayout = ({children}) => {

    const {pathname}=useLocation() // it gives us the current path of the page

    const [user, loading] = useAuthState(auth);  // here the user holds null if we are not in log in state 

    const canRenderSideBar= pathname!== '/auth' && user;  // helps us avoid the flickering effect when we try to go to home page 

    const canRenderNavbar=!user && !loading && pathname !=='/auth';

    const checkingUserAuth= !user && loading;
    if(checkingUserAuth ) return <PageLayoutSpinner/>  // if the internet is slow loading time is taking too much it would add the spinner loading effect to it



  return (
    <Flex flexDirection={canRenderNavbar ? 'column': 'row'}>


        {/**Side bar on the left */}
        {canRenderSideBar? (           // the side bar is only visible when we arn't on auth page
        <Box w={{base:'70px',md:"240px"}}> 
            <Sidebar></Sidebar>
        </Box>
        ):null}


        {/** Navbar if we are not logged in */}

        {canRenderNavbar ? <Navbar/> : null}
        


        {/**The page content on the right*/}
        <Box flex={1} w={{base:"calc(100%-70px)",md:"calc(100%-240px)"}} mx={'auto'}>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout;

const PageLayoutSpinner =()=>{
  return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
}