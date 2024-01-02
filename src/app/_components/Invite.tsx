import { trpc } from "../_trpc/client";
import useAuth from "~/hooks/useAuth";
import toast from "react-hot-toast";
import Avatar from "./ui/Avatar";

interface props {
  invite: Invite;
  received:boolean
}
const Invite: React.FC<props> = ({ invite, received }) => {
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
    <div className='flex flex-col gap-2 rounded-md bg-lines/30 px-2 py-4'>
      <div className='flex justify-start gap-4'>
      <Avatar
        image={`${
          user?.id! === owner?.id!
            ? reciever?.profileImage!
            : owner?.profileImage!
        }`}
        name={"user"}
      />
        <p className='text-sm text-veryDarkGray'>
        {user?.id! === owner?.id!
              ? `You sent an invitation to join ${workspace?.name!}`
              : `${owner?.name} Sent you an invitation to join ${workspace?.name!}`}
        </p>
    </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-xs text-mediumGray">
           to days ago
          </p>
          {received ? <div className='flex gap-4'>
            <button className="btn-accept" onClick={acceptInvite}>accept</button>
            <button className="btn-decline" onClick={declineInvite}>decline</button>
          </div> : ''}
        </div>
      </div>
  );
};

export default Invite