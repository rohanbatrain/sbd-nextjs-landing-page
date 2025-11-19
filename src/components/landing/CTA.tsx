"use client";

import { motion } from "framer-motion";
import { Github, BookOpen, Play } from "lucide-react";
import { HoverBorderGradient } from "@/components/components/FramerButton";

export default function CTA() {
    return (
        <section className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#040508] to-[#0C0F15] justify-center items-center relative py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-6xl bp3:text-4xl bp4:text-5xl font-light mb-6 text-white">
                    Ready to Build Your Second Brain?
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
                    Join the growing community of developers and organizations using Second Brain Database for production-ready knowledge management.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">Flexibility</h3>
                        <p className="text-white/70 text-sm">Easily migrate your data and switch platforms without losing consistency.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">Centralized Data</h3>
                        <p className="text-white/70 text-sm">Keep your data organized, regardless of the tool you use to interact with it.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">Modular Micro Frontends</h3>
                        <p className="text-white/70 text-sm">Focus on specific tasks without unnecessary complexity.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">Open Source</h3>
                        <p className="text-white/70 text-sm">Contribute to the project and help it evolve over time.</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a href="https://github.com/rohanbatrain/second_brain_database" target="_blank" rel="noopener noreferrer">
                        <HoverBorderGradient className="bg-gradient-to-b from-blue-600 to-blue-800 px-8 py-4 text-white font-medium text-lg flex items-center gap-2">
                            <Github className="w-5 h-5" />
                            View on GitHub
                        </HoverBorderGradient>
                    </a>
                    <a href="/docs">
                        <HoverBorderGradient className="bg-gradient-to-b from-green-600 to-green-800 px-8 py-4 text-white font-medium text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Read Documentation
                        </HoverBorderGradient>
                    </a>
                    <HoverBorderGradient className="bg-gradient-to-b from-purple-600 to-purple-800 px-8 py-4 text-white font-medium text-lg flex items-center gap-2">
                        <Play className="w-5 h-5" />
                        Try Live Demo
                    </HoverBorderGradient>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-white/60 mb-4">Trusted by developers worldwide</p>
                    <div className="flex justify-center gap-8 text-white/40 text-sm">
                        <span>MIT Licensed</span>
                        <span>•</span>
                        <span>Production Ready</span>
                        <span>•</span>
                        <span>Enterprise Security</span>
                    </div>
                </div>
            </div>

            {/* Thank You Section */}
            <div className="container mx-auto px-4 py-20 text-center mt-20 border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl bp3:text-3xl bp4:text-4xl font-light mb-6 text-white">
                        🙏 Thank You for Your Support
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
                        This journey has been long, and I&apos;m thrilled to share this tool with you. I hope Second Brain Database can help you organize your thoughts, tasks, and knowledge in a way that gives you the freedom to explore new productivity systems without being restricted by them.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 max-w-2xl mx-auto mb-12"
                >
                    <p className="text-lg text-white/80 mb-6">
                        Stay tuned for the upcoming beta release announcement. If you&apos;re ready to explore, learn, or contribute, check out the project on GitHub. Together, we can make it even better!
                    </p>
                    <div className="flex justify-center">
                        <a href="https://github.com/rohanbatrain/second_brain_database" target="_blank" rel="noopener noreferrer">
                            <HoverBorderGradient className="bg-gradient-to-b from-blue-600 to-blue-800 px-6 py-3 text-white font-medium flex items-center gap-2">
                                <Github className="w-5 h-5" />
                                Join the Community
                            </HoverBorderGradient>
                        </a>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-white/60 italic"
                >
                    Let&apos;s build smarter, more adaptable systems for managing our thoughts and data. 🚀
                </motion.p>
            </div>
        </section>
    );
}
