import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Eye, EyeOff, ArrowRight } from 'lucide-react'

const roles = [
    { id: 'student', label: 'Student', icon: '🎓', path: '/portal/student', color: 'from-accent-blue to-cyan-500', desc: 'Access attendance, timetable & results' },
    { id: 'faculty', label: 'Faculty', icon: '👨‍🏫', path: '/portal/faculty', color: 'from-accent-teal to-green-500', desc: 'Manage classes & mark attendance' },
    { id: 'admin', label: 'Admin', icon: '🛡️', path: '/portal/admin', color: 'from-accent-violet to-purple-500', desc: 'Department-wide administration' },
]

export default function Login() {
    const [role, setRole] = useState('student')
    const [showPass, setShowPass] = useState(false)
    const [form, setForm] = useState({ id: '', password: '' })
    const navigate = useNavigate()

    const selectedRole = roles.find(r => r.id === role)

    const handleLogin = (e) => {
        e.preventDefault()
        navigate(selectedRole.path)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.15)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.15)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center mx-auto mb-4 shadow-glow animate-float">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white"><span className="gradient-text">DeptVerse</span> Portal</h1>
                    <p className="text-slate-400 text-sm mt-1">CSE Department ERP System</p>
                </div>

                {/* Card */}
                <div className="glass-card p-8 shadow-glass">
                    {/* Role Selector */}
                    <p className="text-slate-400 text-sm font-medium mb-3">Select your role</p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {roles.map((r) => (
                            <button key={r.id} onClick={() => setRole(r.id)}
                                className={`p-3 rounded-xl border text-center transition-all duration-300 ${role === r.id
                                        ? `bg-gradient-to-br ${r.color} bg-opacity-20 border-white/30 shadow-glow`
                                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                                    }`}>
                                <div className="text-2xl mb-1">{r.icon}</div>
                                <p className={`text-xs font-semibold ${role === r.id ? 'text-white' : 'text-slate-400'}`}>{r.label}</p>
                            </button>
                        ))}
                    </div>
                    <p className="text-slate-500 text-xs mb-6 text-center">{selectedRole.desc}</p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-slate-400 text-sm mb-2 block">
                                {role === 'student' ? 'Register Number' : role === 'faculty' ? 'Employee ID' : 'Admin ID'}
                            </label>
                            <input
                                type="text"
                                value={form.id}
                                onChange={(e) => setForm({ ...form, id: e.target.value })}
                                placeholder={role === 'student' ? 'e.g. 2021CS001' : role === 'faculty' ? 'e.g. FAC001' : 'e.g. ADMIN01'}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-slate-400 text-sm mb-2 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Enter password"
                                    className="input-field pr-12"
                                    required
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                                <input type="checkbox" className="rounded" /> Remember me
                            </label>
                            <button type="button" className="text-accent-blue hover:underline">Forgot password?</button>
                        </div>
                        <button type="submit"
                            className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${selectedRole.color} hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-glow hover:-translate-y-0.5`}>
                            Login to {selectedRole.label} Portal <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-xs mt-6">
                        Having trouble? Contact{' '}
                        <a href="mailto:cse@department.edu.in" className="text-accent-blue hover:underline">cse@department.edu.in</a>
                    </p>
                </div>

                {/* Back link */}
                <p className="text-center text-slate-400 text-sm mt-6">
                    <a href="/" className="hover:text-accent-blue transition-colors">← Back to Department Website</a>
                </p>
            </motion.div>
        </div>
    )
}
