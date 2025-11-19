"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { motion } from "framer-motion";
import { Maximize2, RefreshCcw, ZoomIn, ZoomOut, Download, Image as ImageIcon } from "lucide-react";

// Initialize Mermaid globally once
if (typeof window !== 'undefined') {
  mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });
}

const ArchitectureMap: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const [scale, setScale] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const renderTokenRef = useRef<number>(0);
  const mountedRef = useRef<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const graphDefinition = `
    %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0f172a', 'primaryTextColor': '#f8fafc', 'primaryBorderColor': '#3b82f6', 'lineColor': '#64748b', 'secondaryColor': '#0f172a', 'tertiaryColor': '#1e293b'}}}%%
    graph TD
      classDef frontend fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff,rx:6,ry:6;
      classDef api fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#fff,rx:6,ry:6;
      classDef db fill:#1e063a,stroke:#8b5cf6,stroke-width:2px,color:#fff,rx:6,ry:6;
      classDef ai fill:#2b044e,stroke:#d946ef,stroke-width:2px,color:#fff,rx:6,ry:6;
      classDef worker fill:#3b0f07,stroke:#f97316,stroke-width:2px,color:#fff,stroke-dasharray:5 5,rx:6,ry:6;
      classDef external fill:#000000,stroke:#94a3b8,stroke-width:1px,color:#94a3b8,stroke-dasharray:5 5;

      subgraph "External / Client Layer"
        Landing[Next.js Landing Page<br/>submodules/sbd-landing-page]:::frontend
        Client[API Client / Micro-frontend]:::external
      end

      subgraph "Core System (Docker/K8s)"
        LB{Traefik / Nginx}
        subgraph "Application Layer"
            API[FastAPI Backend<br/>src/second_brain_database]:::api
            Auth[Auth Manager<br/>JWT / Fernet / Turnstile]:::api
        end

        subgraph "Data Persistence"
            Mongo[(MongoDB<br/>Motor Async)]:::db
            Redis[(Redis<br/>Cache & Pub/Sub)]:::db
            Qdrant[(Qdrant<br/>Vector Search)]:::db
        end

        subgraph "Async Workers"
            Queue(Celery / Redis Queue)
            Worker[Ingestion Worker]:::worker
            Docling[Docling<br/>OCR & Parsing]:::worker
        end

        subgraph "AI Processing Stack"
            LlamaIndex[LlamaIndex<br/>Orchestration]:::ai
            Ollama[Ollama<br/>Local LLM Host]:::ai
            Embed[Embedding Model]:::ai
        end

        subgraph "Agent Layer"
            FastMCP[FastMCP Server<br/>Agent Tools]:::api
        end
      end

      Client --> |HTTPS/WSS| LB
      Landing --> |API Calls| LB
      LB --> API
      API --> Auth
      API <--> |Read/Write| Redis
      API <--> |CRUD| Mongo
      API --> |Search| Qdrant
      API --> |Enqueue Job| Queue
      Queue --> Worker
      Worker --> |Parse| Docling
      Worker --> |Vectorize| Embed
      Embed --> |Store Vectors| Qdrant
      Worker --> |Store Meta| Mongo
      API --> |RAG Query| LlamaIndex
      LlamaIndex <--> |Context| Qdrant
      LlamaIndex --> |Generate| Ollama
      FastMCP <--> |Tool Execution| API
  `;

  useEffect(() => {
    // don't render until the component is visible (lazy load heavy work)
    if (!isVisible) return;

    // create a unique id per render to avoid conflicts with existing DOM nodes
    const renderId = `sbd-architecture-${Date.now()}`;

    // abort any previous render
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const render = async () => {
      // increment render token to invalidate any previous in-flight render
      renderTokenRef.current += 1;
      const token = renderTokenRef.current;

      try {
        // check if aborted
        if (signal.aborted) return;

        const { svg } = await mermaid.render(renderId, graphDefinition);

        // check if aborted or token changed
        if (signal.aborted || token !== renderTokenRef.current || !mountedRef.current) return;

        // Set SVG content in state - React will handle DOM updates
        if (mountedRef.current) {
          setSvgContent(svg);
          setIsLoaded(true);
          // allow the computeFitScale to run shortly after render
          setTimeout(() => computeFitScale(), 60);
        }
      } catch (err) {
        if (signal.aborted) return;
        if (process.env.NODE_ENV !== 'production') {
          console.error('Mermaid render error:', err);
        }
        // render a simple error fallback for users
        if (mountedRef.current) {
          setSvgContent('<pre class="text-xs text-red-400">Failed to render diagram</pre>');
        }
      }
    };

    render();

    return () => {
      // cleanup on unmount or re-render
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [graphDefinition, isVisible]);

  // IntersectionObserver: mark visible so we can lazy-load Mermaid
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      });
    }, { root: null, rootMargin: '400px', threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // compute scale to fit the wrapper
  const computeFitScale = () => {
    try {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const svgEl = wrapper.querySelector('svg');
      if (!svgEl) return;

      // Try to read viewBox if present
      let svgW = 0;
      let svgH = 0;
      const vb = svgEl.getAttribute('viewBox');
      if (vb) {
        const parts = vb.split(/\s+/).map(Number);
        if (parts.length === 4) {
          svgW = parts[2];
          svgH = parts[3];
        }
      }
      if (!svgW || !svgH) {
        const bbox = svgEl.getBBox();
        svgW = bbox.width || svgEl.clientWidth || 800;
        svgH = bbox.height || svgEl.clientHeight || 600;
      }

      const pad = 48; // padding inside wrapper
      const rect = wrapper.getBoundingClientRect();
      const scaleX = (rect.width - pad) / svgW;
      const scaleY = (rect.height - pad) / svgH;
      const fit = Math.max(0.5, Math.min(Math.max(scaleX, scaleY), 1.8));
      setScale(fit);
    } catch {
      // ignore
    }
  };

  const refreshDiagram = () => {
    // manual refresh: render mermaid again and set svgContent
    setIsLoaded(false);
    setSvgContent('');
    const renderId = `sbd-architecture-refresh-${Date.now()}`;
    mermaid.render(renderId, graphDefinition).then(({ svg }) => {
      if (mountedRef.current) {
        setSvgContent(svg);
        setIsLoaded(true);
        setPanX(0);
        setPanY(0);
        setTimeout(() => computeFitScale(), 60);
      }
    }).catch(() => {});
  };

  const zoomIn = () => setScale((s) => Math.min(s * 1.2, 4));
  const zoomOut = () => setScale((s) => Math.max(s / 1.2, 0.25));

  const toggleFullscreen = async () => {
    const el = wrapperRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen?.();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // ignore
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX - panX;
    const startY = e.clientY - panY;
    const handleMouseMove = (moveE: MouseEvent) => {
      setPanX(moveE.clientX - startX);
      setPanY(moveE.clientY - startY);
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.95 : 1.05;
      setScale(s => Math.max(0.25, Math.min(s * delta, 4)));
    }
  };

  const exportSvg = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPng = () => {
    const svgEl = wrapperRef.current?.querySelector('svg');
    if (!svgEl) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const img = document.createElement('img');
    img.alt = 'architecture diagram';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'architecture.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">System Architecture</h2>
          <p className="text-sm text-slate-400">Second Brain Database • Topology</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 px-3 py-1 bg-slate-900 rounded border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Frontend
            <span className="w-2 h-2 rounded-full bg-emerald-500 ml-2"></span> API
            <span className="w-2 h-2 rounded-full bg-violet-500 ml-2"></span> Data
            <span className="w-2 h-2 rounded-full bg-fuchsia-500 ml-2"></span> AI
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#020617] shadow-2xl"
      >
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            title="Refresh"
            onClick={refreshDiagram}
            className="p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-lg backdrop-blur-sm transition-colors"
          >
            <RefreshCcw size={16} />
          </button>

          <button
            title="Zoom In"
            onClick={zoomIn}
            className="p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-lg backdrop-blur-sm transition-colors"
          >
            <ZoomIn size={16} />
          </button>

          <button
            title="Zoom Out"
            onClick={zoomOut}
            className="p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-lg backdrop-blur-sm transition-colors"
          >
            <ZoomOut size={16} />
          </button>

          <button
            title="Fullscreen"
            onClick={toggleFullscreen}
            className="p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-lg backdrop-blur-sm transition-colors"
          >
            <Maximize2 size={16} />
          </button>

          <button
            title="Export SVG"
            onClick={exportSvg}
            className="p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-lg backdrop-blur-sm transition-colors"
          >
            <Download size={16} />
          </button>

          <button
            title="Export PNG"
            onClick={exportPng}
            className="p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-lg backdrop-blur-sm transition-colors"
          >
            <ImageIcon size={16} aria-hidden="true" />
          </button>
        </div>

        <div ref={wrapperRef} className="w-full h-[720px] min-h-[520px] flex items-center justify-center p-8 overflow-auto" onMouseDown={handleMouseDown} onWheel={handleWheel}>
          {!isLoaded && <span className="text-slate-500 animate-pulse">Rendering Schematics...</span>}
          {isLoaded && svgContent && (
            <div
              style={{ transform: `translate(${panX}px, ${panY}px) scale(${scale})`, transformOrigin: 'center top' }}
              className="transition-transform"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur text-xs text-slate-400 py-2 px-4 border-t border-slate-800 flex justify-between">
          <span>Generated via Mermaid.js</span>
          <span className="font-mono">Config: .sbd • Port: 8000</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ArchitectureMap;
