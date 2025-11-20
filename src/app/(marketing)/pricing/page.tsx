import PageHeader from "@/components/layout/PageHeader";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    const tiers = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for individuals and small projects",
            features: [
                "Document processing (100/month)",
                "Basic MCP integration",
                "Community support",
                "Self-hosted deployment",
                "Open source access"
            ],
            cta: "Get Started",
            href: "/docs/getting-started",
            highlighted: false
        },
        {
            name: "Pro",
            price: "$29",
            description: "For professionals and growing teams",
            features: [
                "Unlimited document processing",
                "Family collaboration",
                "Workspace management",
                "IPAM system",
                "AI & RAG features",
                "Priority support",
                "Advanced MCP tools"
            ],
            cta: "Start Free Trial",
            href: "#",
            highlighted: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For organizations with advanced needs",
            features: [
                "Everything in Pro",
                "Client-side encryption",
                "Dedicated support",
                "SLA guarantees",
                "Custom integrations",
                "On-premise deployment",
                "Training & onboarding"
            ],
            cta: "Contact Sales",
            href: "#",
            highlighted: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Pricing"
                title="Choose Your Plan"
                description="Start free and scale as you grow. All plans include core features and open source access."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`bg-white/5 backdrop-blur-sm rounded-lg p-8 border ${tier.highlighted
                                    ? "border-blue-500/50 ring-2 ring-blue-500/20 scale-105"
                                    : "border-white/10"
                                } relative`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="text-4xl font-bold text-white mb-2">
                                    {tier.price}
                                    {tier.price !== "Custom" && <span className="text-lg text-white/60">/month</span>}
                                </div>
                                <p className="text-white/70">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                        <span className="text-white/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={tier.href}
                                className={`block w-full py-3 text-center rounded-lg font-medium transition-colors ${tier.highlighted
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "Can I self-host Second Brain Database?",
                                a: "Yes! Second Brain Database is open source and can be self-hosted on your own infrastructure. All features are available for self-hosted deployments."
                            },
                            {
                                q: "What payment methods do you accept?",
                                a: "We accept all major credit cards, PayPal, and can arrange invoicing for enterprise customers."
                            },
                            {
                                q: "Can I change plans later?",
                                a: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                            },
                            {
                                q: "Is there a free trial?",
                                a: "Yes, Pro plan includes a 14-day free trial with no credit card required."
                            }
                        ].map((faq) => (
                            <div key={faq.q} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                                <p className="text-white/70">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
