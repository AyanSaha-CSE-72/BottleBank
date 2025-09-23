import { AppContainer } from "@/components/layout/app-container";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Header } from "@/components/layout/header";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AppContainer>
      <Header />
      <main className="flex-grow p-5 pb-24">
        {children}
      </main>
      <BottomNav />
    </AppContainer>
  );
}
