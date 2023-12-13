import { z } from "zod";
import { publicProcedure, router } from "../trpc";

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
    })
})

export default invitationsRouter