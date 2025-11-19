"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    description: string;
    badge?: string;
    children?: ReactNode;
}

export default function PageHeader({ title, description, badge, children }: PageHeaderProps) {
    return (
        <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    {badge && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                                {badge}
                            </span>
                        </motion.div>
                    )}

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        {title}
                    </h1>

                    <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
                        {description}
                    </p>

                    {children}
                </motion.div>
            </div>
        </section>
    );
}
