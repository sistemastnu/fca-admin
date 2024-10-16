import "@/css/satoshi.css";
import "@/css/style.css";
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="">{children}</div>
      </body>
    </html>
  );
}
