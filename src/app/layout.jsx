import "@/css/satoshi.css";
import "@/css/style.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 text-bodydark">{children}</div>
      </body>
    </html>
  );
}
