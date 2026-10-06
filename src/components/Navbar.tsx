"use client";

import RetroDock from "./RetroDock";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-3 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <RetroDock />
      </div>
    </header>
  );
}
