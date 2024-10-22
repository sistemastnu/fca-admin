import "@/css/satoshi.css";
import "@/css/style.css";

import ClientSessionProvider from "./ClientSessionProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
