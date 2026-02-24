import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, CheckCircle2, ChevronDown } from 'lucide-react'
import { programs } from '../data/data'

const levelColors = {
    UG: 'from-blue-500 to-cyan-500',
    PG: 'from-violet-500 to-purple-500',
    PhD: 'from-teal-500 to-green-500',
}

export default function Programs() {
    const [active, setActive] = useState('UG')

    const filtered = programs.filter(p => p.level === active)

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(124,58,237,0.1)_0%,_transparent_60%)]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-block bg-accent-violet/10 border border-accent-violet/20 rounded-full px-4 py-1.5 text-accent-violet text-sm font-medium mb-4">
                            Academic Programs
                        </div>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">
                            Our <span className="gradient-text">Programs</span>
                        </h1>
                        <p className="text-slate-400 text-xl leading-relaxed">
                            Comprehensive programs designed to build future-ready computer science professionals.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Program Tabs */}
            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    {/* Tabs */}
                    <div className="flex justify-center gap-3 mb-12">
                        {['UG', 'PG', 'PhD'].map((level) => (
                            <button key={level} onClick={() => setActive(level)}
                                className={`px-8 py-3 rounded-xl font-semibold font-heading transition-all duration-300 ${active === level
                                        ? `bg-gradient-to-r ${levelColors[level]} text-white shadow-glow`
                                        : 'glass-card text-slate-400 hover:text-white hover:border-white/20'
                                    }`}>
                                {level}
                            </button>
                        ))}
                    </div>

                    {/* Program cards */}
                    {filtered.map((prog) => (
                        <motion.div key={prog.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-8 mb-6 max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <div className={`inline-block bg-gradient-to-r ${levelColors[prog.level]} text-white text-sm px-4 py-1.5 rounded-full font-bold mb-4`}>
                                        {prog.level}
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold text-white mb-4">{prog.name}</h2>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="glass-card p-4">
                                            <Clock className="w-5 h-5 text-accent-blue mb-2" />
                                            <p className="text-slate-400 text-xs mb-1">Duration</p>
                                            <p className="text-white font-semibold">{prog.duration}</p>
                                        </div>
                                        <div className="glass-card p-4">
                                            <Users className="w-5 h-5 text-accent-violet mb-2" />
                                            <p className="text-slate-400 text-xs mb-1">Intake</p>
                                            <p className="text-white font-semibold">{prog.intake} Students</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-slate-400 text-sm mb-2">Eligibility</p>
                                        <p className="text-white glass-card px-4 py-2">{prog.eligibility}</p>
                                    </div>

                                    <div>
                                        <p className="text-slate-400 text-sm mb-3">Program Highlights</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {prog.highlights.map((h) => (
                                                <div key={h} className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0" />
                                                    <span className="text-slate-300 text-sm">{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Curriculum accordion placeholder */}
                                <div className="md:w-72">
                                    <p className="text-slate-400 text-sm mb-3">Semester Structure</p>
                                    <div className="space-y-2">
                                        {Array.from({ length: prog.level === 'UG' ? 8 : prog.level === 'PG' ? 4 : 6 }, (_, i) => (
                                            <div key={i} className="glass-card px-4 py-3 flex items-center justify-between cursor-pointer hover:border-accent-blue/30 transition-all">
                                                <span className="text-slate-300 text-sm font-medium">Semester {i + 1}</span>
                                                <ChevronDown className="w-4 h-4 text-slate-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Regulations */}
            <section className="section-pad bg-primary-light/50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="section-title">Regulations & <span className="gradient-text">Downloads</span></h2>
                    <p className="section-subtitle">Course regulations and academic documents</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {['Regulation 2021', 'Regulation 2017', 'Syllabus B.E.', 'Syllabus M.E.'].map((doc) => (
                            <button key={doc} className="glass-card p-4 text-slate-300 hover:text-accent-blue hover:border-accent-blue/40 transition-all hover:-translate-y-1 text-sm font-medium">
                                📄 {doc}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
