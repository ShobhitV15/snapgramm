import React from 'react'
import {Box , Button, Flex, Tooltip} from "@chakra-ui/react"
import { Link , Avatar } from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import { CreatePostLogo, InstagramLogo , InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
import {AiFillHome } from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"
import useLogout from '../../hooks/useLogout'



const Sidebar = () => {

    const sidebarItems=[
        {
            icon:< AiFillHome size={25}/>,
            text: 'Home',
            link: "/home"
        },
        {
            icon:<SearchLogo/>,
            text:"Search",
        },
        {
            icon:<NotificationsLogo/>,
            text:"Notifications",
        },
        {
            icon:<CreatePostLogo/>,
            text:"Create"
        },
        {
            icon:<Avatar size={"sm"} name='S V' src='profilepic.png'/>,
            text:"Profile",
            link:"/asapogrammer"
        }
    ]

   const{handleLogout,isLoggingOut}=useLogout()

  return (
    <Box height={"100vh"}
    borderRight={"1px solid"}
    borderColor={"whiteAlpha.300"}
    py={8}
    position={"sticky"}
    top={0}
    left={0}
    px={{base:2,md:4}}>

        <Flex direction={"column"} gap={10} w="full" height={"full"}>
            <Link to={"/home"} as={RouterLink} pl={2} display={{base:'none',md:'block'}} cursor="pointer" > 
                                                                    {/**We did this so that
                                                                    we can style our Link component 
                                                                    to use proprty of route 'to'    */}
            <InstagramLogo/>



            </Link>

            <Link to={"/home"} as={RouterLink} p={2} display={{base:'block',md:'none'}}
            borderRadius={6}
            _hover={{
                bg:"whiteAlpha.200"
            }}
            w={10}
             cursor="pointer" > 
                                    
            <InstagramMobileLogo/>
            </Link>


            <Flex direction={"column"} gap={5} cursor={"pointer"}>
                {sidebarItems.map((item,index)=>{
                   return ( <Tooltip
                    key={index}
                    hasArrow
                    label={item.text}
                    placement='right'
                    ml={1}
                    openDelay={500}
                    display={{base:'block',md:"none"}}>

                        <Link
                        display={'flex'}
                        to={item.link|| null}
                        as={RouterLink}
                        alignItems={'center'}
                        gap={4}
                        _hover={{bg:"whiteAlpha.400"}}
                        borderRadius={6}
                        p={2}
                        w={{base:10,md:'full'}}
                        justifyContent={{base:"center",md:"flex-start"}}
                        >
                            {item.icon}
                            <Box display={{base:"none",md:"block"}}> 
                            {item.text}
                            </Box>

                        </Link>
                    
                    </Tooltip>
                   )
                })}
            </Flex>

            {/** LOG OUT  */}


            <Tooltip
                    hasArrow
                    label={"LogOut"}
                    placement='right'
                    ml={1}
                    openDelay={500}
                    display={{base:'block',md:"none"}}>

                        <Flex
                        onClick={handleLogout}
                        alignItems={'center'}
                        gap={4}
                        _hover={{bg:"whiteAlpha.400"}}
                        borderRadius={6}
                        p={2}
                        w={{base:10,md:'full'}}
                        mt={'auto'}
                        justifyContent={{base:"center",md:"flex-start"}}
                        >
                            <BiLogOut size={25}/>
                            <Button variant={'ghost'} _hover={{bg:"transparent"}} isLoading={isLoggingOut} display={{base:"none",md:"block"}}> 
                            LogOut
                            </Button>

                        </Flex>
                    
                    </Tooltip>

        </Flex>

    </Box>
  )
}

export default Sidebar