import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { PasswordInput } from "@ui/PasswordInput";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="max-w-md w-full bg-gray-50 py-10 px-4 sm:p-6 space-y-8">
        <Input label="Username" />
        <PasswordInput label="Password" />
        <Button block>Submit</Button>
      </section>
    </main>
  );
}
