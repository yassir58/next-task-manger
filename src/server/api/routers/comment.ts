
import { z } from "zod"
import { router, publicProcedure } from "../trpc"


export const commentRouter = router ({
    getAll: publicProcedure.input (z.object ({
        taskId: z.string (),
    })).query (async ({ctx, input}) =>{
        return await ctx.prisma.comment.findMany ({
            where:{
                taskId: input.taskId
            }
        })
    }),
    createComment: publicProcedure.input (z.object ({
        taskId: z.string (),
        userId: z.string (),
        content :z.string ()
    })).mutation (async ({ctx, input}) =>{ 
        return await ctx.prisma.comment.create ({
            data:{
                content: input.content,
                userId: input.userId,
                task: {connect : {id: input.taskId}}
            }
        })
    }),
    editComment: publicProcedure.input (z.object ({
        id: z.string (),
        content: z.string ()
    })).mutation (async ({ctx, input})  =>{
        return await ctx.prisma.comment.update ({
            where: {
                id: input.id
            },
            data : {
                content: input.content
            }
        })
    }),
    deleteComment: publicProcedure.input (z.object ({
        id: z.string ()
    })).mutation (async ({ctx, input}) => {
        return await ctx.prisma.comment.delete ({
            where : {
                id : input.id
            }
        })
    })

})
