import PageHeader from "@/components/layout/PageHeader";
import { Target, Lightbulb, Code, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="About"
                title="Building the Future of Knowledge Management"
                description="Second Brain Database is an open-source project dedicated to providing flexible, platform-agnostic knowledge management infrastructure."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-20">
                    {/* Vision */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <Target className="w-8 h-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <p className="text-white/80 text-lg leading-relaxed mb-4">
                                We believe that your knowledge and data should never be locked into proprietary platforms. Second Brain Database provides a flexible, open-source backend that works with any frontend, giving you complete control over your digital life.
                            </p>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Whether you&apos;re using Notion, Obsidian, or building your own tools, Second Brain Database serves as your central, platform-agnostic data layer.
                            </p>
                        </div>
                    </div>

                    {/* Philosophy */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <Lightbulb className="w-8 h-8 text-yellow-400" />
                            <h2 className="text-3xl font-bold text-white">Core Philosophy</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Platform Agnostic",
                                    desc: "Your data isn't tied to any specific tool or platform. Switch frontends without losing your data."
                                },
                                {
                                    title: "Open Source",
                                    desc: "Complete transparency and community-driven development. No vendor lock-in, ever."
                                },
                                {
                                    title: "Privacy First",
                                    desc: "Optional client-side encryption and self-hosting options give you complete control."
                                },
                                {
                                    title: "Production Ready",
                                    desc: "Enterprise-grade features and security, battle-tested and ready for real-world use."
                                }
                            ].map((item) => (
                                <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/70">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technology */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <Code className="w-8 h-8 text-green-400" />
                            <h2 className="text-3xl font-bold text-white">Technology Stack</h2>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { name: "FastAPI", desc: "Modern Python web framework" },
                                    { name: "MongoDB", desc: "Flexible document database" },
                                    { name: "Redis", desc: "High-performance caching" },
                                    { name: "Celery", desc: "Async task processing" },
                                    { name: "LangChain", desc: "AI integration" },
                                    { name: "Docker", desc: "Containerization" },
                                    { name: "FastMCP", desc: "AI agent protocol" },
                                    { name: "Ollama", desc: "Local LLM inference" }
                                ].map((tech) => (
                                    <div key={tech.name}>
                                        <h4 className="text-white font-semibold mb-1">{tech.name}</h4>
                                        <p className="text-white/60 text-sm">{tech.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <Users className="w-8 h-8 text-purple-400" />
                            <h2 className="text-3xl font-bold text-white">Built by the Community</h2>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <p className="text-white/80 text-lg leading-relaxed mb-4">
                                Second Brain Database is maintained by <a href="https://github.com/rohanbatrain" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Rohan Batrain</a> and a growing community of contributors.
                            </p>
                            <p className="text-white/80 text-lg leading-relaxed">
                                We welcome contributions from developers, designers, writers, and users. Join us in building the future of knowledge management!
                            </p>
                        </div>
                    </div>

                    {/* Roadmap */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Roadmap</h2>
                        <div className="space-y-4">
                            {[
                                { version: "v1.1 (Q1 2025)", items: ["Advanced RAG with vector database", "Real-time collaboration features", "Mobile app support"] },
                                { version: "v1.2 (Q2 2025)", items: ["Multi-language support", "Blockchain integration for SBD tokens", "Advanced analytics dashboard"] },
                                { version: "Future", items: ["Plugin system", "GraphQL API", "Kubernetes deployment", "Cloud-native features"] }
                            ].map((milestone) => (
                                <div key={milestone.version} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-3">{milestone.version}</h3>
                                    <ul className="space-y-2">
                                        {milestone.items.map((item) => (
                                            <li key={item} className="text-white/70 flex items-center gap-2">
                                                <span className="text-blue-400">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
