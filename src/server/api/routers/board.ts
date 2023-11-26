import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const boardRouter = router({
  getBoards: publicProcedure
    .input(
      z.object({
        userid: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.board.findMany({
        where: { userId: input.userid },
      });
    }),
  getBoardById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.board.findUnique({
        where: { id: input.id },
      });
    }),
  createBoard: publicProcedure
    .input(
      z.object({
        userid: z.string(),
        boardName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newBoard = {
        name: input.boardName,
      };
      const createdBoard = await ctx.prisma.board.create({
        data:{
          ...newBoard,
          user:{connect:{id: input.userid}}
        },
      });
      return createdBoard;
    }),
    deleteBoard: publicProcedure.input (z.object ({
        boardId:z.string ()
    })).mutation (async ({ctx, input})=>{
        return await ctx.prisma.board.delete ({
            where: {
                id: input.boardId
            }
        })
    })
});
