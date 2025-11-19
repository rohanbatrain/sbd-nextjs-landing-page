import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import { Code, Zap, Shield, Layers } from "lucide-react";

export default function MCPPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="MCP Integration"
                title="138+ Tools for AI Agents"
                description="FastMCP 2.x integration with comprehensive tool library for AI agent connectivity."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { icon: Code, title: "138+ Tools", desc: "Comprehensive tool library" },
                        { icon: Zap, title: "FastMCP 2.x", desc: "Modern protocol implementation" },
                        { icon: Shield, title: "Secure", desc: "Permission-based access control" },
                        { icon: Layers, title: "5 Categories", desc: "Family, Auth, Shop, Workspace, Admin" }
                    ].map((item) => (
                        <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <item.icon className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Tool Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { category: "Family Management", count: "25+ tools", desc: "Create families, manage members, handle token requests" },
                                { category: "Authentication & Security", count: "20+ tools", desc: "User management, 2FA, sessions, permissions" },
                                { category: "Shop System", count: "15+ tools", desc: "Asset management, purchases, rentals, analytics" },
                                { category: "Workspace Collaboration", count: "30+ tools", desc: "Team workspaces, roles, audit logs, emergency access" },
                                { category: "Admin & Monitoring", count: "48+ tools", desc: "System health, metrics, logs, configuration" }
                            ].map((cat) => (
                                <div key={cat.category} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-white">{cat.category}</h3>
                                        <span className="text-purple-400 text-sm font-medium">{cat.count}</span>
                                    </div>
                                    <p className="text-white/70 text-sm">{cat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">List Available Tools</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/mcp/tools \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json"`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Execute a Tool</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/mcp/tools/execute \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool_name": "create_family",
    "arguments": {
      "name": "Smith Family",
      "description": "Our family knowledge base"
    }
  }'`}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
