import { HStack, Stack, Avatar, Text, Button } from "@chakra-ui/react";
import { trpc } from "../_trpc/client";
import useAuth from "~/hooks/useAuth";
import toast from "react-hot-toast";

interface props {
  invite: Invite;
}
const Invite: React.FC<props> = ({ invite }) => {
  const { data: owner } = trpc.userRouter.getUserById.useQuery({
    userId: invite?.ownerId!,
  });
  const { data: reciever } = trpc.userRouter.getUserById.useQuery({
    userId: invite?.receiverId!,
  });

  const { data: workspace } = trpc.workspaceRouter.getWorkspaceById.useQuery({
    id: invite?.workspaceId!,
  });
  const utils = trpc.useUtils ()
  const { user } = useAuth();
  const declineInviteMutation = trpc.invitationsRouter.declineInvite.useMutation ({
    onSuccess: () => {
      toast.success ('Invite declined')
      utils.invitationsRouter.invalidate ()
    },
    onError: () => toast.error ('Failed to decline invite')
  })
  const acceptInviteMutation = trpc.invitationsRouter.acceptInvite.useMutation ({
    onSuccess: () => {
      toast.success ('Invite accepted')
      utils.invitationsRouter.invalidate ()
    },
    onError: () => toast.error ('Failed to accept invite')
  })

  const acceptInvite = () => {
    try {
      acceptInviteMutation.mutateAsync ({
        userId: user?.id!,
        workspaceId: workspace?.id!,
        inviteId: invite?.id!
      })
    }
    catch (err: any){
      console.log ('error : ', err)
    }
  }

  const declineInvite = () => {
    try {
      declineInviteMutation.mutateAsync ({
        inviteId: invite?.id!
      })
    }catch (err: any){
      console.log ('error : ', err)
    }
  }

  return (
    <Stack alignItems='center' w='100%' bg='Primary.100' borderRadius={'md'} justifyContent={'center'} px='4' py='2'>
      <HStack spacing={4}>
      <Avatar
        borderRadius='md'
        src={`${
          user?.id! === owner?.id!
            ? reciever?.profileImage!
            : owner?.profileImage!
        }`}
        name={"user"}
        size="md"
      />
        <Text color="veryLightGray.100" fontSize="20px">
        {user?.id! === owner?.id!
              ? `You sent an invitation to join ${workspace?.name!}`
              : `${owner?.name} Sent you an invitation to join ${workspace?.name!}`}
        </Text>
    </HStack>
        <HStack w='100%' justifyContent={"space-between"}>
          <Text fontSize={'sm'} color="gray.500">
           to days ago
          </Text>
          <HStack spacing={3}>
            <Button variant="accept" onClick={acceptInvite}>accept</Button>
            <Button variant="decline" onClick={declineInvite}>decline</Button>
          </HStack>
        </HStack>
      </Stack>
  );
};

export default Invite