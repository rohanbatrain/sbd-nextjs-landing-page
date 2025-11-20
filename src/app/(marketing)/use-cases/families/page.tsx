import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Users, Wallet, Calendar, FileText } from "lucide-react";

export default function FamiliesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="For Families"
                title="Your Family's Digital Hub"
                description="Shared knowledge base, document storage, and collaborative tools for modern families."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Perfect for Family Organization</h2>
                        <p className="text-white/70 text-lg">
                            Keep your family organized with shared documents, calendars, budgets, and knowledge management - all in one secure place.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: FileText, title: "Shared Documents", desc: "Store important family documents securely" },
                                { icon: Wallet, title: "Budget Tracking", desc: "Manage family finances with shared wallets" },
                                { icon: Calendar, title: "Family Calendar", desc: "Coordinate schedules and events" },
                                { icon: Users, title: "Member Permissions", desc: "Control who can access what" }
                            ].map((item) => (
                                <div key={item.title} className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <item.icon className="w-6 h-6 text-green-400" />
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
                                <strong>The Johnson Family</strong> uses Second Brain Database to stay organized:
                            </p>
                            <ul className="space-y-2 pl-4">
                                <li>• Store medical records, insurance documents, and important files</li>
                                <li>• Share grocery lists and meal planning</li>
                                <li>• Track family budget and expenses</li>
                                <li>• Coordinate schedules for 4 family members</li>
                                <li>• Share recipes and family traditions</li>
                            </ul>
                            <p className="italic text-white/60">
                                &quot;Having everything in one place has made our family life so much easier. No more searching for documents or missing appointments!&quot;
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/docs/getting-started"
                        className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
}
