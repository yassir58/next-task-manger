import z from 'zod'
import { publicProcedure, router } from '../trpc'


const subtaskRouter = router ({
    getAll: publicProcedure.input (z.object ({
        taskId: z.string ()
    })).query (async ({ctx, input}) => {
        return await ctx.prisma.subTask.findMany ({
            where: {
                taskId: input.taskId
            }
        })
    }),
    createSubtask: publicProcedure.input (z.object ({
        taskId: z.string (),
        content: z.string (),
        done: z.boolean ()
    })).mutation (async ({ctx, input}) => {
        return await ctx.prisma.subTask.create ({
            data: {
                content: input.content,
                done: input.done,
                task:{connect:{id: input.taskId}}
            }
        })
    }),
    deleteSubtask: publicProcedure.input (z.object ({
        id: z.string ()
    })).mutation (async ({ctx, input})=>{
        return  await ctx.prisma.subTask.delete ({
            where: {
                id: input.id
            }
        })
    }),
    editeSubtask: publicProcedure.input (z.object ({
        content: z.string (),
        done: z.boolean (),
        id: z.string ()
    })).mutation (async ({ctx, input}) =>{
        return ctx.prisma.subTask.update ({
            where: {
                id: input.id
            },
            data:{
                content: input.content,
                done: input.done
            }
        })
    })
})

export default subtaskRouter