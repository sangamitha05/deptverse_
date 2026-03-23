import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Briefcase } from 'lucide-react'
import { placementStats, recruiters } from '../data/data'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function Placements() {
    return (
        <div className="pt-20">
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">Placements & <span className="gradient-text">Industry</span></h1>
                        <p className="text-slate-400 text-xl">Connecting talent with opportunity — 95%+ placement consistently.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {[
                            { label: 'Placement Rate', value: '95%', color: 'text-teal-400' },
                            { label: 'Avg Package', value: '7.2 LPA', color: 'text-blue-400' },
                            { label: 'Highest Package', value: '32 LPA', color: 'text-violet-400' },
                            { label: 'Companies', value: '80+', color: 'text-orange-400' },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="stat-card">
                                <p className={`text-3xl font-bold font-heading ${color} mb-2`}>{value}</p>
                                <p className="text-slate-300 text-sm">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="glass-card p-6">
                            <h3 className="text-white font-heading font-semibold mb-4">Placement % Trend</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={placementStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc' }} />
                                    <Bar dataKey="percentage" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="text-white font-heading font-semibold mb-4">Avg Package (LPA) Trend</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={placementStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc' }} />
                                    <Bar dataKey="avgPackage" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recruiters */}
                    <h2 className="section-title mb-8">Our <span className="gradient-text">Recruiters</span></h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {recruiters.map((name) => (
                            <motion.div key={name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                className="glass-card p-4 flex items-center justify-center hover:border-accent-blue/40 hover:-translate-y-1 transition-all duration-300">
                                <span className="text-white font-bold font-heading text-sm text-center">{name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
