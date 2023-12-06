import { ComponentStyleConfig, defineStyleConfig, extendTheme } from "@chakra-ui/react";


const Primary = {
    10:"#1A1A1F",
    50:"#1A1A1F",
    100:"#1A1A1F"
}

const LightGray = {
  10:'#2A2D32',
  20:'#2A2D32',
  100:'#2A2D32'
}
const Secondary = {
  10:'#C6C3BC',
  50:'#C6C3BC',
  100:'#C6C3BC'
}

const DarkBlue = {
  10:'#3C56B1',
  50:'#3C56B1',
  100:'#3C56B1'
}

const LighBlue = {
  10:'#C3DAFA',
  50:'#C3DAFA',
  100:'#C3DAFA'
}

const veryLightGray ={
  10:'#DAD4CD',
  50:'#DAD4CD',
  100:'#DAD4CD'
}

const MenuItemStyle = defineStyleConfig ({
  baseStyle:{
    backgroundColor:'#2A2D32',
      color:'secondary'
  },
  variants :{
    default: {
      backgroundColor:'#2A2D32',
      color:'secondary'

    } 
  }
})

const MenuList = defineStyleConfig ({
  baseStyle:{
    border:'none'
  }
})

const InputStyle:ComponentStyleConfig ={
  baseStyle:{

  }, 
  variants: {
    regular: {
      field: {
        w:'100%',
        bg:'rgba(255, 255, 255, 0.1)',
        border:'1px',
        color:'#D6E4FC',
        px:'6px', 
        py:'4px',
        borderColor:'gray.500',
        _placeholder:{
          color:'gray.500', 
          fontSize:'sm'
        }
      }

    }
  }
}
const ButtonStyle = defineStyleConfig ({
  baseStyle:{

  },
  variants:{
    regular: {
      borderRadius:'8px',
      background:'LightBlue',
      color:'blue.600',
      borderColor:'blue.600',
      fontSize:'12px',
      border:'1px',
      _hover:{
        opacity:0.8,
      }, 
    },
    action: {
      borderRadius:'full',
      px:'4px',
      py:'2px',
      color:'veryLightGray.100',
      fontSize:'16px',
      w:'98%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      _hover: {
        opacity:0.8,
      }
    },
    lightGhost: {
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      color:'veryLightGray.100',
      fontSize:'14px',
      border:'1px',
      borderColor:'rgba(255, 255, 255, 0.1)',
      bg:'rgba(255, 255, 255, 0.1)',
      px:'8px',
      _hover: {
        borderColor:'veryLightGray.100'
      }
    }
  }
})
const theme = extendTheme({
    breakpoints: {
      // Define your custom breakpoint here
      xl: "1440px", // Adjust the value as needed
      vl: "1620px",
    },
    styles: {
      global: {
        body: {
          bg: "#252932",
          mx: "auto",
        },
      },
    },
    colors: {
      Primary,
      Secondary,
      DarkBlue,
      LighBlue,
      LightGray,
      veryLightGray
      
    },
    components: {
      MenuItem:MenuItemStyle,
      MenuList:MenuList,
      Button:ButtonStyle,
      Input:InputStyle
    }
    },
  );

  
  
  export default theme;