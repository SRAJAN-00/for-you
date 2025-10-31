"use client";

import React, { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="welcome-popup" role="status" aria-live="polite">
      <div className="welcome-content ">
        <div>
          <strong>Welcome!</strong>
          <div className="welcome-sub">✨</div>
        </div>

        <button
          aria-label="Dismiss welcome"
          className="btn-dismiss"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
