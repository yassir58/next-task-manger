import { extendTheme } from "@chakra-ui/react";


const Primary = {
    10:"#04061A",
    50:"#04061A",
    100:"#04061A"
}
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
      Primary
      
    },
    },
  );
  
  export default theme;