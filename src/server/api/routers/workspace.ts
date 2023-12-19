import { z } from "zod";
import { publicProcedure, router } from "../trpc";


const workspaceRouter = router ({
    getAll: publicProcedure.input (z.object ({
        userid: z.string ()
    })).query (async ({ctx, input})=>{
        const userWorkspaces = await ctx.prisma.workspace.findMany ({
            where: {
                ownerId: input.userid!
            }
        })
        const userJoinedWorkspaces = await ctx.prisma.workspace.findMany({
            where: {
              members: {
                some: {
                    id: input.userid!, // Replace this with the actual user ID you are searching for
                },
              },
            },
          });
        return [...userWorkspaces, ...userJoinedWorkspaces]
    }),
    newWorkspace: publicProcedure.input (z.object ({
        ownerId: z.string (),
        name: z.string (),
        cover: z.string (),
        visibility: z.string ()
    })).mutation (async ({ctx, input})=>{
        return await ctx.prisma.workspace.create ({
            data: {
                name: input.name,
                image: input.cover,
                visibility: input.visibility,
                ownerId:input.ownerId
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