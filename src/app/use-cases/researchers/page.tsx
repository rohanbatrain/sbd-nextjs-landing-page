import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { GraduationCap, FileText, Search, Share2 } from "lucide-react";

export default function ResearchersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="For Researchers"
                title="Organize Your Research Effortlessly"
                description="Manage papers, notes, and citations with AI-powered document intelligence and semantic search."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Perfect for Academic Research</h2>
                        <p className="text-white/70 text-lg">
                            Second Brain Database helps researchers manage their literature review, organize notes, and collaborate with colleagues - all while maintaining complete control over their data.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: FileText, title: "Document Management", desc: "Upload and process PDFs, DOCX, and other formats" },
                                { icon: Search, title: "Semantic Search", desc: "Find relevant information across all your documents" },
                                { icon: Share2, title: "Collaboration", desc: "Share workspaces with your research team" },
                                { icon: GraduationCap, title: "Citation Tracking", desc: "Organize references and citations" }
                            ].map((item) => (
                                <div key={item.title} className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                            <item.icon className="w-6 h-6 text-blue-400" />
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
                                <strong>Dr. Maria Rodriguez</strong>, a PhD researcher at Stanford, uses Second Brain Database to manage her literature review:
                            </p>
                            <ul className="space-y-2 pl-4">
                                <li>• Uploads 100+ research papers in PDF format</li>
                                <li>• Uses AI to extract key findings and tables</li>
                                <li>• Searches across all documents with semantic queries</li>
                                <li>• Shares workspace with her research team</li>
                                <li>• Exports citations in various formats</li>
                            </ul>
                            <p className="italic text-white/60">
                                &quot;The AI question-answering saves me hours every week. I can find relevant information across hundreds of papers instantly.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/docs/getting-started"
                        className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
}
