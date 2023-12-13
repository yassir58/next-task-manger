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
    }),
    updateUser: publicProcedure.input (z.object ({
        id: z.string (),
        username: z.string (),
        profileImage: z.string (),
        email:z.string ().email ()
    })).mutation (async ({ctx, input}) => {
        return await ctx.prisma.user.update ({
            where: {
                id: input.id
            },
            data: {
                name: input.username,
                email: input.email,
                profileImage: input.profileImage
            }
        })
    })
})