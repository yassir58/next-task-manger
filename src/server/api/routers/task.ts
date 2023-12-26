import { publicProcedure, router } from "../trpc";
import z from "zod";
export const taskRouter = router({
  getTasks: publicProcedure
    .input(
      z.object({
        columnId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findMany({
        where: { columnId: input.columnId },
      });
    }),
  createTask: publicProcedure
    .input(
      z.object({
        content: z.string(),
        status: z.string(),
        columnId: z.string(),
        coverImage: z.string (),
        description:z.string ()

      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.create({
        data: {
          content: input.content,
          status: input.status,
          coverImage: input.coverImage,
          Description:input.description,
          column: {
            connect: { id: input.columnId },
          },
        },
      });
    }),
  deleteTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.delete({
        where: { id: input.id },
      });
    }),
  filterTasksByStatus: publicProcedure
    .input(
      z.object({
        columnId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findMany({
        where: {
          columnId: input.columnId,
        },
      });
    }),
  editeTask: publicProcedure
    .input(
      z.object({
        content: z.string(),
        status: z.string(),
        id: z.string(),
        description:z.string (),
        cover: z.string ()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data:{
            content: input.content,
            status: input.status,
            Description: input.description,
            coverImage:input.cover
        }
      });
    }),
});
