import PageHeader from "@/components/layout/PageHeader";

export default function ArchitecturePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Architecture"
                title="System Architecture"
                description="Understanding the technical architecture and design patterns of Second Brain Database."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">System Overview</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <pre className="text-white/80 font-mono text-sm overflow-x-auto">
                                {`┌─────────────────────────────────────────────────────────────┐
│                   Second Brain Database                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────┐  ┌───────────────┐                       │
│  │   FastAPI     │  │    Celery     │                       │
│  │   Server      │  │   Workers     │                       │
│  │  (REST/WS)    │  │               │                       │
│  └───────┬───────┘  └───────┬───────┘                       │
│          │                  │                                  │
│  ┌───────▼──────────────────▼────────────────────────────┐   │
│  │          Redis (Cache, Queue, Sessions)             │   │
│  └────────────────────────┬─────────────────────────────┘   │
│                           │                                  │
│  ┌────────────────────────▼─────────────────────────────┐   │
│  │          MongoDB (Primary Database)                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘`}
                            </pre>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { category: "Backend", items: ["FastAPI", "Python 3.11+", "Pydantic"] },
                                { category: "Database", items: ["MongoDB", "Redis", "Motor (async)"] },
                                { category: "Documents", items: ["Docling", "PyPDF", "OCR"] },
                                { category: "Tasks", items: ["Celery", "Celery Beat", "Flower"] },
                                { category: "Protocol", items: ["FastMCP 2.x", "WebSocket", "REST"] },
                                { category: "Security", items: ["JWT", "Fernet", "2FA", "Rate Limiting"] },
                                { category: "AI/ML", items: ["LangChain", "LangGraph", "Ollama"] },
                                { category: "Monitoring", items: ["Loki", "Prometheus", "LangSmith"] }
                            ].map((stack) => (
                                <div key={stack.category} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-3">{stack.category}</h3>
                                    <ul className="space-y-1">
                                        {stack.items.map((item) => (
                                            <li key={item} className="text-white/70 text-sm">• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Design Patterns</h2>
                        <div className="space-y-4">
                            {[
                                { name: "Repository Pattern", desc: "Data access abstraction with MongoDB repositories" },
                                { name: "Manager Pattern", desc: "Business logic encapsulation in manager classes" },
                                { name: "Factory Pattern", desc: "Object creation for complex entities" },
                                { name: "Observer Pattern", desc: "Event-driven notifications and webhooks" },
                                { name: "Strategy Pattern", desc: "Pluggable algorithms for document processing" },
                                { name: "Domain-Driven Design", desc: "Clear separation of business logic and infrastructure" }
                            ].map((pattern) => (
                                <div key={pattern.name} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-2">{pattern.name}</h3>
                                    <p className="text-white/70 text-sm">{pattern.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Data Flow</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <ol className="space-y-4">
                                <li className="flex gap-4">
                                    <span className="text-blue-400 font-bold">1.</span>
                                    <div>
                                        <strong className="text-white">Request:</strong>
                                        <span className="text-white/70"> Client sends HTTP request to FastAPI server</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-blue-400 font-bold">2.</span>
                                    <div>
                                        <strong className="text-white">Authentication:</strong>
                                        <span className="text-white/70"> JWT token validated, user session retrieved from Redis</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-blue-400 font-bold">3.</span>
                                    <div>
                                        <strong className="text-white">Business Logic:</strong>
                                        <span className="text-white/70"> Manager classes process request, apply business rules</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-blue-400 font-bold">4.</span>
                                    <div>
                                        <strong className="text-white">Data Access:</strong>
                                        <span className="text-white/70"> Repository classes interact with MongoDB</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-blue-400 font-bold">5.</span>
                                    <div>
                                        <strong className="text-white">Background Tasks:</strong>
                                        <span className="text-white/70"> Heavy operations queued to Celery via Redis</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-blue-400 font-bold">6.</span>
                                    <div>
                                        <strong className="text-white">Response:</strong>
                                        <span className="text-white/70"> JSON response returned to client</span>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Scalability</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <p className="text-white/80 mb-4">
                                Second Brain Database is designed for horizontal scalability:
                            </p>
                            <ul className="space-y-2 text-white/70">
                                <li>• <strong>Stateless API:</strong> FastAPI servers can be scaled horizontally</li>
                                <li>• <strong>Worker Scaling:</strong> Add more Celery workers for background tasks</li>
                                <li>• <strong>Database Sharding:</strong> MongoDB supports horizontal partitioning</li>
                                <li>• <strong>Redis Clustering:</strong> Distribute cache and queue across nodes</li>
                                <li>• <strong>Load Balancing:</strong> Use nginx or cloud load balancers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
