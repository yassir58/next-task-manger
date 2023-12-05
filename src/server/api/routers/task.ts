import { publicProcedure, router } from "../trpc";
import z from "zod";
export const taskRouter = router({
  getTasks: publicProcedure
    .input(
      z.object({
        boardId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findMany({
        where: { boardId: input.boardId },
      });
    }),
  createTask: publicProcedure
    .input(
      z.object({
        content: z.string(),
        status: z.string(),
        boardId: z.string(),
        coverImage: z.string ()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.create({
        data: {
          content: input.content,
          status: input.status,
          coverImage: input.coverImage,
          board: {
            connect: { id: input.boardId },
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
        boardId: z.string(),
        status: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findMany({
        where: {
          boardId: input.boardId,
          status: input.status,
        },
      });
    }),
  editeTask: publicProcedure
    .input(
      z.object({
        content: z.string(),
        status: z.string(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data:{
            content: input.content,
            status: input.status
        }
      });
    }),
});
