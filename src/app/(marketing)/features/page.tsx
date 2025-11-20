"use client";

import PageHeader from "@/components/layout/PageHeader";
import FeatureCard from "@/components/shared/FeatureCard";
import { Database, Users, Shield, Code, Brain, Network, Zap, FileText } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
    const features = [
        {
            icon: FileText,
            title: "Document Intelligence",
            description: "Advanced AI-powered document processing with OCR, table extraction, and RAG-optimized chunking.",
            features: [
                "PDF, DOCX, PPTX processing",
                "OCR and table extraction",
                "Semantic search",
                "Vector embeddings"
            ],
            href: "/features/documents"
        },
        {
            icon: Users,
            title: "Family Collaboration",
            description: "Shared wallets, role-based permissions, and real-time collaboration for families.",
            features: [
                "Family groups and relationships",
                "Shared SBD token wallets",
                "4-tier permission system",
                "Token request workflows"
            ],
            href: "/features/family"
        },
        {
            icon: Database,
            title: "Workspace Management",
            description: "Team collaboration with workspace wallets, audit logs, and emergency access.",
            features: [
                "Multi-member workspaces",
                "Role-based access control",
                "Complete audit trails",
                "Emergency admin access"
            ],
            href: "/features/workspaces"
        },
        {
            icon: Shield,
            title: "Security and Encryption",
            description: "Zero-trust architecture with client-side encryption and comprehensive security features.",
            features: [
                "Client-controlled encryption keys",
                "JWT + 2FA authentication",
                "IP whitelisting",
                "Comprehensive audit logging"
            ],
            href: "/features/security"
        },
        {
            icon: Code,
            title: "MCP Integration",
            description: "138+ tools for AI agent integration with FastMCP 2.x protocol support.",
            features: [
                "Family management tools (25+)",
                "Auth and security tools (20+)",
                "Shop operations (15+)",
                "Admin and monitoring (48+)"
            ],
            href: "/features/mcp"
        },
        {
            icon: Network,
            title: "IP Address Management",
            description: "Hierarchical IPAM system with automatic allocation and geographic organization.",
            features: [
                "10.X.Y.Z structured addressing",
                "Auto-allocation",
                "Geographic hierarchy",
                "Quota management"
            ],
            href: "/features/ipam"
        },
        {
            icon: Brain,
            title: "AI and RAG",
            description: "LangChain, LangGraph, and Ollama integration for advanced AI capabilities.",
            features: [
                "6 specialized AI agents",
                "RAG pipeline",
                "Vector search",
                "LangGraph workflows"
            ],
            href: "/features/ai"
        },
        {
            icon: Zap,
            title: "Real-Time Systems",
            description: "WebSocket, SSE, and LiveKit integration for real-time collaboration.",
            features: [
                "WebSocket connections",
                "Server-sent events",
                "Voice streaming",
                "Real-time notifications"
            ],
            href: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Complete Feature Set"
                title="Everything You Need for Knowledge Management"
                description="Second Brain Database provides a comprehensive suite of features for document processing, collaboration, security, and AI integration."
            >
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link
                        href="/docs/getting-started"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/docs/api"
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                    >
                        View API Docs
                    </Link>
                </div>
            </PageHeader>

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-white text-center mb-12">
                    Feature Comparison
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                                <th className="px-6 py-4 text-center text-white font-semibold">Free</th>
                                <th className="px-6 py-4 text-center text-white font-semibold">Pro</th>
                                <th className="px-6 py-4 text-center text-white font-semibold">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            <tr>
                                <td className="px-6 py-4 text-white/80">Document Processing</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white/80">Family Collaboration</td>
                                <td className="px-6 py-4 text-center text-white/40">—</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white/80">Workspace Management</td>
                                <td className="px-6 py-4 text-center text-white/40">—</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white/80">Client-Side Encryption</td>
                                <td className="px-6 py-4 text-center text-white/40">—</td>
                                <td className="px-6 py-4 text-center text-white/40">—</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white/80">MCP Integration</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white/80">IPAM</td>
                                <td className="px-6 py-4 text-center text-white/40">—</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white/80">AI and RAG</td>
                                <td className="px-6 py-4 text-center text-white/40">—</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                                <td className="px-6 py-4 text-center text-green-400">✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
