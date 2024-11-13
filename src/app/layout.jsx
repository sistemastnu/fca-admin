import "@/css/satoshi.css";
import "@/css/style.css";

import ClientSessionProvider from "./ClientSessionProvider";

export const metadata = {
  title: "FCA ADMIN PAGE",
  description: "Admin page for FCA ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
