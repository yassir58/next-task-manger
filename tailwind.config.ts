import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import { withUt } from "uploadthing/tw";
 
export default withUt({
  // Your existing Tailwind config
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: 'class', 
  theme: {
    colors:{
      'transparent':'transparent',
      'white':'#ffffff',
      'black' : '#000112',
      'veryDarkGray':'#20212C',
      'darkGray':'#2B2C37',
      'lines':'#E4EBFA',
      'mediumGray':'#828FA3',
      'lightGray':'#F4F7FD',
      'mainPurple':'#635FC7',
      'secondaryPurple':'#A8A4FF',
      'mainRed':'#EA5555',
      'secondaryRed':'#FF9898'
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}) satisfies Config;

