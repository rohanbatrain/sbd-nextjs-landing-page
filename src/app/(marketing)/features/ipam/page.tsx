import PageHeader from "@/components/layout/PageHeader";
import CodeBlock from "@/components/shared/CodeBlock";
import { Network, Globe, MapPin, BarChart } from "lucide-react";

export default function IPAMPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#040508] to-[#0C0F15]">
            <PageHeader
                badge="IP Address Management"
                title="Hierarchical IPAM System"
                description="Automatic IP allocation with geographic hierarchy and comprehensive quota management."
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { icon: Network, title: "10.X.Y.Z Structure", desc: "Hierarchical addressing" },
                        { icon: Globe, title: "Geographic Hierarchy", desc: "Continent → Country → Region" },
                        { icon: MapPin, title: "Auto-Allocation", desc: "Next-available IP assignment" },
                        { icon: BarChart, title: "Quota Management", desc: "Per-user allocation limits" }
                    ].map((item) => (
                        <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <item.icon className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Create a Region</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/ipam/regions \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "country": "India",
    "region_name": "Mumbai DC1",
    "tags": {"environment": "production"}
  }'

# Response: {"cidr": "10.0.0.0/24", "x_octet": 0, "y_octet": 0, ...}`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Allocate a Host</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/ipam/hosts \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "region_id": "550e8400-e29b-41d4-a716-446655440000",
    "hostname": "web-server-01",
    "device_type": "VM"
  }'

# Response: {"ip_address": "10.0.0.1", "z_octet": 1, ...}`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Interpret IP Address</h2>
                        <CodeBlock
                            language="bash"
                            code={`curl -X POST http://localhost:8000/api/v1/ipam/interpret \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"ip_address": "10.0.0.1"}'

# Response: Full hierarchy from Global Root → Continent → Country → Region → Host`}
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Hierarchical Allocation", desc: "10.X.Y.Z structured address space with automatic next-available assignment" },
                                { title: "Geographic Organization", desc: "Continent → Country → Region → Host hierarchy for logical grouping" },
                                { title: "User Isolation", desc: "Independent namespaces per user with complete data separation" },
                                { title: "Quota Management", desc: "Per-user allocation limits with automated threshold notifications" },
                                { title: "Comprehensive Audit", desc: "Complete allocation history tracking with detailed logs" },
                                { title: "Capacity Monitoring", desc: "Real-time utilization metrics and capacity planning" }
                            ].map((feature) => (
                                <div key={feature.title} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/70 text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Available Countries</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {["India", "United States", "United Kingdom", "Germany", "France", "Japan", "Australia", "Canada"].map((country) => (
                                    <div key={country} className="text-white/80">{country}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
