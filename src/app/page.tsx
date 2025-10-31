"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [roll, setRoll] = useState("");
  const [error, setError] = useState("");

  // Hard-coded correct roll number. Change as needed.
  const CORRECT_ROLL = "12345";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (roll.trim() === CORRECT_ROLL) {
      router.push("/main");
    } else {
      setError("Incorrect roll number. Try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 font-sans">
      <main className="w-full max-w-md p-8 glass">
        <h1 className="text-2xl font-bold mb-2">Enter your roll no</h1>
        <p className="text-sm text-zinc-600 mb-4">Type the secret roll to continue — it's a tiny surprise on the other side.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            aria-label="Enter your roll no"
            value={roll}
            onChange={(e) => {
              setRoll(e.target.value);
              if (error) setError("");
            }}
            className={`rounded-md border px-3 py-2 ${error ? "shake" : ""}`}
            placeholder="e.g. 12345"
          />

          <button
            type="submit"
            className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            Submit
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>

        <p className="mt-6 text-sm text-zinc-600">
          Enter the correct roll (currently <strong>12345</strong>) to visit the interactive modal.
        </p>
      </main>
    </div>
  );
}
