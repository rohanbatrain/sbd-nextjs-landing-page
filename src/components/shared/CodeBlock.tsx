"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

export default function CodeBlock({ code, language = "bash", title }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            {title && (
                <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                    <span className="text-white/70 text-sm font-mono">{title}</span>
                    <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        title="Copy code"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                        ) : (
                            <Copy className="w-4 h-4 text-white/60" />
                        )}
                    </button>
                </div>
            )}
            <div className="relative">
                {!title && (
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded transition-colors"
                        title="Copy code"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                        ) : (
                            <Copy className="w-4 h-4 text-white/60" />
                        )}
                    </button>
                )}
                <pre className="p-4 overflow-x-auto">
                    <code className={`language-${language} text-sm text-white/90 font-mono`}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
}
