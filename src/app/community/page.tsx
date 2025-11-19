import PageHeader from "@/components/layout/PageHeader";
import { Github, MessageCircle, Book, Heart } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Community"
                title="Join the Second Brain Community"
                description="Connect with other users, contribute to the project, and get help from the community."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
                    {[
                        {
                            icon: Github,
                            title: "GitHub",
                            description: "Contribute code, report issues, and follow development",
                            href: "https://github.com/rohanbatrain/second_brain_database",
                            cta: "View Repository"
                        },
                        {
                            icon: MessageCircle,
                            title: "Discussions",
                            description: "Ask questions, share ideas, and connect with the community",
                            href: "https://github.com/rohanbatrain/second_brain_database/discussions",
                            cta: "Join Discussions"
                        },
                        {
                            icon: Book,
                            title: "Documentation",
                            description: "Comprehensive guides and API reference",
                            href: "/docs",
                            cta: "Read Docs"
                        },
                        {
                            icon: Heart,
                            title: "Contributing",
                            description: "Learn how to contribute to the project",
                            href: "https://github.com/rohanbatrain/second_brain_database/blob/main/CONTRIBUTING.md",
                            cta: "Contribution Guide"
                        }
                    ].map((item) => (
                        <a
                            key={item.title}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                            <item.icon className="w-12 h-12 text-blue-400 mb-4" />
                            <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                            <p className="text-white/70 mb-4">{item.description}</p>
                            <span className="text-blue-400 font-medium">{item.cta} →</span>
                        </a>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Ways to Contribute</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Code", desc: "Submit pull requests with new features or bug fixes" },
                            { title: "Documentation", desc: "Improve guides, add examples, fix typos" },
                            { title: "Testing", desc: "Test new features and report bugs" },
                            { title: "Design", desc: "Improve UI/UX and create assets" },
                            { title: "Support", desc: "Help other users in discussions" },
                            { title: "Feedback", desc: "Share your ideas and suggestions" }
                        ].map((way) => (
                            <div key={way.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-2">{way.title}</h3>
                                <p className="text-white/70 text-sm">{way.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
