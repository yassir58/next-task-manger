import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Avatar
} from "@chakra-ui/react";

import { VscTriangleDown } from "react-icons/vsc";

interface props {
  user: any;
}

const UserNavBar: React.FC<props> = ({ user }) => {
  return (
    <HStack spacing={4}>
      <Avatar size="md" src={""} name={user.name} />
      <Text fontSize="19px" fontWeight={"bold"} color='veryLightGray.100'>
        {user.name}
      </Text>
      <Menu>
        <MenuButton>
          <VscTriangleDown color='veryLightGray.100'/>
        </MenuButton>
        <MenuList bg={"#1A1B1F"} border='none'>
          <MenuItem backgroundColor="#1A1B1F" color="veryLightGray.100" _hover={{bg:'#2A2D32'}} borderRadius={'8px'} w='96%' my={1} >
            View Profile
          </MenuItem>
          <MenuItem backgroundColor="#1A1B1F" color="veryLightGray.100" _hover={{bg:'#2A2D32'}} borderRadius={'8px'} w='96%' my={2} >
            {" "}
            Invitaions{" "}
          </MenuItem>
          <MenuItem backgroundColor="#1A1B1F" color="veryLightGray.100" _hover={{bg:'#2A2D32'}} borderRadius={'8px'} w='96%' my={2} >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default UserNavBar;
