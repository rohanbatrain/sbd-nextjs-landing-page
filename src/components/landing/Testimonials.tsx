"use client";

import { Users, Shield } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="min-h-screen w-full flex flex-col bg-gradient-to-b to-[#040508] from-[#0C0F15] justify-center items-center relative py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl bp3:text-3xl bp4:text-4xl font-light mb-6 text-white">
                        Success Stories
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Real users transforming their knowledge management workflows
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <p className="text-white/80 mb-6 italic leading-relaxed">
                            &quot;As a PhD researcher, I was drowning in papers and notes. Second Brain Database&apos;s document intelligence features automatically categorize and link my research materials. The AI question-answering saves me hours every week.&quot;
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-semibold">Dr. Maria Rodriguez</p>
                                <p className="text-white/60 text-sm">Research Scientist, Stanford University</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <p className="text-white/80 mb-6 italic leading-relaxed">
                            &quot;We needed a knowledge management system that could handle sensitive client data with bank-level security. The comprehensive audit trails and encryption give us the compliance we need.&quot;
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-white font-semibold">Jennifer Chen</p>
                                <p className="text-white/60 text-sm">CTO, SecureData Consulting</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
