import { publicProcedure, router } from "../trpc";
import z from 'zod'
export const taskRouter= router ({
    getTasks: publicProcedure.input(z.object ({
        boardId: z.string ()
    })).query (async ({ctx, input})=>{
        return await ctx.prisma.task.findMany ({
            where:{boardId:input.boardId}
        })
    }),
    createTask: publicProcedure.input(z.object({
        content: z.string (),
        status:  z.string (),
        boardId: z.string ()
    })).mutation (async ({ctx, input})=>{
        return await ctx.prisma.task.create ({
            data:{
                content:input.content,
                status:input.status,
                board: {
                    connect: {id: input.boardId}
                }
            }
        })
    }),
    deleteTask: publicProcedure.input (z.object ({
        id: z.string ()
    })).mutation (async ({ctx, input})=>{
        return await ctx.prisma.task.delete ({
            where: {id:input.id}
        })
    })
})