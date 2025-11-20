import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import Link from "next/link";

export default function GettingStartedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Getting Started"
                title="Get Up and Running in Minutes"
                description="Follow this guide to install and configure Second Brain Database on your system."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <ul className="space-y-2 text-white/80">
                                <li>• <strong>Python 3.11+</strong> installed on your system</li>
                                <li>• <strong>MongoDB 6.0+</strong> (Docker recommended)</li>
                                <li>• <strong>Redis 7.0+</strong> for caching and queues</li>
                                <li>• <strong>uv</strong> package manager (recommended)</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Step 1: Clone the Repository</h2>
                        <CodeBlock
                            language="bash"
                            code={`git clone https://github.com/rohanbatrain/second_brain_database.git
cd second_brain_database`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Step 2: Install Dependencies</h2>
                        <CodeBlock
                            language="bash"
                            code={`# Create virtual environment and install dependencies
uv venv && source .venv/bin/activate  # macOS/Linux
uv pip install -r requirements.txt`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Step 3: Start MongoDB</h2>
                        <CodeBlock
                            language="bash"
                            code={`# Using Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo

# Or start existing container
docker start mongodb`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Step 4: Configure Environment</h2>
                        <CodeBlock
                            language="bash"
                            code={`# Copy example configuration
cp .sbd-example .sbd

# Edit .sbd with your settings
# Required: MONGODB_URL, REDIS_URL, JWT_SECRET_KEY`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Step 5: Start All Services</h2>
                        <CodeBlock
                            language="bash"
                            code={`# Automatic startup (recommended)
./start.sh

# This starts:
# - FastAPI server (port 8000)
# - Celery worker (background tasks)
# - Celery beat (scheduled tasks)
# - Flower (task monitoring on port 5555)`}
                        />
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">🎉 Success!</h3>
                        <p className="text-white/80 mb-4">
                            Your API is now running at <code className="text-blue-400">http://localhost:8000</code>
                        </p>
                        <p className="text-white/70 mb-6">
                            Visit the interactive API documentation at <code className="text-blue-400">http://localhost:8000/docs</code>
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="/docs/api"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                View API Reference
                            </Link>
                            <Link
                                href="/docs/architecture"
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                            >
                                Learn Architecture
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Next Steps</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Link href="/docs/api" className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-semibold text-white mb-2">Explore the API</h3>
                                <p className="text-white/70 text-sm">Learn about available endpoints and how to use them</p>
                            </Link>
                            <Link href="/docs/deployment" className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-semibold text-white mb-2">Deploy to Production</h3>
                                <p className="text-white/70 text-sm">Learn how to deploy with Docker and scale your instance</p>
                            </Link>
                            <Link href="/docs/mcp-tools" className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-semibold text-white mb-2">Use MCP Tools</h3>
                                <p className="text-white/70 text-sm">Integrate with AI agents using 138+ available tools</p>
                            </Link>
                            <a href="https://github.com/rohanbatrain/second_brain_database" target="_blank" rel="noopener noreferrer" className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-semibold text-white mb-2">Contribute</h3>
                                <p className="text-white/70 text-sm">Help improve the project on GitHub</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
