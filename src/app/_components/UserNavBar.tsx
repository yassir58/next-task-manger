import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import useAuth from "~/hooks/useAuth";
import { ModalProfileWrapper } from "./ui/Modal";
import UserProfile from "./UserProfile";

interface props {}

const UserNavBar: React.FC<props> = ({}) => {
  const { user } = useAuth();
  return (
    <HStack spacing={6} justifyContent={'center'} alignItems='center'>
      <HStack spacing={3} justifyContent={'center'} alignItems='center'>
      <ModalProfileWrapper value='Settings'>
        <UserProfile />
      </ModalProfileWrapper>
      </HStack>
      <Avatar size="md" borderRadius='md' src={user?.profileImage!} name={user?.name} />
    </HStack>
  );
};

export default UserNavBar;
