import "./globals.css";
import { DM_Sans, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const outfitHeading = Outfit({ subsets: ['latin'], variable: '--font-heading' });

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const user = await getMe()

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", dmSans.variable, outfitHeading.variable)}
    >
      <body className="min-h-full flex flex-col">

        <Toaster position="bottom-right" richColors />
        {/* Navbar */}
        {children}
        {/* Footer */}
      </body>
    </html>
  );
}
