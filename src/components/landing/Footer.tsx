"use client";

import { Github, BookOpen } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-black/50 backdrop-blur-sm border-t border-white/10 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Second Brain Database</h3>
                        <p className="text-white/70 mb-4 text-sm">
                            Transform your knowledge management with AI-powered document intelligence, family collaboration, and enterprise-grade security.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/rohanbatrain/second_brain_database" target="_blank" rel="noopener noreferrer">
                                <Github className="w-6 h-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
                            </a>
                            <a href="/docs" target="_blank" rel="noopener noreferrer">
                                <BookOpen className="w-6 h-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                            <li><a href="#document-intelligence" className="hover:text-white transition-colors">Document Intelligence</a></li>
                            <li><a href="#family-collaboration" className="hover:text-white transition-colors">Family Collaboration</a></li>
                            <li><a href="#mcp-integration" className="hover:text-white transition-colors">MCP Server Tools</a></li>
                            <li><a href="#enterprise-security" className="hover:text-white transition-colors">Enterprise Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                            <li><a href="https://github.com/rohanbatrain/second_brain_database" className="hover:text-white transition-colors">GitHub Repository</a></li>
                            <li><a href="/docs" className="hover:text-white transition-colors">API Documentation</a></li>
                            <li><a href="/docs/mcp-tools" className="hover:text-white transition-colors">MCP Tools Guide</a></li>
                            <li><a href="/docs/setup" className="hover:text-white transition-colors">Quick Start Guide</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                            <li><a href="https://github.com/rohanbatrain/second_brain_database/discussions" className="hover:text-white transition-colors">GitHub Discussions</a></li>
                            <li><a href="https://github.com/rohanbatrain/second_brain_database/issues" className="hover:text-white transition-colors">Issue Tracker</a></li>
                            <li><a href="https://github.com/rohanbatrain/second_brain_database/blob/main/CONTRIBUTING.md" className="hover:text-white transition-colors">Contributing Guide</a></li>
                            <li><a href="https://github.com/rohanbatrain/second_brain_database/projects" className="hover:text-white transition-colors">Project Roadmap</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
                    <p>&copy; {new Date().getFullYear()} Second Brain Database. Open source under MIT License. Built with FastAPI, MongoDB, and cutting-edge AI technologies.</p>
                </div>
            </div>
        </footer>
    );
}
