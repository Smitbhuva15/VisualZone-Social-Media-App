import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import MainContainer from "@/components/layout/MainContainer";
import BottomBar from "@/components/layout/BottomBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Visual Zone Social Media App ",
  description: "Social Media App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-gray-800 text-light-1`}   >
      <main className="flex flex-row">
            <LeftSideBar />
            <MainContainer>
              {children}
            </MainContainer>
            <RightSideBar />
          </main>
          <BottomBar />
      </body>
    </html>
    </ClerkProvider>
  );
}
