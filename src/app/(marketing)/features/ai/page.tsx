import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import { Brain, Search, Zap, MessageSquare } from "lucide-react";

export default function AIPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="AI & RAG"
                title="Advanced AI Integration"
                description="LangChain, LangGraph, and Ollama integration with RAG pipeline and specialized AI agents."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { icon: Brain, title: "6 AI Agents", desc: "Specialized agents for different tasks" },
                        { icon: Search, title: "RAG Pipeline", desc: "Retrieval-augmented generation" },
                        { icon: Zap, title: "LangGraph Workflows", desc: "Complex agent orchestration" },
                        { icon: MessageSquare, title: "Ollama Support", desc: "Local LLM inference" }
                    ].map((item) => (
                        <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <item.icon className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">AI Agents</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: "Document Intelligence Agent", desc: "Processes and analyzes documents with OCR and table extraction" },
                                { name: "Question Answering Agent", desc: "Answers questions using RAG over your knowledge base" },
                                { name: "Summarization Agent", desc: "Generates concise summaries of long documents" },
                                { name: "Classification Agent", desc: "Automatically categorizes and tags content" },
                                { name: "Extraction Agent", desc: "Extracts structured data from unstructured text" },
                                { name: "Workflow Agent", desc: "Orchestrates complex multi-step AI workflows" }
                            ].map((agent) => (
                                <div key={agent.name} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
                                    <p className="text-white/70 text-sm">{agent.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Query with RAG</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/rag/query \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What are the key findings in my research papers?",
    "top_k": 5,
    "use_reranking": true
  }'`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {[
                                    { name: "LangChain", desc: "AI application framework" },
                                    { name: "LangGraph", desc: "Agent workflow orchestration" },
                                    { name: "Ollama", desc: "Local LLM inference" },
                                    { name: "ChromaDB", desc: "Vector database" },
                                    { name: "OpenAI", desc: "GPT models integration" },
                                    { name: "LangSmith", desc: "Monitoring and debugging" }
                                ].map((tech) => (
                                    <div key={tech.name}>
                                        <h4 className="text-white font-semibold mb-1">{tech.name}</h4>
                                        <p className="text-white/60 text-sm">{tech.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">RAG Pipeline</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <ol className="space-y-4">
                                <li className="flex gap-4">
                                    <span className="text-purple-400 font-bold">1.</span>
                                    <div>
                                        <strong className="text-white">Document Chunking:</strong>
                                        <span className="text-white/70"> Split documents into semantic chunks with configurable size and overlap</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-purple-400 font-bold">2.</span>
                                    <div>
                                        <strong className="text-white">Embedding Generation:</strong>
                                        <span className="text-white/70"> Generate vector embeddings for each chunk using OpenAI or local models</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-purple-400 font-bold">3.</span>
                                    <div>
                                        <strong className="text-white">Vector Storage:</strong>
                                        <span className="text-white/70"> Store embeddings in ChromaDB for fast similarity search</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-purple-400 font-bold">4.</span>
                                    <div>
                                        <strong className="text-white">Retrieval:</strong>
                                        <span className="text-white/70"> Find most relevant chunks using cosine similarity</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-purple-400 font-bold">5.</span>
                                    <div>
                                        <strong className="text-white">Generation:</strong>
                                        <span className="text-white/70"> Use LLM to generate answers based on retrieved context</span>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
