import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 px-4">
        {/* Brand */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            blackmatte
          </h1>
          <p className="text-sm text-muted-foreground">Admin Sign In</p>
        </div>

        {/* Login Card */}
        <LoginForm />
      </div>
    </div>
  );
}
