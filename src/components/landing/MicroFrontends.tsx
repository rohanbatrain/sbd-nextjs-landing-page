"use client";

import { motion } from "framer-motion";
import { Brain, Database, MessageSquare, BookOpen, Users, ShoppingBag, Network, Sparkles } from "lucide-react";
import { HoverBorderGradient } from "@/components/components/FramerButton";

const microFrontends = [
    {
        name: "IPAM",
        icon: Network,
        color: "purple",
        description: "Intelligent IP Address Management with hierarchical allocation, real-time monitoring, and audit trails.",
        features: [
            "Hierarchical Allocation",
            "Real-time Monitoring",
            "Audit Trails",
            "Network Analytics"
        ]
    },
    {
        name: "AI Chat",
        icon: MessageSquare,
        color: "blue",
        description: "AI-powered conversational platform with LangGraph workflows, Vector RAG, and intelligent routing.",
        features: [
            "LangGraph Integration",
            "Vector RAG Search",
            "Streaming Responses",
            "Tool Calling"
        ]
    },
    {
        name: "Blog Platform",
        icon: BookOpen,
        color: "green",
        description: "Modern blogging platform with rich text editing, markdown support, and content management.",
        features: [
            "Rich Text Editor",
            "Markdown Support",
            "Tag Management",
            "SEO Optimization"
        ]
    },
    {
        name: "University Clubs",
        icon: Users,
        color: "amber",
        description: "Campus club management system for events, memberships, and student engagement.",
        features: [
            "Event Management",
            "Member Tracking",
            "Announcements",
            "Club Analytics"
        ]
    },
    {
        name: "Family Hub",
        icon: Users,
        color: "pink",
        description: "Family coordination platform with shared calendars, tasks, and SBD token management.",
        features: [
            "Shared Calendar",
            "Task Management",
            "Token System",
            "Family Chat"
        ]
    },
    {
        name: "Digital Shop",
        icon: ShoppingBag,
        color: "cyan",
        description: "Digital asset marketplace for purchasing and managing virtual items and collectibles.",
        features: [
            "Asset Catalog",
            "Purchase History",
            "Inventory Management",
            "Token Payments"
        ]
    },
    {
        name: "MemEx",
        icon: Brain,
        color: "indigo",
        description: "Personal knowledge management and memory extension system for capturing and organizing thoughts.",
        features: [
            "Knowledge Graph",
            "Quick Capture",
            "Smart Search",
            "Link Discovery"
        ]
    },
    {
        name: "Raunak AI",
        icon: Sparkles,
        color: "violet",
        description: "AI assistant platform with personalized interactions and intelligent task automation.",
        features: [
            "AI Conversations",
            "Task Automation",
            "Smart Suggestions",
            "Learning System"
        ]
    }
];

const colorClasses = {
    purple: "bg-purple-500/20 text-purple-400",
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    amber: "bg-amber-500/20 text-amber-400",
    pink: "bg-pink-500/20 text-pink-400",
    cyan: "bg-cyan-500/20 text-cyan-400",
    indigo: "bg-indigo-500/20 text-indigo-400",
    violet: "bg-violet-500/20 text-violet-400"
};

export default function MicroFrontends() {
    return (
        <section className="min-h-screen w-full flex flex-col bg-gradient-to-b to-[#040508] from-[#0C0F15] justify-center items-center relative py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl bp3:text-3xl bp4:text-4xl font-light mb-6 text-white">
                        🧠 Micro Frontends: Solving Complex Problems Simply
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
                        The project incorporates micro frontends to keep things modular and focused. Each frontend is purpose-built for specific use cases.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {microFrontends.map((frontend, index) => {
                        const Icon = frontend.icon;
                        return (
                            <motion.div
                                key={frontend.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[frontend.color as keyof typeof colorClasses]}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">{frontend.name}</h3>
                                </div>
                                <p className="text-white/80 mb-4 text-sm">
                                    {frontend.description}
                                </p>
                                <ul className="text-white/70 space-y-1 text-sm">
                                    {frontend.features.map((feature) => (
                                        <li key={feature}>• {feature}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-12">
                    <HoverBorderGradient
                        className="bg-gradient-to-b from-green-600 to-green-800 px-8 py-3 text-white font-medium rounded-full mx-auto"
                        onClick={() => window.location.href = '/microfrontends'}
                    >
                        Explore All Microfrontends
                    </HoverBorderGradient>
                </div>
            </div>
        </section>
    );
}
