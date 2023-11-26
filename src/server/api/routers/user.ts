import { Input } from "postcss";
import { publicProcedure, router } from "../trpc";
import z from 'zod'
export const userRouter = router ({
    getAllUsers: publicProcedure.query (async ({ctx})=>{
        return await ctx.prisma.user.findMany ({});
    }),
    getUserById: publicProcedure.input (z.object({
        userId: z.string ()
    })).query (async ({ctx, input})=>{
        return await ctx.prisma.user.findUnique ({
            where:{id:input.userId}
        })
    })
})