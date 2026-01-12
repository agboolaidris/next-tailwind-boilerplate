"use client";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { TextField } from "@ui/textField";
import { Typography } from "@ui/typography";
import { useTheme } from "next-themes";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <main className="h-screen bg-background text-foreground">
      <Input />
      <Typography as="h1" size="4xl" weight="bold" variant="default">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Typography>
      <Typography as="p" size="base" weight="normal" variant="default">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Typography>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <Button>Button</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
      <TextField label="Email" error="Email is required" />
    </main>
  );
}
