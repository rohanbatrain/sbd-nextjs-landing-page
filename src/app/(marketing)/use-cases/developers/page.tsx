import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Code, Zap, Shield, Wrench } from "lucide-react";

export default function DevelopersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="For Developers"
                title="Built by Developers, for Developers"
                description="Powerful API, MCP integration, self-hosting options, and complete customization freedom."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Developer-First Platform</h2>
                        <p className="text-white/70 text-lg">
                            Full API access, 138+ MCP tools, self-hosting support, and open-source codebase for complete control.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: Code, title: "RESTful API", desc: "Complete API access with interactive docs" },
                                { icon: Zap, title: "138+ MCP Tools", desc: "AI agent integration out of the box" },
                                { icon: Shield, title: "Self-Hosting", desc: "Deploy on your own infrastructure" },
                                { icon: Wrench, title: "Open Source", desc: "Customize and extend as needed" }
                            ].map((item) => (
                                <div key={item.title} className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                            <item.icon className="w-6 h-6 text-orange-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                                        <p className="text-white/70 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-6">Use Case Example</h3>
                        <div className="space-y-4 text-white/80">
                            <p>
                                <strong>Sarah, Full-Stack Developer</strong> uses Second Brain Database to:
                            </p>
                            <ul className="space-y-2 pl-4">
                                <li>• Build custom frontends using the REST API</li>
                                <li>• Integrate AI agents via MCP protocol</li>
                                <li>• Self-host for complete data privacy</li>
                                <li>• Contribute features back to the open-source project</li>
                                <li>• Create custom plugins and extensions</li>
                            </ul>
                            <p className="italic text-white/60">
                                &quot;The API is well-documented and the MCP integration makes it easy to build AI-powered features. Plus, I can self-host for complete control.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/docs/api"
                            className="inline-block px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                        >
                            View API Docs
                        </Link>
                        <a
                            href="https://github.com/rohanbatrain/second_brain_database"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
