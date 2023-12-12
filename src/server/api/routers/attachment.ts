import { z } from "zod";
import { publicProcedure, router } from "../trpc";


const attachmentRouter = router ({
    getAll: publicProcedure.input (z.object ({
        taskId: z.string (),
    })).query (async ({ctx, input}) =>{
        return await ctx.prisma.attachement.findMany ({
            where:{taskId: input.taskId}
        })
    }),
    createAttachment:publicProcedure.input (z.object ({
        taskId: z.string (),
        name: z.string (),
        path: z.string ()
    })).mutation (async ({ctx, input}) => {
        return await ctx.prisma.attachement.create ({
            data:{
                name: input.name,
                path:input.path,
                task:{connect:{id: input.taskId}}
            }
        })
    }),
    deleteAttachment: publicProcedure.input (z.object ({
        id: z.string ()
    })).mutation (async ({ctx, input}) => {
        return await ctx.prisma.attachement.delete ({
            where:{id: input.id}
        })
    })
})

export default attachmentRouter