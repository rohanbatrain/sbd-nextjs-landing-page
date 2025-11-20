"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = {
    features: [
        { name: "Document Intelligence", href: "/features/documents", description: "AI-powered document processing" },
        { name: "Family Collaboration", href: "/features/family", description: "Shared wallets and permissions" },
        { name: "Workspaces", href: "/features/workspaces", description: "Team collaboration tools" },
        { name: "Security & Encryption", href: "/features/security", description: "Zero-trust architecture" },
        { name: "MCP Integration", href: "/features/mcp", description: "138+ AI agent tools" },
        { name: "IP Address Management", href: "/features/ipam", description: "Hierarchical IPAM system" },
        { name: "AI & RAG", href: "/features/ai", description: "LangChain and vector search" },
        { name: "View All Features", href: "/features", description: "Complete feature overview" },
    ],
    docs: [
        { name: "Getting Started", href: "/docs/getting-started" },
        { name: "API Reference", href: "/docs/api" },
        { name: "Architecture", href: "/docs/architecture" },
        { name: "Deployment", href: "/docs/deployment" },
        { name: "MCP Tools", href: "/docs/mcp-tools" },
    ],
    useCases: [
        { name: "For Researchers", href: "/use-cases/researchers" },
        { name: "For Families", href: "/use-cases/families" },
        { name: "For Teams", href: "/use-cases/teams" },
        { name: "For Developers", href: "/use-cases/developers" },
    ],
};

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <nav className="w-full bg-black/50 backdrop-blur-lg border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
                        <span className="text-white font-bold text-lg">Second Brain DB</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Features Dropdown */}
                        <DropdownMenu
                            label="Features"
                            items={navigation.features}
                            active={activeDropdown === "features"}
                            onToggle={() => setActiveDropdown(activeDropdown === "features" ? null : "features")}
                            onClose={() => setActiveDropdown(null)}
                        />

                        {/* Docs Dropdown */}
                        <DropdownMenu
                            label="Docs"
                            items={navigation.docs}
                            active={activeDropdown === "docs"}
                            onToggle={() => setActiveDropdown(activeDropdown === "docs" ? null : "docs")}
                            onClose={() => setActiveDropdown(null)}
                        />

                        {/* Use Cases Dropdown */}
                        <DropdownMenu
                            label="Use Cases"
                            items={navigation.useCases}
                            active={activeDropdown === "use-cases"}
                            onToggle={() => setActiveDropdown(activeDropdown === "use-cases" ? null : "use-cases")}
                            onClose={() => setActiveDropdown(null)}
                        />

                        <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
                            Pricing
                        </Link>
                        <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="/community" className="text-white/80 hover:text-white transition-colors">
                            Community
                        </Link>

                        <a
                            href="https://github.com/rohanbatrain/second_brain_database"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">GitHub</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-white p-2"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            <MobileSection title="Features" items={navigation.features} />
                            <MobileSection title="Docs" items={navigation.docs} />
                            <MobileSection title="Use Cases" items={navigation.useCases} />
                            <Link href="/pricing" className="block text-white/80 hover:text-white py-2">
                                Pricing
                            </Link>
                            <Link href="/about" className="block text-white/80 hover:text-white py-2">
                                About
                            </Link>
                            <Link href="/community" className="block text-white/80 hover:text-white py-2">
                                Community
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function DropdownMenu({
    label,
    items,
    active,
    onToggle,
    onClose,
}: {
    label: string;
    items: Array<{ name: string; href: string; description?: string }>;
    active: boolean;
    onToggle: () => void;
    onClose: () => void;
}) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
            >
                {label}
                <ChevronDown className={`w-4 h-4 transition-transform ${active ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl overflow-hidden"
                    >
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className="block px-4 py-3 hover:bg-white/10 transition-colors"
                            >
                                <div className="text-white font-medium">{item.name}</div>
                                {item.description && (
                                    <div className="text-white/60 text-sm mt-1">{item.description}</div>
                                )}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MobileSection({
    title,
    items,
}: {
    title: string;
    items: Array<{ name: string; href: string; description?: string }>;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-white/10 pb-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-white font-medium py-2"
            >
                {title}
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-2 pl-4"
                    >
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block text-white/70 hover:text-white py-1"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
