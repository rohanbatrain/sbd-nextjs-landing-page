import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import { FileText, Search, Table, Zap } from "lucide-react";

export default function DocumentsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Document Intelligence"
                title="AI-Powered Document Processing"
                description="Advanced document processing with OCR, table extraction, and RAG-optimized chunking for semantic search."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { icon: FileText, title: "Multi-Format Support", desc: "PDF, DOCX, PPTX, images" },
                        { icon: Search, title: "Semantic Search", desc: "Vector embeddings & RAG" },
                        { icon: Table, title: "Table Extraction", desc: "Structured data parsing" },
                        { icon: Zap, title: "Async Processing", desc: "Celery background tasks" }
                    ].map((item) => (
                        <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Upload and Process Documents</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/documents/upload \\
  -H "Authorization: Bearer $TOKEN" \\
  -F "file=@research_paper.pdf" \\
  -F "extract_tables=true" \\
  -F "enable_ocr=true"`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">RAG Chunking for Semantic Search</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/documents/{id}/chunk \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "chunk_size": 512,
    "chunk_overlap": 50,
    "enable_embeddings": true
  }'`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Features</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <div>
                                        <strong className="text-white">Docling Integration:</strong>
                                        <span className="text-white/70"> Advanced PDF, DOCX, and PPTX processing with layout preservation</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <div>
                                        <strong className="text-white">OCR Support:</strong>
                                        <span className="text-white/70"> Extract text from images and scanned documents</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <div>
                                        <strong className="text-white">Table Extraction:</strong>
                                        <span className="text-white/70"> Automatically detect and parse tables into structured data</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <div>
                                        <strong className="text-white">Vector Embeddings:</strong>
                                        <span className="text-white/70"> Generate embeddings for similarity search and RAG</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <div>
                                        <strong className="text-white">Async Processing:</strong>
                                        <span className="text-white/70"> Background task processing with Celery for large documents</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
