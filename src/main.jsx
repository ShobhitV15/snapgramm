import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'  // Chakra Ui for Enabling better Ui elements
import { extendTheme } from '@chakra-ui/react'     // for enabling color mode 
import {mode} from '@chakra-ui/theme-tools'        // for crafting our own style 
import {BrowserRouter} from 'react-router-dom'     // for routing 

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles={
  global:(props)=>({
    body:{
      bg:mode("gray.100","#000")(props),      // adds the black background
      color:mode("gray.800","whiteAlpha900")(props),
    },
  }),
}

const theme = extendTheme({ config,styles })  // config contains the color mode 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}> {/**Overites passed values for our whole app */}
      <App />
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
