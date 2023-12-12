import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

const f = createUploadthing();
 
const auth = async (req: Request) => {
  const session = await getServerSession (authOptions)
  return session?.user
}; // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  userRoute: f({image: { maxFileSize: "4MB" }})
  .middleware (async ({req}) => {
    const user = await auth(req);
 
    // If you throw, the user will not be able to upload
    if (!user) throw new Error("Unauthorized");

    // Whatever is returned here is accessible in onUploadComplete as `metadata`
    return { userId: user.id };
  })
  .onUploadComplete (async ({metadata, file}) => {
    console.log("Upload complete for userId:", metadata.userId);
 
    console.log("file url", file.url);

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { uploadedBy: metadata.userId };
  })
  ,
  attachmentUploader: f({ image: { maxFileSize: "4MB" } , pdf:{maxFileSize:'8MB'}})
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);
 
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;