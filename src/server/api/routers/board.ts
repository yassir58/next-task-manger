import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const boardRouter = router({
  getBoards: publicProcedure
    .input(
      z.object({
        workspaceId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.board.findMany({
        where: { workspaceId : input.workspaceId},
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
        workspaceId: z.string(),
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
          workspace:{connect:{id: input.workspaceId}}
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
