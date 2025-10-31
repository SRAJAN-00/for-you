"use client";

import React, { useEffect, useState } from "react";

type Offset = { x: number; y: number };

export default function QuestionModal() {
  const [noDisabled, setNoDisabled] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const [pos, setPos] = useState({ top: "45%", left: "50%" });

  // small offset used to 'dodge' the No button when hovered
  const [noOffset, setNoOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  const [confetti, setConfetti] = useState<
    Array<{ id: number; left: number; delay: number; color: string }>
  >([]);

  function randomColor() {
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function handleNoClick() {
    // user managed to click No — move modal and disable No so it's unclickable after

    const top = Math.floor(15 + Math.random() * 60);
    const left = Math.floor(20 + Math.random() * 60);
    setPos({ top: `${top}%`, left: `${left}%` });
  }

  function handleNoHover() {
    if (noDisabled || congrats) return;
    // dodge a few times; after some dodges stop dodging so user can catch it
    if (dodgeCount >= 6) return;
    setDodgeCount((c) => c + 1);
    // pick a random small offset in px
    const x = Math.floor(-110 + Math.random() * 220); // -110 .. 110
    const y = Math.floor(-30 + Math.random() * 60); // -30 .. 30
    setNoOffset({ x, y });
    // reset offset after a short timeout so it can move again
    window.setTimeout(() => setNoOffset({ x: 0, y: 0 }), 700);
  }

  function handleYes() {
    setCongrats(true);
    // spawn confetti pieces
    const pieces = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 100),
      delay: Math.random() * 0.8,
      color: randomColor(),
    }));
    setConfetti(pieces);
  }

  // small keyboard accessibility: Enter triggers Yes when focused inside modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (congrats) return;
      if (e.key === "y" || e.key === "Y") handleYes();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [congrats]);

  return (
    <div>
      <div
        className="modal glass"
        role="dialog"
        aria-modal="true"
        style={{ top: pos.top, left: pos.left }}
      >
        {!congrats ? (
          <div>
            <h2 className="text-lg font-semibold heading text-neutral-900">
              Are you gay?
            </h2>
            <p className="mt-2 subheading">select Yes or No</p>

            <div className="mt-6 flex items-center gap-3">
              <button
                className="btn btn-yes"
                onClick={handleYes}
                disabled={congrats}
                aria-label="Yes"
              >
                Yes ✅
              </button>

              <div style={{ position: "relative", width: 120, height: 40 }}>
                <button
                  className="btn btn-no"
                  onClick={handleNoClick}
                  onMouseEnter={handleNoHover}
                  disabled={noDisabled || congrats}
                  title={noDisabled ? "Disabled" : "No"}
                  aria-label="No"
                  style={{
                    transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                  }}
                >
                  No ❌
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="congrats">
            <h2 className="text-lg text-yellow-400 font-semibold">Congrats!</h2>
            <p className="mt-2 text-neutral-700">
              You are now a certified Gay🎉
            </p>
            <div className="mt-4">
              <button className="btn btn-ok" disabled>
                OK
              </button>
            </div>

            {/* Confetti pieces */}
            <div className="confetti-root" aria-hidden>
              {confetti.map((c) => (
                <span
                  key={c.id}
                  className="confetti"
                  style={{
                    left: `${c.left}%`,
                    background: c.color,
                    animationDelay: `${c.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop" aria-hidden="true" />
    </div>
  );
}
