import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";

export default function DeploymentPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Deployment"
                title="Production Deployment Guide"
                description="Deploy Second Brain Database to production with Docker, environment configuration, and scaling strategies."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Docker Deployment</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">1. Build Docker Image</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`docker build -t second-brain-db:latest .`}
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">2. Run with Docker Compose</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`docker-compose up -d

# Scale workers
docker-compose up -d --scale celery-worker=4`}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Environment Variables</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <div className="space-y-4">
                                {[
                                    { name: "MONGODB_URL", desc: "MongoDB connection string", required: true },
                                    { name: "REDIS_URL", desc: "Redis connection string", required: true },
                                    { name: "JWT_SECRET_KEY", desc: "Secret key for JWT tokens", required: true },
                                    { name: "DEBUG", desc: "Enable debug mode (False in production)", required: false },
                                    { name: "CORS_ORIGINS", desc: "Allowed CORS origins", required: false },
                                    { name: "RATE_LIMIT_ENABLED", desc: "Enable rate limiting", required: false }
                                ].map((env) => (
                                    <div key={env.name} className="flex items-start gap-4">
                                        <code className="text-blue-400 font-mono text-sm min-w-[200px]">{env.name}</code>
                                        <div className="flex-1">
                                            <p className="text-white/80 text-sm">{env.desc}</p>
                                            {env.required && <span className="text-red-400 text-xs">Required</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Production Checklist</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <ul className="space-y-3">
                                {[
                                    "Set DEBUG=False in environment",
                                    "Use strong JWT_SECRET_KEY (32+ characters)",
                                    "Configure production database URLs",
                                    "Set up SSL/TLS certificates",
                                    "Enable rate limiting",
                                    "Configure CORS for your domain",
                                    "Set up backup strategy for MongoDB",
                                    "Configure monitoring and alerting",
                                    "Review security settings",
                                    "Test disaster recovery procedures"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <input type="checkbox" className="mt-1" />
                                        <span className="text-white/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Scaling Strategies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Horizontal Scaling", desc: "Add more FastAPI server instances behind a load balancer" },
                                { title: "Worker Scaling", desc: "Increase Celery workers for background task processing" },
                                { title: "Database Sharding", desc: "Partition MongoDB data across multiple servers" },
                                { title: "Redis Clustering", desc: "Distribute cache and queues across Redis cluster" },
                                { title: "CDN Integration", desc: "Serve static assets via CDN for faster delivery" },
                                { title: "Caching Strategy", desc: "Implement multi-layer caching with Redis" }
                            ].map((strategy) => (
                                <div key={strategy.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-2">{strategy.title}</h3>
                                    <p className="text-white/70 text-sm">{strategy.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Monitoring</h2>
                        <div className="space-y-4">
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-3">Health Endpoints</h3>
                                <div className="space-y-2 font-mono text-sm">
                                    <div className="text-white/80">GET /health - Overall system health</div>
                                    <div className="text-white/80">GET /health/db - Database connectivity</div>
                                    <div className="text-white/80">GET /health/redis - Redis connectivity</div>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-3">Monitoring Tools</h3>
                                <ul className="space-y-2 text-white/70">
                                    <li>• <strong>Flower:</strong> Celery task monitoring (port 5555)</li>
                                    <li>• <strong>Prometheus:</strong> Metrics collection and alerting</li>
                                    <li>• <strong>Loki:</strong> Centralized logging</li>
                                    <li>• <strong>LangSmith:</strong> AI agent monitoring</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
