import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // Definir página de inicio de sesión
  },
});

// Configuración para excluir las rutas de la API del middleware
export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*"], // Solo proteger las rutas específicas, excluyendo la API
};
