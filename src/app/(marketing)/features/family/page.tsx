import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import { Users, Wallet, Shield, Bell } from "lucide-react";

export default function FamilyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Family Collaboration"
                title="Manage Your Family's Knowledge Together"
                description="Shared wallets, role-based permissions, and real-time collaboration for families."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { icon: Users, title: "Family Groups", desc: "Create and manage family units" },
                        { icon: Wallet, title: "Shared Wallets", desc: "SBD token pool management" },
                        { icon: Shield, title: "4-Tier Permissions", desc: "Admin, Full, Limited, View" },
                        { icon: Bell, title: "Real-Time Notifications", desc: "Stay updated on changes" }
                    ].map((item) => (
                        <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <item.icon className="w-8 h-8 text-green-400 mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Create a Family</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/families \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Smith Family",
    "description": "Our family knowledge base",
    "initial_wallet_balance": 1000
  }'`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Add Family Members</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/families/{id}/members \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "user_123",
    "role": "full_access",
    "spending_limit": 100
  }'`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Permission Levels</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Role</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Permissions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    <tr>
                                        <td className="px-6 py-4 text-white/80 font-medium">Admin</td>
                                        <td className="px-6 py-4 text-white/70">Full control, manage members, wallet access</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-white/80 font-medium">Full Access</td>
                                        <td className="px-6 py-4 text-white/70">Create/edit content, limited wallet access</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-white/80 font-medium">Limited</td>
                                        <td className="px-6 py-4 text-white/70">View and comment, request tokens</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-white/80 font-medium">View Only</td>
                                        <td className="px-6 py-4 text-white/70">Read-only access</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
