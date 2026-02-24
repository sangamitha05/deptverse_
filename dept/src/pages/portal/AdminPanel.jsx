import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, GraduationCap, BarChart3, TrendingUp, Download, Search, Filter } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts'
import { placementStats, faculty } from '../../data/data'

const studentData = [
    { rollNo: '2021CS001', name: 'Arun Kumar', year: 'III', section: 'A', attendance: '93%', cgpa: '8.9' },
    { rollNo: '2021CS002', name: 'Priya Rajan', year: 'III', section: 'A', attendance: '87%', cgpa: '9.2' },
    { rollNo: '2021CS003', name: 'Karthik M', year: 'III', section: 'B', attendance: '79%', cgpa: '8.1' },
    { rollNo: '2021CS004', name: 'Divya S', year: 'III', section: 'B', attendance: '91%', cgpa: '9.5' },
    { rollNo: '2021CS005', name: 'Manoj P', year: 'IV', section: 'A', attendance: '68%', cgpa: '7.8' },
]

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('overview')
    const [search, setSearch] = useState('')

    const filteredStudents = studentData.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search)
    )

    const tabs = ['overview', 'students', 'faculty', 'reports']

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 bg-gradient-to-r from-accent-violet/10 to-accent-blue/10 border border-accent-violet/20">
                <h1 className="text-2xl font-heading font-bold text-white">Admin Dashboard <span className="text-accent-violet">🛡️</span></h1>
                <p className="text-slate-400 text-sm mt-1">Full departmental overview and management</p>
            </motion.div>

            {/* Top Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: '1028', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Faculty Members', value: '42', icon: GraduationCap, color: 'text-violet-400', bg: 'bg-violet-500/10' },
                    { label: 'Avg Attendance', value: '86%', icon: BarChart3, color: 'text-teal-400', bg: 'bg-teal-500/10' },
                    { label: 'Placement Rate', value: '95%', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="glass-card p-5 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-heading text-white">{value}</p>
                            <p className="text-slate-400 text-xs">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${activeTab === tab
                                ? 'bg-gradient-to-r from-accent-violet to-accent-blue text-white'
                                : 'glass-card text-slate-400 hover:text-white'
                            }`}>
                        {tab === 'overview' ? '📊 Overview' : tab === 'students' ? '🎓 Students' : tab === 'faculty' ? '👨‍🏫 Faculty' : '📈 Reports'}
                    </button>
                ))}
            </div>

            {/* Overview */}
            {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-card p-6">
                            <h3 className="text-white font-semibold font-heading mb-4">Placement Trend</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={placementStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc' }} />
                                    <Line type="monotone" dataKey="percentage" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="text-white font-semibold font-heading mb-4">Avg Package (LPA)</h3>
                            <ResponsiveContainer width="100%" height={200}>
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
                    {/* Alerts */}
                    <div className="glass-card p-5">
                        <h3 className="text-white font-semibold font-heading mb-3">⚠️ Attention Required</h3>
                        <div className="space-y-2">
                            {[
                                { msg: '18 students have attendance below 75%', level: 'red' },
                                { msg: '3 faculty leave requests pending approval', level: 'yellow' },
                                { msg: 'NBA accreditation renewal due in 60 days', level: 'orange' },
                            ].map(({ msg, level }) => (
                                <div key={msg} className={`flex items-center gap-3 p-3 rounded-xl border ${level === 'red' ? 'bg-red-500/10 border-red-500/20 text-red-300'
                                        : level === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300'
                                            : 'bg-orange-500/10 border-orange-500/20 text-orange-300'
                                    }`}>
                                    <span className="text-sm">{msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Students */}
            {activeTab === 'students' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between gap-4 flex-wrap">
                        <h3 className="text-white font-semibold font-heading">Student Management</h3>
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder="Search students..."
                                    className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-blue w-48" />
                            </div>
                            <button className="glass-card px-3 py-2 text-slate-400 hover:text-white flex items-center gap-1 text-sm">
                                <Download className="w-4 h-4" /> Export
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    {['Roll No', 'Name', 'Year', 'Section', 'Attendance', 'CGPA', 'Action'].map(h => (
                                        <th key={h} className="text-left px-4 py-3 text-slate-400 font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredStudents.map((s) => (
                                    <tr key={s.rollNo} className="hover:bg-white/2 transition-colors">
                                        <td className="px-4 py-3 text-slate-300 font-mono text-xs">{s.rollNo}</td>
                                        <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                                        <td className="px-4 py-3 text-slate-300">{s.year}</td>
                                        <td className="px-4 py-3 text-slate-300">{s.section}</td>
                                        <td className="px-4 py-3">
                                            <span className={`font-medium ${parseInt(s.attendance) >= 85 ? 'text-teal-400' : parseInt(s.attendance) >= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                {s.attendance}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-white font-semibold">{s.cgpa}</td>
                                        <td className="px-4 py-3">
                                            <button className="text-xs text-accent-blue hover:underline">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Faculty */}
            {activeTab === 'faculty' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                        <h3 className="text-white font-semibold font-heading">Faculty Management</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    {['Name', 'Designation', 'Specialization', 'Experience', 'Publications'].map(h => (
                                        <th key={h} className="text-left px-4 py-3 text-slate-400 font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {faculty.map((f) => (
                                    <tr key={f.id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-4 py-3 text-white font-medium">{f.name}</td>
                                        <td className="px-4 py-3 text-accent-blue text-xs">{f.designation}</td>
                                        <td className="px-4 py-3 text-slate-300 text-xs">{f.specialization}</td>
                                        <td className="px-4 py-3 text-slate-300">{f.experience}</td>
                                        <td className="px-4 py-3 text-white font-semibold">{f.publications}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Reports */}
            {activeTab === 'reports' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-4">
                    {[
                        { name: 'Attendance Report (Month)', desc: 'Complete monthly attendance analysis', color: 'from-blue-500 to-cyan-500' },
                        { name: 'Placement Report 2024', desc: 'Placement statistics and company-wise data', color: 'from-violet-500 to-purple-500' },
                        { name: 'Faculty Performance', desc: 'Publications, feedback, and evaluation', color: 'from-teal-500 to-green-500' },
                        { name: 'Academic Progress Report', desc: 'IA marks and CGPA analysis', color: 'from-orange-500 to-amber-500' },
                    ].map(({ name, desc, color }) => (
                        <div key={name} className="glass-card p-6 hover:border-white/20 transition-all hover:-translate-y-1 flex items-center justify-between">
                            <div>
                                <div className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${color} mr-2`}></div>
                                <span className="text-white font-semibold font-heading">{name}</span>
                                <p className="text-slate-400 text-sm mt-1">{desc}</p>
                            </div>
                            <button className="flex-shrink-0 p-2 glass-card hover:border-accent-blue/40 text-slate-400 hover:text-accent-blue transition-all ml-4">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}
