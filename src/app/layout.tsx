import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./antd-overwrite.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import CustomLayout from "@/components/Layout";
import { ConfigProvider } from "antd";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  function getRandomColorExcludingWhite() {
    // Helper function to check if a color is "white-related"
    const isWhiteRelated = (hex: string) => {
        // Convert hex to RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        // Check if the color is too bright (close to white)
        return r > 220 && g > 220 && b > 220; // Adjust threshold if needed
    };

    let color;
    do {
        // Generate a random color
        color = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
    } while (isWhiteRelated(color)); // Repeat if color is white-related

    return color;
}
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
        <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: getRandomColorExcludingWhite(),
      },
    }}
  >
            <CustomLayout>
              {children}
            </CustomLayout>
        </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
