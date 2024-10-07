import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/users/:path*",
    "/servicios/:path*",
    "/posts/:path*",
    "/nosotros/:path*",
    "/inbox/:path",
    "/contactanos/:path*",
  ],
};
