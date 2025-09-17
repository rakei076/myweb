import { Inter, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
});

