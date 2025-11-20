import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import { Shield, Key, Lock, Eye } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="Security & Encryption"
                title="Zero-Trust Architecture"
                description="Client-side encryption, comprehensive security features, and complete data control."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { icon: Shield, title: "Zero-Trust", desc: "User-controlled encryption keys" },
                        { icon: Key, title: "Client-Side Encryption", desc: "Data encrypted before transmission" },
                        { icon: Lock, title: "JWT + 2FA", desc: "Multi-factor authentication" },
                        { icon: Eye, title: "Audit Logging", desc: "Complete activity tracking" }
                    ].map((item) => (
                        <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <item.icon className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">🔐 Privacy & Encryption</h2>
                        <div className="space-y-4 text-white/80">
                            <p>
                                <strong>Client-Side Encryption:</strong> Optional feature (disabled by default) that can only be enabled during account creation. When enabled, protects sensitive content like notes with user-controlled keys.
                            </p>
                            <p>
                                <strong>Functional Data:</strong> Analytical features (emotion tracking, mathematical metrics) remain unencrypted for performance and usability.
                            </p>
                            <p>
                                <strong>Self-Hosting Option:</strong> For maximum privacy, users can switch to self-hosted instances with complete data control.
                            </p>
                            <p>
                                <strong>Freedom Philosophy:</strong> The system values user choice - configure encryption and hosting to meet your specific privacy needs.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Security Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "JWT Authentication",
                                    desc: "Secure token-based authentication with refresh tokens and automatic expiration."
                                },
                                {
                                    title: "2FA Support",
                                    desc: "TOTP and SMS-based two-factor authentication for enhanced security."
                                },
                                {
                                    title: "Rate Limiting",
                                    desc: "DDoS protection with configurable rate limits per endpoint."
                                },
                                {
                                    title: "IP Whitelisting",
                                    desc: "Restrict access to trusted IP addresses and devices."
                                },
                                {
                                    title: "Audit Logging",
                                    desc: "Comprehensive logging of all security-relevant events."
                                },
                                {
                                    title: "Encryption at Rest",
                                    desc: "Fernet-based encryption for sensitive data in the database."
                                }
                            ].map((feature) => (
                                <div key={feature.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/70 text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Enable 2FA</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/auth/2fa/enable \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "totp"
  }'`}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
