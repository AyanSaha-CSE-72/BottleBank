import { LoginForm } from "@/components/auth/login-form";
import { AppContainer } from "@/components/layout/app-container";
import { Header } from "@/components/layout/header";

export default function LoginPage() {
  return (
    <AppContainer>
      <Header />
      <main className="flex-grow p-5 flex items-center">
        <div className="w-full">
         <LoginForm />
        </div>
      </main>
    </AppContainer>
  );
}
