'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, User, Image as ImageIcon, Star } from 'lucide-react';
import { useState } from 'react';

export function ShopDashboard() {
    const [activeTab, setActiveTab] = useState<'avatars' | 'themes' | 'banners'>('avatars');

    const avatars = [
        { id: 1, name: 'Cyber Punk', price: 'Free', image: '🤖', popular: true },
        { id: 2, name: 'Zen Master', price: '500 Credits', image: '🧘', popular: false },
        { id: 3, name: 'Space Explorer', price: '1000 Credits', image: '👨‍🚀', popular: true },
        { id: 4, name: 'Pixel Art', price: '200 Credits', image: '👾', popular: false },
    ];

    const themes = [
        { id: 1, name: 'Midnight Blue', price: 'Free', color: 'bg-blue-900', popular: true },
        { id: 2, name: 'Forest Rain', price: '500 Credits', color: 'bg-emerald-900', popular: false },
        { id: 3, name: 'Sunset Vibes', price: '800 Credits', color: 'bg-orange-900', popular: true },
        { id: 4, name: 'Monochrome', price: '300 Credits', color: 'bg-gray-900', popular: false },
    ];

    const banners = [
        { id: 1, name: 'Abstract Waves', price: 'Free', style: 'bg-gradient-to-r from-blue-500 to-purple-500', popular: true },
        { id: 2, name: 'Digital Grid', price: '400 Credits', style: 'bg-[url("https://www.transparenttextures.com/patterns/cubes.png")] bg-blue-900', popular: false },
        { id: 3, name: 'Nebula', price: '1200 Credits', style: 'bg-gradient-to-br from-purple-900 via-black to-blue-900', popular: true },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Digital Asset Shop</h2>
                    <p className="text-white/60 mt-1">Customize your Second Brain experience</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">2,450 Credits</span>
                    <Button size="sm" variant="secondary" className="ml-2 h-8">Top Up</Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-1 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('avatars')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'avatars' ? 'bg-white/10 text-white border-b-2 border-blue-500' : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <User className="w-4 h-4" /> Avatars
                </button>
                <button
                    onClick={() => setActiveTab('themes')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'themes' ? 'bg-white/10 text-white border-b-2 border-blue-500' : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Palette className="w-4 h-4" /> Themes
                </button>
                <button
                    onClick={() => setActiveTab('banners')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'banners' ? 'bg-white/10 text-white border-b-2 border-blue-500' : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <ImageIcon className="w-4 h-4" /> Banners
                </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeTab === 'avatars' && avatars.map((item) => (
                    <Card key={item.id} className="bg-white/5 border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all">
                        <div className="aspect-square flex items-center justify-center text-6xl bg-black/20 group-hover:scale-105 transition-transform duration-300">
                            {item.image}
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-white font-medium">{item.name}</h3>
                                {item.popular && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">HOT</span>}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-white/60 text-sm">{item.price}</span>
                                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                                    {item.price === 'Free' ? 'Equip' : 'Buy'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {activeTab === 'themes' && themes.map((item) => (
                    <Card key={item.id} className="bg-white/5 border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all">
                        <div className={`h-32 ${item.color} relative group-hover:opacity-90 transition-opacity`}>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Palette className="w-8 h-8 text-white/80" />
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-white font-medium">{item.name}</h3>
                                {item.popular && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">HOT</span>}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-white/60 text-sm">{item.price}</span>
                                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                                    {item.price === 'Free' ? 'Apply' : 'Buy'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {activeTab === 'banners' && banners.map((item) => (
                    <Card key={item.id} className="bg-white/5 border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all">
                        <div className={`h-32 ${item.style} relative group-hover:opacity-90 transition-opacity`}></div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-white font-medium">{item.name}</h3>
                                {item.popular && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">HOT</span>}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-white/60 text-sm">{item.price}</span>
                                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                                    {item.price === 'Free' ? 'Set' : 'Buy'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
