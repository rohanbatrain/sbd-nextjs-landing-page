'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Shield, Bell, Key, Camera } from 'lucide-react';

export function ProfileSettings() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl text-white shadow-xl">
                        JD
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors">
                        <Camera className="w-4 h-4" />
                    </button>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white">John Doe</h2>
                    <p className="text-white/60">john.doe@example.com</p>
                    <div className="flex gap-2 mt-3">
                        <span className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">Pro Plan</span>
                        <span className="px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">Verified</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Info */}
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-400" />
                                Personal Information
                            </CardTitle>
                            <CardDescription className="text-white/60">Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-white/80">First Name</label>
                                    <input type="text" defaultValue="John" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/80">Last Name</label>
                                    <input type="text" defaultValue="Doe" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-white/80">Bio</label>
                                <textarea defaultValue="Digital nomad and productivity enthusiast." className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 min-h-[100px]" />
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Shield className="w-5 h-5 text-emerald-400" />
                                Security
                            </CardTitle>
                            <CardDescription className="text-white/60">Manage your password and 2FA</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Key className="w-5 h-5 text-white/60" />
                                    <div>
                                        <div className="text-white font-medium">Password</div>
                                        <div className="text-white/50 text-sm">Last changed 3 months ago</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">Change</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-white/60" />
                                    <div>
                                        <div className="text-white font-medium">Two-Factor Authentication</div>
                                        <div className="text-white/50 text-sm">Currently disabled</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">Enable</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Notifications */}
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Bell className="w-5 h-5 text-yellow-400" />
                                Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {['Email Digest', 'Task Reminders', 'Security Alerts', 'Marketing Updates'].map((item) => (
                                <div key={item} className="flex items-center justify-between">
                                    <span className="text-white/80 text-sm">{item}</span>
                                    <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
