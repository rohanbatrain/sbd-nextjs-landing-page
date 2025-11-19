"use client";

import { motion } from "framer-motion";
import { Database, Brain, Code, GitBranch, Star, Users, Shield } from "lucide-react";
import { useState } from "react";

export default function Features() {
    const [activeTab, setActiveTab] = useState<'technical' | 'philosophy' | 'security'>('philosophy');

    return (
        <section className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#040508] to-[#0C0F15] justify-center items-center relative py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl bp3:text-3xl bp4:text-4xl font-light mb-6 text-white"
                    >
                        Core Features
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/70 max-w-3xl mx-auto mb-12"
                    >
                        Enterprise-grade capabilities for modern knowledge management
                    </motion.p>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10">
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setActiveTab('philosophy')}
                                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'philosophy'
                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Core Philosophy
                                </button>
                                <button
                                    onClick={() => setActiveTab('technical')}
                                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'technical'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Technical Capabilities
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'security'
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Security Capabilities
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Philosophy Features Tab */}
                {activeTab === 'philosophy' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    >
                        <FeatureCard
                            icon={<GitBranch className="w-6 h-6 text-yellow-400" />}
                            iconBg="bg-yellow-500/20"
                            title="Flexibility"
                            description="You're not locked into any one platform or tool. Migrate and switch between different platforms while keeping your data consistent."
                            list={[
                                "Platform-agnostic data storage",
                                "Easy migration between tools",
                                "Adapt your system over time",
                                "No vendor lock-in"
                            ]}
                        />
                        <FeatureCard
                            icon={<Database className="w-6 h-6 text-cyan-400" />}
                            iconBg="bg-cyan-500/20"
                            title="Centralized Data"
                            description="All your data is stored in a consistent and structured manner, no matter which frontend or tool you choose to interact with."
                            list={[
                                "Consistent data structure",
                                "Unified storage across tools",
                                "Structured knowledge base",
                                "Seamless data access"
                            ]}
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Code className="w-6 h-6 text-pink-400" />}
                            iconBg="bg-pink-500/20"
                            title="Modular Micro Frontends"
                            description="Small, task-focused frontends like Emotion Capture help you work on specific tasks without unnecessary features."
                            list={[
                                "Focused, single-purpose apps",
                                "Independent operation",
                                "Reduced complexity",
                                "Specialized functionality"
                            ]}
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Star className="w-6 h-6 text-green-400" />}
                            iconBg="bg-green-500/20"
                            title="Open-Source"
                            description="This project is open for everyone. It's about sharing and collaborating to improve personal knowledge management for all."
                            list={[
                                "Community-driven development",
                                "Transparent codebase",
                                "Collaborative improvements",
                                "Free for everyone"
                            ]}
                            delay={0.3}
                        />
                    </motion.div>
                )}

                {/* Technical Features Tab */}
                {activeTab === 'technical' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    >
                        <FeatureCard
                            icon={<Brain className="w-6 h-6 text-blue-400" />}
                            iconBg="bg-blue-500/20"
                            title="Document Intelligence"
                            description="Advanced processing with Docling, OCR, table extraction, and RAG-optimized chunking. Turn documents into queryable knowledge."
                            list={[
                                "Automatic text extraction from PDFs, DOCX, PPTX",
                                "Semantic search and AI question answering",
                                "Vector embeddings for similarity matching",
                                "Table and figure recognition"
                            ]}
                        />
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-green-400" />}
                            iconBg="bg-green-500/20"
                            title="Family Collaboration"
                            description="Shared wallets, role-based permissions, audit trails, and real-time notifications. Perfect for family knowledge bases."
                            list={[
                                "4-tier permission system (Admin, Full, Limited, View-Only)",
                                "Shared financial tracking and spending limits",
                                "Real-time collaboration and notifications",
                                "Complete audit trails for compliance"
                            ]}
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Code className="w-6 h-6 text-purple-400" />}
                            iconBg="bg-purple-500/20"
                            title="MCP Server Integration"
                            description="138+ tools across 5 categories for AI agent integration. FastMCP 2.x with HTTP/stdio transport."
                            list={[
                                "Family management tools (25+)",
                                "Authentication & security tools (20+)",
                                "Shop system operations (15+)",
                                "Workspace collaboration (30+)",
                                "Admin & monitoring tools (48+)"
                            ]}
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-orange-400" />}
                            iconBg="bg-orange-500/20"
                            title="Enterprise Security"
                            description="JWT authentication, 2FA, rate limiting, encryption, audit logging, and Cloudflare Turnstile integration. Zero-trust architecture."
                            list={[
                                "Multi-layer security architecture with client-controlled encryption",
                                "Zero-trust model: users own their encryption keys",
                                "End-to-end encryption with server-side ciphertext processing only",
                                "Comprehensive audit trails for compliance"
                            ]}
                            delay={0.3}
                        />
                    </motion.div>
                )}

                {/* Security Features Tab */}
                {activeTab === 'security' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    >
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-amber-400" />}
                            iconBg="bg-amber-500/20"
                            title="Zero-Trust Architecture"
                            description="True zero trust means users control their own encryption keys. Client-side encryption ensures your data is encrypted before it reaches our servers."
                            list={[
                                "User-generated and controlled encryption keys",
                                "Client-side encryption before data transmission",
                                "Server never sees plaintext - only ciphertext",
                                "Complete data portability and provider independence"
                            ]}
                        />
                        <FeatureCard
                            icon={<Database className="w-6 h-6 text-purple-400" />}
                            iconBg="bg-purple-500/20"
                            title="Client-Side Encryption"
                            description="Data is encrypted on your device before transmission. You control the encryption keys, ensuring end-to-end security."
                            list={[
                                "TLS for transport encryption (HTTPS/WSS)",
                                "Client-side Fernet encryption for end-to-end confidentiality",
                                "User-controlled keys with secure key derivation",
                                "Optional envelope encryption for additional security layers"
                            ]}
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-cyan-400" />}
                            iconBg="bg-cyan-500/20"
                            title="User-Agent & IP Lockdown"
                            description="Protect sensitive accounts by binding sessions to device fingerprints and IP constraints. Administrators can configure allowlists."
                            list={[
                                "Per-account IP allowlist / denylist",
                                "Optional user-agent binding and device recognition",
                                "Automated anomaly detection and temporary lockdowns"
                            ]}
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-green-400" />}
                            iconBg="bg-green-500/20"
                            title="Auth, Monitoring & Integrations"
                            description="The backend (FastAPI) provides JWT-based auth, audit logging, rate limiting, and integrations with Turnstile and WAFs."
                            list={[
                                "JWT + refresh token lifecycle with revocation",
                                "Audit logs and immutable event streams for compliance",
                                "Admin APIs to manage policies"
                            ]}
                            delay={0.3}
                        />

                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 col-span-full mt-4">
                            <h3 className="text-xl font-semibold text-white mb-4">How the Backend Helps</h3>
                            <p className="text-white/80 mb-4">
                                The server-side implementation (FastAPI) includes middleware and managers to enforce policies, support client-side encryption workflows, and expose administrative endpoints for security configuration. The backend never stores or accesses user encryption keys - it only processes ciphertext.
                            </p>
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
                                <h4 className="text-amber-400 font-semibold mb-2">🔐 Privacy & Encryption: Key Considerations</h4>
                                <div className="text-white/70 text-sm space-y-2">
                                    <p><strong>Client-Side Encryption:</strong> Optional feature (disabled by default) that can only be enabled during account creation. When enabled, protects sensitive content like notes with user-controlled keys.</p>
                                    <p><strong>Functional Data:</strong> Analytical features (emotion tracking, mathematical metrics) remain unencrypted for performance and usability - these are designed for quick access and analysis.</p>
                                    <p><strong>Self-Hosting Option:</strong> For maximum privacy, users can switch to self-hosted, air-tight instances with complete data control.</p>
                                    <p><strong>Freedom Philosophy:</strong> The system values user choice - configure encryption and hosting to meet your specific privacy needs.</p>
                                </div>
                            </div>
                            <p className="text-white/70 text-sm">
                                For implementation details, see the Security Documentation linked in the footer or the repository under <code className="font-mono">src/second_brain_database</code>.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function FeatureCard({ icon, iconBg, title, description, list, delay = 0 }: {
    icon: React.ReactNode,
    iconBg: string,
    title: string,
    description: string,
    list: string[],
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
            </div>
            <p className="text-white/80 mb-4">
                {description}
            </p>
            <ul className="text-white/70 space-y-2">
                {list.map((item, i) => (
                    <li key={i}>• {item}</li>
                ))}
            </ul>
        </motion.div>
    );
}
