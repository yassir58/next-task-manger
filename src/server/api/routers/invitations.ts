import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { InviteFeild } from "~/app/_components/InviteUser";

const invitationsRouter = router ({
    getReceived : publicProcedure.input (z.object({
        id: z.string ()
    })).query (async ({ctx, input}) => {
        return await ctx.prisma.invitation.findMany ({
            where:{
                receiverId: input.id
            }
        })
    }),
    getSent: publicProcedure.input (z.object ({
        id: z.string ()
    })).query (async ({ctx, input}) => {
        return await ctx.prisma.invitation.findMany ({
            where:{
                ownerId: input.id
            }
        })
    }),
    sendInvite: publicProcedure.input (z.object ({
        ownerId: z.string (),
        receiverId: z.string (),
        workspaceId: z.string ()
    })).mutation (async ({ctx, input}) => {
        return await ctx.prisma.invitation.create ({
            data: {
             workspaceId: input.workspaceId,
             receiver: {connect:{id: input.receiverId}},
             owner: {connect:{id:input.ownerId}}
            }
        })
    }),
    acceptInvite: publicProcedure.input (z.object ({
        userId: z.string (),
        workspaceId:z.string (),
        inviteId: z.string ()    

    })).mutation (async ({ctx, input}) => {
        const res =  await ctx.prisma.workspace.update ({
            where:{ id : input.workspaceId},
            data: {
                members :{
                    connect:{
                        id: input.userId
                    }
                }
            }
        })
        await ctx.prisma.invitation.delete ({
            where: {id : input.inviteId}
        })
        return res
    }),
    declineInvite: publicProcedure.input (z.object ({
        inviteId: z.string ()    
    })).mutation (async ({ctx, input}) => {
        return await ctx.prisma.invitation.delete ({
            where: {id : input.inviteId}
        })
    })
})

export default invitationsRouter