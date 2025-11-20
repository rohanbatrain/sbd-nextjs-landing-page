import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Users, FileText, Shield, Zap } from "lucide-react";

export default function TeamsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="For Teams"
                title="Collaborate Smarter, Not Harder"
                description="Project documentation, knowledge sharing, and team collaboration tools for modern organizations."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Built for Team Productivity</h2>
                        <p className="text-white/70 text-lg">
                            Centralize your team's knowledge, streamline onboarding, and ensure compliance with comprehensive audit trails.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: FileText, title: "Documentation Hub", desc: "Centralized project and process documentation" },
                                { icon: Users, title: "Team Workspaces", desc: "Separate spaces for different projects" },
                                { icon: Shield, title: "Audit Trails", desc: "Complete activity tracking for compliance" },
                                { icon: Zap, title: "Fast Onboarding", desc: "Get new team members up to speed quickly" }
                            ].map((item) => (
                                <div key={item.title} className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                            <item.icon className="w-6 h-6 text-purple-400" />
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
                                <strong>TechCorp Engineering Team</strong> uses Second Brain Database for:
                            </p>
                            <ul className="space-y-2 pl-4">
                                <li>• Centralized API documentation and architecture diagrams</li>
                                <li>• Onboarding guides for new developers</li>
                                <li>• Meeting notes and decision logs</li>
                                <li>• Code review guidelines and best practices</li>
                                <li>• Incident response playbooks</li>
                            </ul>
                            <p className="italic text-white/60">
                                &quot;We reduced onboarding time from 2 weeks to 3 days by centralizing all our documentation in Second Brain Database.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/docs/getting-started"
                        className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
}
