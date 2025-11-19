'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Paperclip, Mic } from 'lucide-react';
import { useState } from 'react';

export function ChatInterface() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: 'Hello! I am your Second Brain AI. How can I help you organize your thoughts today?' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), role: 'user', content: input };
        setMessages([...messages, newMsg]);
        setInput('');

        // Simulate response
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: 'I have noted that down. Would you like me to create a task for it?' }]);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
            <Card className="flex-1 bg-white/5 border-white/10 flex flex-col overflow-hidden">
                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                                }`}>
                                {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                            </div>
                            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'assistant'
                                ? 'bg-white/10 text-white rounded-tl-none'
                                : 'bg-blue-600 text-white rounded-tr-none'
                                }`}>
                                <p className="leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-3 max-w-4xl mx-auto">
                        <Button size="icon" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                            <Paperclip className="w-5 h-5" />
                        </Button>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask anything or type a command..."
                                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white hover:bg-white/10"
                            >
                                <Mic className="w-4 h-4" />
                            </Button>
                        </div>
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg shadow-blue-900/20"
                        >
                            <Send className="w-5 h-5 ml-0.5" />
                        </Button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-white/30">AI can make mistakes. Review generated content.</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
