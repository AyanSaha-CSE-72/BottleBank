import { RegisterForm } from "@/components/auth/register-form";
import { AppContainer } from "@/components/layout/app-container";
import { Header } from "@/components/layout/header";

export default function RegisterPage() {
  return (
    <AppContainer>
      <Header />
      <main className="flex-grow p-5">
        <RegisterForm />
      </main>
    </AppContainer>
  );
}
