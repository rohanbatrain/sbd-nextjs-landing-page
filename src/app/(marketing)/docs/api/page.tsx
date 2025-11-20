import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";

export default function APIReferencePage() {
    const apiSections = [
        {
            title: "Authentication",
            endpoints: [
                { method: "POST", path: "/api/v1/auth/register", desc: "Register new user" },
                { method: "POST", path: "/api/v1/auth/login", desc: "Login and get JWT token" },
                { method: "POST", path: "/api/v1/auth/refresh", desc: "Refresh access token" },
                { method: "POST", path: "/api/v1/auth/logout", desc: "Logout and invalidate token" },
                { method: "GET", path: "/api/v1/auth/me", desc: "Get current user info" }
            ]
        },
        {
            title: "Documents",
            endpoints: [
                { method: "POST", path: "/api/v1/documents/upload", desc: "Upload and process document" },
                { method: "GET", path: "/api/v1/documents/{id}", desc: "Get document details" },
                { method: "POST", path: "/api/v1/documents/{id}/chunk", desc: "Chunk document for RAG" },
                { method: "DELETE", path: "/api/v1/documents/{id}", desc: "Delete document" }
            ]
        },
        {
            title: "Family Management",
            endpoints: [
                { method: "POST", path: "/api/v1/families", desc: "Create family group" },
                { method: "GET", path: "/api/v1/families", desc: "List user's families" },
                { method: "POST", path: "/api/v1/families/{id}/members", desc: "Add family member" },
                { method: "GET", path: "/api/v1/families/{id}/wallet", desc: "Get family wallet" }
            ]
        },
        {
            title: "Workspaces",
            endpoints: [
                { method: "POST", path: "/api/v1/workspaces", desc: "Create workspace" },
                { method: "GET", path: "/api/v1/workspaces", desc: "List workspaces" },
                { method: "POST", path: "/api/v1/workspaces/{id}/members", desc: "Add member" },
                { method: "GET", path: "/api/v1/workspaces/{id}/audit", desc: "Get audit logs" }
            ]
        },
        {
            title: "IPAM",
            endpoints: [
                { method: "POST", path: "/api/v1/ipam/regions", desc: "Create region (auto-allocates IP)" },
                { method: "POST", path: "/api/v1/ipam/hosts", desc: "Create host (auto-allocates IP)" },
                { method: "POST", path: "/api/v1/ipam/interpret", desc: "Interpret IP hierarchy" },
                { method: "GET", path: "/api/v1/ipam/statistics/top-utilized", desc: "Get utilization stats" }
            ]
        },
        {
            title: "MCP Server",
            endpoints: [
                { method: "POST", path: "/mcp/tools", desc: "List available MCP tools" },
                { method: "POST", path: "/mcp/tools/execute", desc: "Execute MCP tool" },
                { method: "GET", path: "/mcp/resources", desc: "List MCP resources" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="API Reference"
                title="Complete API Documentation"
                description="Comprehensive reference for all API endpoints with request/response examples."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Interactive Documentation</h3>
                        <p className="text-white/80 mb-4">
                            For interactive API testing, visit the Swagger UI at <code className="text-blue-400">http://localhost:8000/docs</code>
                        </p>
                        <p className="text-white/70 text-sm">
                            All endpoints require authentication via JWT token in the Authorization header: <code className="text-blue-400">Bearer &lt;token&gt;</code>
                        </p>
                    </div>

                    {apiSections.map((section) => (
                        <div key={section.title}>
                            <h2 className="text-3xl font-bold text-white mb-6">{section.title}</h2>
                            <div className="space-y-4">
                                {section.endpoints.map((endpoint) => (
                                    <div key={endpoint.path} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className={`px-3 py-1 rounded text-sm font-medium ${endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                                                    endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                                                        endpoint.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                                                            'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {endpoint.method}
                                            </span>
                                            <code className="text-white font-mono text-sm">{endpoint.path}</code>
                                        </div>
                                        <p className="text-white/70 text-sm">{endpoint.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Example: Register and Login</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">1. Register</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`curl -X POST http://localhost:8000/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "username": "johndoe"
  }'`}
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">2. Login</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`curl -X POST http://localhost:8000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'

# Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}`}
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">3. Use Token</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`curl -X GET http://localhost:8000/api/v1/auth/me \\
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."`}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Rate Limiting</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <p className="text-white/80 mb-4">
                                API endpoints are rate-limited to prevent abuse:
                            </p>
                            <ul className="space-y-2 text-white/70">
                                <li>• <strong>Authentication endpoints:</strong> 5 requests per minute</li>
                                <li>• <strong>Document upload:</strong> 10 requests per minute</li>
                                <li>• <strong>General endpoints:</strong> 100 requests per minute</li>
                            </ul>
                            <p className="text-white/60 text-sm mt-4">
                                Rate limit headers are included in responses: <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
