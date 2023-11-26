import { publicProcedure, router } from "~/server/api/trpc";
import { NextResponse } from "next/server";
import z from "zod";
import {hash} from 'bcrypt'
import { boardRouter } from "./routers/board";
import { userRouter } from "./routers/user";
import { taskRouter } from "./routers/task";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  userRouter:userRouter,
  boardRouter:boardRouter,
  taskRouter:taskRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
