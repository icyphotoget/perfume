// app/(auth)/register/page.tsx
import { registerAction } from "./actions";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        action={registerAction}
        className="flex flex-col gap-4 border p-6 rounded-xl w-full max-w-sm"
      >
        <h1 className="text-xl font-bold">Register</h1>

        <input
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
          required
        />
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
          Create account
        </button>
      </form>
    </main>
  );
}
