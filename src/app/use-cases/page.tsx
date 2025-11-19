import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";

export default function UseCasesPage() {
    const useCases = [
        {
            title: "For Researchers",
            description: "Manage papers, notes, and citations with AI-powered document intelligence",
            href: "/use-cases/researchers",
            color: "blue"
        },
        {
            title: "For Families",
            description: "Shared knowledge base, document storage, and budget tracking",
            href: "/use-cases/families",
            color: "green"
        },
        {
            title: "For Teams",
            description: "Project documentation, knowledge sharing, and collaboration",
            href: "/use-cases/teams",
            color: "purple"
        },
        {
            title: "For Developers",
            description: "API integration, MCP tools, and self-hosting",
            href: "/use-cases/developers",
            color: "orange"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Use Cases"
                title="Built for Everyone"
                description="See how different users leverage Second Brain Database for their unique needs."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {useCases.map((useCase) => (
                        <Link
                            key={useCase.title}
                            href={useCase.href}
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                            <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                            <p className="text-white/70">{useCase.description}</p>
                            <span className={`text-${useCase.color}-400 font-medium mt-4 inline-block`}>
                                Learn more →
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
