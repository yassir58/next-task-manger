import { publicProcedure, router } from "~/server/api/trpc";
import { NextResponse } from "next/server";
import z from "zod";
import {hash} from 'bcrypt'
import { boardRouter } from "./routers/board";
import { userRouter } from "./routers/user";
import { taskRouter } from "./routers/task";
import workspaceRouter from "./routers/workspace";
import subtaskRouter from "./routers/subtask";
import { commentRouter } from "./routers/comment";
import attachmentRouter from "./routers/attachment";
import invitationsRouter from "./routers/invitations";
import columnRoute from "./routers/column";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  userRouter:userRouter,
  workspaceRouter: workspaceRouter,
  boardRouter:boardRouter,
  taskRouter:taskRouter,
  subtaskRouter:subtaskRouter,
  commentRouter: commentRouter,
  attachmentRouter:attachmentRouter,
  invitationsRouter:invitationsRouter,
  columnRouter:columnRoute

});
// export type definition of API
export type AppRouter = typeof appRouter;
