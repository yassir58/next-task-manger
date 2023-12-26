import { publicProcedure, router } from "../trpc";
import z from 'zod'
const columnRoute = router ({
    getAll: publicProcedure.input (z.object ({
        boardId: z.string ()
    })).query (async ({ctx, input})=> {
        return await ctx.prisma.column.findMany ({
            where:{
                boardId:input.boardId
            }
        })
    }),
    createColumn: publicProcedure.input (z.object ({
        title:z.string (),
        color:z.string (),
        boardId:z.string ()
    })).mutation (async ({ctx, input})=> {
        return await ctx.prisma.column.create ({
            data: {
                name:input.title,
                color:input.color,
                board: {
                    connect: {id: input.boardId}
                }
            }
        })
    }),
    deleteColumn: publicProcedure.input (z.object ({
        id: z.string ()
    })).mutation (async ({ctx, input})=> {
        return await ctx.prisma.column.delete ({
            where: {
                id: input.id
            }
        })
    })

})

export default columnRoute