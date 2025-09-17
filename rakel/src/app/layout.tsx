import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter, jetbrainsMono, notoSansSC } from "@/fonts";
import { RightTabsNav } from "@/components/RightTabsNav";
import { BinderSpine } from "@/components/BinderSpine";

export const metadata: Metadata = {
  title: "Rakel",
  description: "Rakel 个人网站",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="min-h-screen bg-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative grid grid-cols-[80px_1fr_220px] gap-6">
              <BinderSpine />
              <main className="bg-white rounded-xl shadow-sheet border border-line p-6 binder-shadow">
                {children}
              </main>
              <aside>
                <RightTabsNav />
              </aside>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

