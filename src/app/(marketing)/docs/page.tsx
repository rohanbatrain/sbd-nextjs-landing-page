import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import Link from "next/link";

export default function DocsPage() {
    const docSections = [
        {
            title: "Getting Started",
            description: "Quick start guide and installation instructions",
            href: "/docs/getting-started",
            topics: ["Installation", "Configuration", "First API Call", "Authentication"]
        },
        {
            title: "API Reference",
            description: "Complete API documentation with examples",
            href: "/docs/api",
            topics: ["Authentication", "Documents", "Family", "Workspaces", "Shop"]
        },
        {
            title: "Architecture",
            description: "System design and technical architecture",
            href: "/docs/architecture",
            topics: ["Components", "Data Flow", "Technology Stack", "Design Patterns"]
        },
        {
            title: "Deployment",
            description: "Production deployment guide",
            href: "/docs/deployment",
            topics: ["Docker", "Environment Variables", "Scaling", "Monitoring"]
        },
        {
            title: "MCP Tools",
            description: "Model Context Protocol integration guide",
            href: "/docs/mcp-tools",
            topics: ["Tool Categories", "Usage Examples", "Security", "Custom Tools"]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Documentation"
                title="Everything You Need to Know"
                description="Comprehensive guides, API reference, and tutorials to help you get the most out of Second Brain Database."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {docSections.map((section) => (
                        <Link
                            key={section.title}
                            href={section.href}
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                            <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                            <p className="text-white/70 mb-4">{section.description}</p>
                            <ul className="space-y-2">
                                {section.topics.map((topic) => (
                                    <li key={topic} className="text-white/60 text-sm flex items-center gap-2">
                                        <span className="text-blue-400">→</span>
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </Link>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">1. Clone the Repository</h3>
                            <CodeBlock
                                language="bash"
                                code={`git clone https://github.com/rohanbatrain/second_brain_database.git
cd second_brain_database`}
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">2. Install Dependencies</h3>
                            <CodeBlock
                                language="bash"
                                code={`uv venv && source .venv/bin/activate
uv pip install -r requirements.txt`}
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">3. Start All Services</h3>
                            <CodeBlock
                                language="bash"
                                code={`./start.sh`}
                            />
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                            <p className="text-white/80">
                                🎉 Done! Your API is now running at <code className="text-blue-400">http://localhost:8000</code>
                            </p>
                            <p className="text-white/60 mt-2">
                                Visit <code className="text-blue-400">http://localhost:8000/docs</code> for interactive API documentation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
