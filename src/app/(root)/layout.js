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
  title: "Visual Zone Social Media App",
  description: "Social Media App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-100`} style={{ background: '#2B2B2F' }}>

          <main className="flex flex-row min-h-screen">
            {/* Left Sidebar */}
            <LeftSideBar className=" text-gray-300 p-4 shadow-xl rounded-lg "  style={{ background: '#202123' }}/>

            {/* Main Content Area */}
            <MainContainer className="flex-1 p-6 bg-gray-700 rounded-lg shadow-md">
              {children}
            </MainContainer>

            {/* Right Sidebar */}
            <RightSideBar className="bg-gray-800 text-gray-300 p-4 shadow-xl rounded-lg" />
          </main>

          {/* Bottom Bar */}
          <BottomBar className="bg-gray-800 text-gray-300 p-4 text-center shadow-xl" />
        </body>
      </html>
    </ClerkProvider>
  );
}
