"use client";

import { motion } from "framer-motion";
import { Brain, Database, Users, Code, Github, BookOpen } from "lucide-react";
import { HoverBorderGradient } from "@/components/components/FramerButton";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-16 container mx-auto px-4 z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 flex flex-col gap-8 items-center justify-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block"
                >
                    <span className="relative px-4 py-2 rounded-xl flex flex-row gap-2 items-center bg-white/10 text-sm text-white/90 backdrop-blur-sm border border-white/10 overflow-hidden">
                        <motion.div
                            className="absolute top-0 w-[10px] h-full bg-blue-300 opacity-60 blur-md shadow-2xl"
                            initial={{ left: "-10%" }}
                            animate={{ left: "110%" }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear",
                            }}
                        />
                        <Brain className="w-4 h-4 relative z-10" />
                        <p className="relative z-10">
                            AI-POWERED KNOWLEDGE MANAGEMENT INFRASTRUCTURE
                        </p>
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl bp3:text-4xl bp4:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] font-bold tracking-tight"
                >
                    The Headless Architecture for <br className="hidden md:block" /> Your Second Brain
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-3xl mx-auto text-lg text-white/80 leading-relaxed"
                >
                    A comprehensive FastAPI application with document intelligence, family/workspace management, MCP server integration, and enterprise-grade security. Built on MongoDB, Redis, and modern Python practices.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full"
                >
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <Database className="w-8 h-8 text-blue-400 shrink-0" />
                        <div className="text-left">
                            <p className="text-white font-medium">Document Intelligence</p>
                            <p className="text-white/60 text-sm">AI-powered processing with OCR, RAG search</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <Users className="w-8 h-8 text-green-400 shrink-0" />
                        <div className="text-left">
                            <p className="text-white font-medium">Family Collaboration</p>
                            <p className="text-white/60 text-sm">Shared wallets, permissions, real-time sync</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <Code className="w-8 h-8 text-purple-400 shrink-0" />
                        <div className="text-left">
                            <p className="text-white font-medium">MCP Integration</p>
                            <p className="text-white/60 text-sm">138+ tools for AI agent connectivity</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="space-y-4 flex flex-col items-center justify-center pt-4"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="https://github.com/rohanbatrain/second_brain_database" target="_blank" rel="noopener noreferrer">
                            <HoverBorderGradient className="bg-gradient-to-b from-blue-600 to-blue-800 px-8 py-3 text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto">
                                <Github className="w-5 h-5" />
                                View on GitHub
                            </HoverBorderGradient>
                        </a>
                        <a href="/docs/architecture">
                            <HoverBorderGradient className="bg-gradient-to-b from-gray-700 to-gray-900 px-8 py-3 text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto">
                                <BookOpen className="w-5 h-5" />
                                Read Architecture
                            </HoverBorderGradient>
                        </a>
                    </div>
                    <p className="text-sm text-white/40">
                        Don&apos;t have an account?{' '}
                        <a href="/auth/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Get started
                        </a>
                    </p>
                    <p className="text-sm text-white/40 font-mono">
                        Production-ready • Open source • Enterprise-grade
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
