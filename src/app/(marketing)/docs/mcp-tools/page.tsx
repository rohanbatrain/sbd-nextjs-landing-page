import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";

export default function MCPToolsPage() {
    const toolCategories = [
        {
            name: "Family Management (25+ tools)",
            tools: [
                "create_family", "get_family", "list_families", "update_family", "delete_family",
                "add_family_member", "remove_family_member", "update_member_role",
                "get_family_wallet", "transfer_tokens", "request_tokens", "approve_token_request"
            ]
        },
        {
            name: "Authentication & Security (20+ tools)",
            tools: [
                "register_user", "login_user", "logout_user", "refresh_token",
                "enable_2fa", "verify_2fa", "get_user_profile", "update_profile",
                "change_password", "reset_password", "list_sessions", "revoke_session"
            ]
        },
        {
            name: "Shop System (15+ tools)",
            tools: [
                "list_shop_items", "get_shop_item", "purchase_item", "rent_item",
                "get_purchase_history", "get_owned_assets", "apply_asset",
                "get_asset_analytics"
            ]
        },
        {
            name: "Workspace Collaboration (30+ tools)",
            tools: [
                "create_workspace", "get_workspace", "list_workspaces", "update_workspace",
                "add_workspace_member", "remove_member", "update_member_role",
                "get_workspace_wallet", "get_audit_logs", "emergency_access"
            ]
        },
        {
            name: "Admin & Monitoring (48+ tools)",
            tools: [
                "get_system_health", "get_metrics", "get_logs", "manage_users",
                "configure_settings", "backup_database", "restore_database",
                "monitor_performance"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="MCP Tools"
                title="138+ Tools for AI Agents"
                description="Complete guide to using Model Context Protocol tools for AI agent integration."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">What is MCP?</h3>
                        <p className="text-white/80">
                            Model Context Protocol (MCP) is a standard for AI agents to interact with external tools and services. Second Brain Database provides 138+ tools that AI agents can use to manage families, authenticate users, process documents, and more.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Tool Categories</h2>
                        <div className="space-y-6">
                            {toolCategories.map((category) => (
                                <div key={category.name} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-xl font-semibold text-white mb-4">{category.name}</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {category.tools.map((tool) => (
                                            <code key={tool} className="text-purple-400 text-sm">{tool}</code>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Usage Examples</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">1. List Available Tools</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`curl -X POST http://localhost:8000/mcp/tools \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json"

# Response: List of all 138+ available tools with descriptions`}
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">2. Execute a Tool</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`curl -X POST http://localhost:8000/mcp/tools/execute \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool_name": "create_family",
    "arguments": {
      "name": "Smith Family",
      "description": "Our family knowledge base",
      "initial_wallet_balance": 1000
    }
  }'`}
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">3. Use with AI Agents</h3>
                                <CodeBlock
                                    language="python"
                                    code={`from langchain.agents import initialize_agent
from langchain_community.tools import MCPTool

# Initialize MCP tools
tools = MCPTool.from_server("http://localhost:8000/mcp")

# Create agent
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="zero-shot-react-description"
)

# Use agent
result = agent.run("Create a family called 'Johnson Family' with 1000 tokens")`}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Security</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <p className="text-white/80 mb-4">
                                All MCP tools require authentication and respect user permissions:
                            </p>
                            <ul className="space-y-2 text-white/70">
                                <li>• <strong>Authentication:</strong> JWT token required for all tool executions</li>
                                <li>• <strong>Authorization:</strong> Tools check user permissions before execution</li>
                                <li>• <strong>Rate Limiting:</strong> Tools are subject to API rate limits</li>
                                <li>• <strong>Audit Logging:</strong> All tool executions are logged for compliance</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Integration Patterns</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "LangChain", desc: "Use MCPTool class to integrate with LangChain agents" },
                                { title: "LangGraph", desc: "Build complex workflows with MCP tools as nodes" },
                                { title: "Custom Agents", desc: "Call MCP endpoints directly from your custom agents" },
                                { title: "Claude Desktop", desc: "Configure MCP server for Claude Desktop integration" }
                            ].map((pattern) => (
                                <div key={pattern.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-2">{pattern.title}</h3>
                                    <p className="text-white/70 text-sm">{pattern.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
