// app/(auth)/login/page.tsx
import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        action={loginAction}
        className="flex flex-col gap-4 border p-6 rounded-xl w-full max-w-sm"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="border px-4 py-2 rounded font-semibold"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
