import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, BookOpen, Award } from 'lucide-react'
import { faculty } from '../data/data'

const categories = ['All', 'Professor', 'Associate Professor', 'Assistant Professor']

function FacultyModal({ member, onClose }) {
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                    className="glass-card w-full max-w-md p-8 relative" onClick={e => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-white font-bold font-heading text-xl">
                            {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                            <h3 className="text-white font-bold font-heading text-lg">{member.name}</h3>
                            <p className="text-accent-blue text-sm">{member.designation}</p>
                            <p className="text-slate-400 text-xs mt-1">{member.qualification}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="glass-card p-3 flex items-center gap-3">
                            <BookOpen className="w-4 h-4 text-accent-blue flex-shrink-0" />
                            <div>
                                <p className="text-slate-400 text-xs">Specialization</p>
                                <p className="text-white text-sm">{member.specialization}</p>
                            </div>
                        </div>
                        <div className="glass-card p-3 flex items-center gap-3">
                            <Award className="w-4 h-4 text-accent-violet flex-shrink-0" />
                            <div>
                                <p className="text-slate-400 text-xs">Experience & Publications</p>
                                <p className="text-white text-sm">{member.experience} | {member.publications} Papers</p>
                            </div>
                        </div>
                        <div className="glass-card p-3 flex items-center gap-3">
                            <Mail className="w-4 h-4 text-accent-teal flex-shrink-0" />
                            <div>
                                <p className="text-slate-400 text-xs">Email</p>
                                <p className="text-white text-sm">{member.email}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default function Faculty() {
    const [active, setActive] = useState('All')
    const [selected, setSelected] = useState(null)

    const filtered = active === 'All' ? faculty : faculty.filter(f => f.category === active)

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-block bg-accent-teal/10 border border-accent-teal/20 rounded-full px-4 py-1.5 text-accent-teal text-sm font-medium mb-4">
                            Our Team
                        </div>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">
                            Meet Our <span className="gradient-text">Faculty</span>
                        </h1>
                        <p className="text-slate-400 text-xl leading-relaxed">
                            Experienced educators, active researchers, and passionate mentors shaping the next generation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter */}
            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setActive(cat)}
                                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${active === cat
                                        ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow'
                                        : 'glass-card text-slate-400 hover:text-white hover:border-white/20'
                                    }`}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((member, i) => (
                            <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                                onClick={() => setSelected(member)}
                                className="glass-card p-6 cursor-pointer hover:border-accent-blue/40 hover:-translate-y-1 transition-all duration-300 group">
                                {/* Avatar */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-white font-bold font-heading text-lg group-hover:scale-110 transition-transform">
                                        {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold font-heading">{member.name}</h3>
                                        <p className="text-accent-blue text-xs">{member.designation}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="text-slate-400"><span className="text-slate-500">Qual:</span> {member.qualification}</p>
                                    <p className="text-slate-400"><span className="text-slate-500">Specialization:</span> {member.specialization}</p>
                                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                        <span className="text-slate-500 text-xs">{member.experience}</span>
                                        <span className="text-accent-blue text-xs font-medium">{member.publications} Publications</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {selected && <FacultyModal member={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}
