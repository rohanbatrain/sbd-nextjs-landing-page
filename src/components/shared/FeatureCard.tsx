"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    features?: string[];
    href?: string;
}

export default function FeatureCard({ icon: Icon, title, description, features, href }: FeatureCardProps) {
    const Card = ({ children }: { children: ReactNode }) => (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 h-full">
            {children}
        </div>
    );

    const content = (
        <>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
            <p className="text-white/70 mb-4">{description}</p>
            {features && features.length > 0 && (
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="text-white/60 text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );

    if (href) {
        return (
            <a href={href} className="block h-full">
                <Card>{content}</Card>
            </a>
        );
    }

    return <Card>{content}</Card>;
}
