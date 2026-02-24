import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Calendar, BookOpen, CreditCard, Trophy, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { attendanceData, timetable } from '../../data/data'

const marks = [
    { subject: 'Data Structures', ia1: 48, ia2: 45, total: 93 },
    { subject: 'Operating Systems', ia1: 42, ia2: 40, total: 82 },
    { subject: 'Computer Networks', ia1: 50, ia2: 48, total: 98 },
    { subject: 'DBMS', ia1: 44, ia2: 42, total: 86 },
    { subject: 'AI', ia1: 47, ia2: 46, total: 93 },
]

function AttendanceCard({ subject, attended, total, percentage }) {
    const color = percentage >= 90 ? '#14b8a6' : percentage >= 75 ? '#0ea5e9' : '#ef4444'
    return (
        <div className="glass-card p-4 text-center hover:border-white/20 transition-all hover:-translate-y-1">
            <div className="relative w-20 h-20 mx-auto mb-3">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
                        strokeDasharray={`${percentage} ${100 - percentage}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{percentage}%</span>
                </div>
            </div>
            <p className="text-white font-semibold font-heading text-sm">{subject}</p>
            <p className="text-slate-400 text-xs mt-1">{attended}/{total} classes</p>
            {percentage < 75 && (
                <span className="inline-block mt-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                    Low
                </span>
            )}
        </div>
    )
}

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('attendance')
    const overall = Math.round(attendanceData.reduce((a, b) => a + b.percentage, 0) / attendanceData.length)

    const tabs = ['attendance', 'timetable', 'results', 'fee']

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 bg-gradient-to-r from-accent-blue/10 to-accent-violet/10 border border-accent-blue/20">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-white">Welcome back, <span className="gradient-text">Arun Kumar</span> 👋</h1>
                        <p className="text-slate-400 text-sm mt-1">2021CS001 | III Year B.E. CSE | Section A</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <p className="text-3xl font-bold font-heading gradient-text">{overall}%</p>
                            <p className="text-slate-400 text-xs">Overall Attendance</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Attendance', value: `${overall}%`, icon: CheckCircle2, color: 'text-teal-400', bg: 'bg-teal-500/10' },
                    { label: 'Pending Leaves', value: '2', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    { label: 'Assignments Due', value: '3', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Exam in Days', value: '12', icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-5 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-heading text-white">{value}</p>
                            <p className="text-slate-400 text-xs">{label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${activeTab === tab
                                ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white'
                                : 'glass-card text-slate-400 hover:text-white'
                            }`}>
                        {tab === 'attendance' ? '📊 Attendance' : tab === 'timetable' ? '📅 Timetable' : tab === 'results' ? '📋 Results' : '💳 Fee Status'}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'attendance' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {attendanceData.map((item) => <AttendanceCard key={item.subject} {...item} />)}
                    </div>
                    <div className="mt-6 glass-card p-6">
                        <h3 className="text-white font-semibold font-heading mb-4">Attendance Chart</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="subject" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 100]} />
                                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc' }} />
                                <Bar dataKey="percentage" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                                <defs>
                                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.9} />
                                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.7} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {activeTab === 'timetable' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                        <h3 className="text-white font-semibold font-heading">Today's Schedule</h3>
                        <p className="text-slate-400 text-xs mt-1">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="divide-y divide-white/5">
                        {timetable.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/2 transition-colors">
                                <div className="w-28 text-xs text-accent-blue font-mono flex-shrink-0">{item.time}</div>
                                <div className="flex-1">
                                    <p className="text-white font-medium">{item.subject}</p>
                                    <p className="text-slate-400 text-xs">{item.faculty}</p>
                                </div>
                                <span className="text-xs glass-card px-3 py-1 text-slate-300">{item.room}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'results' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                        <h3 className="text-white font-semibold font-heading">Internal Assessment Marks</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left px-4 py-3 text-slate-400 font-medium">Subject</th>
                                    <th className="text-center px-4 py-3 text-slate-400 font-medium">IA-1 (50)</th>
                                    <th className="text-center px-4 py-3 text-slate-400 font-medium">IA-2 (50)</th>
                                    <th className="text-center px-4 py-3 text-slate-400 font-medium">Total (100)</th>
                                    <th className="text-center px-4 py-3 text-slate-400 font-medium">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {marks.map((m) => (
                                    <tr key={m.subject} className="hover:bg-white/2">
                                        <td className="px-4 py-3 text-white font-medium">{m.subject}</td>
                                        <td className="px-4 py-3 text-center text-slate-300">{m.ia1}</td>
                                        <td className="px-4 py-3 text-center text-slate-300">{m.ia2}</td>
                                        <td className="px-4 py-3 text-center font-bold text-white">{m.total}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${m.total >= 90 ? 'bg-teal-500/20 text-teal-400' : m.total >= 80 ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {m.total >= 90 ? 'O' : m.total >= 80 ? 'A+' : 'A'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {activeTab === 'fee' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="glass-card p-6 border border-teal-500/20 bg-teal-500/5">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle2 className="w-6 h-6 text-teal-400" />
                            <h3 className="text-white font-semibold font-heading">Fee Status - Academic Year 2024-25</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { term: 'Semester Fee', amount: '₹45,000', status: 'Paid', date: 'July 10, 2024' },
                                { term: 'Hostel Fee', amount: '₹20,000', status: 'Paid', date: 'July 12, 2024' },
                                { term: 'Bus Fee', amount: '₹8,000', status: 'Pending', date: 'Due: Aug 1, 2024' },
                            ].map(({ term, amount, status, date }) => (
                                <div key={term} className="glass-card p-4">
                                    <p className="text-slate-400 text-xs mb-1">{term}</p>
                                    <p className="text-white font-bold font-heading text-lg">{amount}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status === 'Paid' ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {status}
                                        </span>
                                        <span className="text-slate-500 text-xs">{date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
