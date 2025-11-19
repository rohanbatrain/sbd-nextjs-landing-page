import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import { Database, Users, Shield, FileText } from "lucide-react";

export default function WorkspacesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Workspace Management"
                title="Team Collaboration Made Easy"
                description="Multi-member workspaces with role-based access, audit logs, and emergency access features."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { icon: Users, title: "Team Workspaces", desc: "Multi-member collaboration" },
                        { icon: Database, title: "Workspace Wallets", desc: "Shared resource management" },
                        { icon: Shield, title: "Role-Based Access", desc: "Admin, member, viewer roles" },
                        { icon: FileText, title: "Audit Logs", desc: "Complete activity tracking" }
                    ].map((item) => (
                        <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <item.icon className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Create a Workspace</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/workspaces \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Engineering Team",
    "description": "Product development workspace",
    "initial_wallet_balance": 5000
  }'`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Team Collaboration", desc: "Work together with shared access to documents and resources" },
                                { title: "Role Management", desc: "Assign admin, member, or viewer roles to team members" },
                                { title: "Workspace Wallets", desc: "Manage shared SBD token budgets for the team" },
                                { title: "Audit Trails", desc: "Track all changes and actions for compliance" },
                                { title: "Emergency Access", desc: "Backup admin system for critical situations" },
                                { title: "Real-Time Sync", desc: "Instant updates across all team members" }
                            ].map((feature) => (
                                <div key={feature.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/70 text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
