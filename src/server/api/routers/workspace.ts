import { z } from "zod";
import { publicProcedure, router } from "../trpc";


const workspaceRouter = router ({
    getAll: publicProcedure.input (z.object ({
        userid: z.string ()
    })).query (async ({ctx, input})=>{
        return await ctx.prisma.workspace.findMany ({
            where: {
                ownerId: input.userid!
            }
        })
    }),
    newWorkspace: publicProcedure.input (z.object ({
        ownerId: z.string (),
        name: z.string (),
        cover: z.string (),
        visibility: z.string ()
    })).mutation (async ({ctx, input})=>{
        return await ctx.prisma.workspace.create ({
            data: {
                owner:{connect:{id: input.ownerId}},
                name: input.name,
                image: input.cover,
                visibility: input.visibility
            }
        })
    }),
    getWorkspaceById: publicProcedure.input (z.object ({
        id: z.string ()
    })).query (async ({ctx, input})=>{
        return await ctx.prisma.workspace.findUnique ({
            where:{
                id: input.id
            }
        })
    }),
    deleteWorkspace: publicProcedure.input (z.object ({
        id: z.string ()
    })).mutation (async ({ctx, input}) =>{
        return await ctx.prisma.workspace.delete ({
            where:{
                id: input.id
            }
        })
    })
})

export default workspaceRouter