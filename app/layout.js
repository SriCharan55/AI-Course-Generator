import "./globals.css";
import { Inter,Outfit } from "next/font/google";
import { ClerkProvider, GoogleOneTap, UserButton } from "@clerk/nextjs";

const inter = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "CourseConnect",
  description: "AI-powered course generator app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body>
          <GoogleOneTap />
          {children}
        </body>
      </html>
      
    </ClerkProvider>
  );
}
