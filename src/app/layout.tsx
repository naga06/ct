import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CyberTwin-X | Cyber-Physical Digital Twin Platform",
  description: "Next-generation digital twin platform for cyber-physical security, real-time threat simulation, and industrial automation resiliency.",
  metadataBase: new URL("https://cybertwinx.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CyberTwin-X | Cyber-Physical Digital Twin Platform",
    description: "Next-generation digital twin platform for cyber-physical security, real-time threat simulation, and industrial automation resiliency.",
    url: "https://cybertwinx.com/",
    siteName: "CyberTwin-X",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberTwin-X | Cyber-Physical Digital Twin Platform",
    description: "Next-generation digital twin platform for cyber-physical security, real-time threat simulation, and industrial automation resiliency.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
