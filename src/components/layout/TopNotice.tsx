"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TopNotice() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 px-4 shadow-lg relative z-[60]">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse hidden sm:block" />
                <p>
                    🚧 This project is in early development. Features may not work as intended.
                    <span className="hidden sm:inline"> Please wait for the beta release.</span>
                </p>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse hidden sm:block" />

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Dismiss notice"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
