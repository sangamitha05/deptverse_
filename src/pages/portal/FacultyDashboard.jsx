import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Clock, Users, BarChart3 } from 'lucide-react'

const classes = [
    { id: 1, name: 'Data Structures', section: 'A', time: '9:00 - 10:00', room: 'A101', students: 62 },
    { id: 2, name: 'Operating Systems', section: 'B', time: '11:00 - 12:00', room: 'A102', students: 58 },
    { id: 3, name: 'DBMS Lab', section: 'A', time: '2:00 - 4:00', room: 'Lab 3', students: 30 },
]

const students = [
    { rollNo: '2021CS001', name: 'Arun Kumar', photo: 'AK' },
    { rollNo: '2021CS002', name: 'Priya Rajan', photo: 'PR' },
    { rollNo: '2021CS003', name: 'Karthik M', photo: 'KM' },
    { rollNo: '2021CS004', name: 'Divya S', photo: 'DS' },
    { rollNo: '2021CS005', name: 'Manoj P', photo: 'MP' },
    { rollNo: '2021CS006', name: 'Sneha R', photo: 'SR' },
    { rollNo: '2021CS007', name: 'Vijay K', photo: 'VK' },
    { rollNo: '2021CS008', name: 'Ananya T', photo: 'AT' },
]

export default function FacultyDashboard() {
    const [selectedClass, setSelectedClass] = useState(null)
    const [attendance, setAttendance] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const toggleAttendance = (roll) => {
        setAttendance(prev => ({
            ...prev,
            [roll]: prev[roll] === 'present' ? 'absent' : prev[roll] === 'absent' ? undefined : 'present'
        }))
    }

    const handleSubmit = () => {
        setSubmitted(true)
        setTimeout(() => { setSubmitted(false); setSelectedClass(null); setAttendance({}) }, 2500)
    }

    const presentCount = Object.values(attendance).filter(v => v === 'present').length

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20">
                <h1 className="text-2xl font-heading font-bold text-white">Welcome, <span className="text-teal-400">Dr. Meenakshi</span> 👋</h1>
                <p className="text-slate-400 text-sm mt-1">FAC002 | Associate Professor | CSE Department</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Today's Classes", value: '3', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Total Students', value: '150', icon: Users, color: 'text-teal-400', bg: 'bg-teal-500/10' },
                    { label: 'Attendance Marked', value: '2/3', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' },
                    { label: 'Avg. Attendance', value: '85%', icon: BarChart3, color: 'text-violet-400', bg: 'bg-violet-500/10' },
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

            {/* Classes */}
            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/5">
                    <h3 className="text-white font-semibold font-heading">Today's Classes</h3>
                </div>
                <div className="divide-y divide-white/5">
                    {classes.map((cls) => (
                        <div key={cls.id} className="flex items-center gap-4 p-4 hover:bg-white/2 transition-colors">
                            <div className="flex-1">
                                <p className="text-white font-medium">{cls.name}</p>
                                <p className="text-slate-400 text-xs mt-0.5">Section {cls.section} • {cls.time} • {cls.room} • {cls.students} Students</p>
                            </div>
                            <button onClick={() => { setSelectedClass(cls); setAttendance({}) }}
                                className="bg-gradient-to-r from-accent-blue to-accent-violet text-white text-xs px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium">
                                Mark Attendance
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Attendance Panel */}
            {selectedClass && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-semibold font-heading">{selectedClass.name} — Attendance</h3>
                            <p className="text-slate-400 text-xs mt-0.5">{selectedClass.time} | Section {selectedClass.section}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-bold">{presentCount}/{students.length}</p>
                            <p className="text-slate-400 text-xs">Present</p>
                        </div>
                    </div>

                    <div className="p-4">
                        {/* Mark All */}
                        <div className="flex gap-2 mb-4">
                            <button onClick={() => setAttendance(Object.fromEntries(students.map(s => [s.rollNo, 'present'])))}
                                className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1.5 rounded-lg hover:bg-teal-500/20 transition-colors">
                                Mark All Present
                            </button>
                            <button onClick={() => setAttendance(Object.fromEntries(students.map(s => [s.rollNo, 'absent'])))}
                                className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors">
                                Mark All Absent
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {students.map((s) => {
                                const status = attendance[s.rollNo]
                                return (
                                    <button key={s.rollNo} onClick={() => toggleAttendance(s.rollNo)}
                                        className={`glass-card p-3 text-center transition-all border-2 hover:-translate-y-0.5 ${status === 'present' ? 'border-teal-500/50 bg-teal-500/10'
                                                : status === 'absent' ? 'border-red-500/50 bg-red-500/10'
                                                    : 'border-white/10'
                                            }`}>
                                        <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm ${status === 'present' ? 'bg-teal-500' : status === 'absent' ? 'bg-red-500' : 'bg-white/10'
                                            }`}>
                                            {s.photo}
                                        </div>
                                        <p className="text-white text-xs font-medium">{s.name.split(' ')[0]}</p>
                                        <p className="text-slate-500 text-xs">{s.rollNo}</p>
                                        {status && (
                                            <span className={`text-xs mt-1 inline-block ${status === 'present' ? 'text-teal-400' : 'text-red-400'}`}>
                                                {status === 'present' ? '✓ Present' : '✗ Absent'}
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="mt-4 flex gap-3">
                            <button onClick={handleSubmit} disabled={submitted}
                                className="btn-primary flex items-center gap-2 disabled:opacity-50">
                                {submitted ? '✓ Submitted!' : 'Submit Attendance'}
                            </button>
                            <button onClick={() => setSelectedClass(null)} className="glass-card px-4 py-2 text-slate-400 hover:text-white text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
