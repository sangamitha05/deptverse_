import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    BookOpen, Users, FlaskConical, Briefcase, Trophy, Calendar,
    ArrowRight, ChevronRight, ChevronLeft, Star, Zap
} from 'lucide-react'
import { stats, announcements, recruiters } from '../data/data'

// Animated counter
function Counter({ value, suffix }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true
                let start = 0
                const end = value
                const duration = 2000
                const step = end / (duration / 16)
                const timer = setInterval(() => {
                    start += step
                    if (start >= end) { setCount(end); clearInterval(timer) }
                    else setCount(Math.floor(start))
                }, 16)
            }
        }, { threshold: 0.5 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [value])

    return <span ref={ref}>{count}{suffix}</span>
}

const quickLinks = [
    { label: 'Programs', icon: BookOpen, path: '/programs', color: 'from-blue-500 to-cyan-500', desc: 'UG, PG & PhD' },
    { label: 'Faculty', icon: Users, path: '/faculty', color: 'from-violet-500 to-purple-500', desc: '40+ Experts' },
    { label: 'Labs', icon: FlaskConical, path: '/curriculum-labs', color: 'from-teal-500 to-green-500', desc: '10+ Labs' },
    { label: 'Placements', icon: Briefcase, path: '/placements', color: 'from-orange-500 to-amber-500', desc: '95% Record' },
    { label: 'Research', icon: Star, path: '/research', color: 'from-pink-500 to-rose-500', desc: '100+ Papers' },
    { label: 'Events', icon: Calendar, path: '/events', color: 'from-indigo-500 to-blue-500', desc: 'Workshops & More' },
    { label: 'Achievements', icon: Trophy, path: '/research', color: 'from-yellow-500 to-orange-500', desc: 'Awards & Patents' },
    { label: 'Student Corner', icon: Zap, path: '/student-corner', color: 'from-cyan-500 to-teal-500', desc: 'Clubs & Alumni' },
]

const badgeColors = {
    'Upcoming': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Apply Now': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Important': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Register': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
}

const typeColors = {
    'Workshop': 'text-blue-400',
    'Internship': 'text-green-400',
    'Exam': 'text-red-400',
    'Hackathon': 'text-violet-400',
}

export default function Home() {
    const [announcementIdx, setAnnouncementIdx] = useState(0)

    const prevAnn = () => setAnnouncementIdx((i) => (i - 1 + announcements.length) % announcements.length)
    const nextAnn = () => setAnnouncementIdx((i) => (i + 1) % announcements.length)

    const visible = [0, 1, 2].map(offset =>
        announcements[(announcementIdx + offset) % announcements.length]
    )

    return (
        <div>
            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.15)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.15)_0%,_transparent_50%)]" />

                {/* Animated grid */}
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 text-accent-blue text-sm font-medium mb-6">
                                <span className="w-2 h-2 bg-accent-blue rounded-full animate-pulse"></span>
                                Smart Digital Ecosystem for CSE
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                                Welcome to <br />
                                <span className="gradient-text">DeptVerse</span>
                            </h1>
                            <p className="text-slate-400 text-xl leading-relaxed mb-8">
                                Department of Computer Science & Engineering — Shaping future technologists through innovation, research, and academic excellence.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/programs" className="btn-primary flex items-center gap-2">
                                    Explore Programs <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link to="/login"
                                    className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                                    Portal Login <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Hero visual */}
                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:grid grid-cols-2 gap-4">
                            {[
                                { label: 'Placement Rate', value: '95%', sub: 'Batch 2024', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
                                { label: 'Total Students', value: '1000+', sub: 'UG + PG + PhD', color: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/30' },
                                { label: 'Research Papers', value: '100+', sub: 'Published', color: 'from-teal-500/20 to-green-500/20', border: 'border-teal-500/30' },
                                { label: 'Industry MoUs', value: '20+', sub: 'Partnerships', color: 'from-orange-500/20 to-amber-500/20', border: 'border-orange-500/30' },
                            ].map(({ label, value, sub, color, border }) => (
                                <div key={label} className={`glass-card p-6 bg-gradient-to-br ${color} border ${border} hover:-translate-y-1 transition-transform duration-300`}>
                                    <p className="text-3xl font-bold font-heading text-white mb-1">{value}</p>
                                    <p className="text-white font-medium">{label}</p>
                                    <p className="text-slate-400 text-sm">{sub}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── QUICK ACCESS ─── */}
            <section className="section-pad bg-primary-light/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Quick <span className="gradient-text">Access</span></h2>
                    <p className="section-subtitle">Everything you need, one click away</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {quickLinks.map(({ label, icon: Icon, path, color, desc }, i) => (
                            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                                <Link to={path}
                                    className="glass-card p-6 flex flex-col items-center text-center hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group block">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <p className="text-white font-semibold font-heading">{label}</p>
                                    <p className="text-slate-400 text-xs mt-1">{desc}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── ABOUT PREVIEW ─── */}
            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="inline-block bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 text-accent-blue text-sm font-medium mb-4">
                                About the Department
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-white mb-6">
                                Shaping Tomorrow's <span className="gradient-text">Innovators</span>
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Established in 2004, the Department of Computer Science & Engineering has been at the forefront of technical education, producing engineers who lead global technology companies. With world-class labs, experienced faculty, and an industry-connected curriculum, we prepare students for the challenges of tomorrow.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    { label: 'Vision', text: 'To be a world-class center of excellence in CSE education.' },
                                    { label: 'Mission', text: 'Imparting quality education, fostering research and innovation.' },
                                ].map(({ label, text }) => (
                                    <div key={label} className="glass-card p-4">
                                        <p className="text-accent-blue font-semibold mb-2">{label}</p>
                                        <p className="text-slate-400 text-sm">{text}</p>
                                    </div>
                                ))}
                            </div>
                            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                                Read More <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* HoD Message */}
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="glass-card p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-violet/10 rounded-full -translate-y-10 translate-x-10" />
                            <div className="relative z-10">
                                <p className="text-slate-300 leading-relaxed italic mb-6 text-lg">
                                    "Our department is committed to nurturing technically strong, ethically grounded, and research-oriented professionals who can make a meaningful impact on society."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-white font-bold font-heading text-lg">
                                        RK
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">Dr. R. Krishnamurthy</p>
                                        <p className="text-slate-400 text-sm">Professor & Head, CSE Department</p>
                                        <p className="text-accent-blue text-sm">Ph.D, IIT Madras</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="section-pad bg-primary-light/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Department <span className="gradient-text">Highlights</span></h2>
                    <p className="section-subtitle">Numbers that speak for themselves</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {stats.map(({ label, value, suffix }) => (
                            <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                className="stat-card">
                                <p className="text-4xl font-bold font-heading gradient-text mb-2">
                                    <Counter value={value} suffix={suffix} />
                                </p>
                                <p className="text-slate-300 font-medium">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── ANNOUNCEMENTS ─── */}
            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-white">Latest <span className="gradient-text">Announcements</span></h2>
                            <p className="text-slate-400 mt-1">Stay up-to-date with department news</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={prevAnn} className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent-blue/50 transition-all">
                                <ChevronLeft className="w-5 h-5 text-slate-300" />
                            </button>
                            <button onClick={nextAnn} className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent-blue/50 transition-all">
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                            </button>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visible.map((ann) => (
                            <motion.div key={ann.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-6 hover:border-accent-blue/30 transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-sm font-semibold ${typeColors[ann.type] || 'text-accent-blue'}`}>
                                        {ann.type}
                                    </span>
                                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${badgeColors[ann.badge] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
                                        {ann.badge}
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold font-heading mb-2">{ann.title}</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{ann.description}</p>
                                <p className="text-slate-500 text-xs">{ann.date}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── RECRUITERS ─── */}
            <section className="section-pad bg-primary-light/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Our <span className="gradient-text">Recruiters</span></h2>
                    <p className="section-subtitle">Top companies hiring our graduates</p>
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

            {/* ─── CTA ─── */}
            <section className="section-pad">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="glass-card p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-accent-violet/10" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                                Join the Future of <span className="gradient-text">Computing</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Be part of a department that's shaping the next generation of technologists. Explore programs, connect with faculty, and launch your career.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/programs" className="btn-primary flex items-center gap-2">
                                    Explore Programs <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link to="/login"
                                    className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition-all duration-300">
                                    Access ERP Portal
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
