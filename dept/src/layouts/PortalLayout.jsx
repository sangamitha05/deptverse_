import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, ClipboardList, Calendar, BookOpen,
    CreditCard, LogOut, GraduationCap, Menu, X,
    Users, BarChart3, Settings, Bell
} from 'lucide-react'

const studentLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/portal/student' },
    { label: 'Attendance', icon: ClipboardList, path: '/portal/student#attendance' },
    { label: 'Timetable', icon: Calendar, path: '/portal/student#timetable' },
    { label: 'Results', icon: BookOpen, path: '/portal/student#results' },
    { label: 'Fee Status', icon: CreditCard, path: '/portal/student#fee' },
]

const facultyLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/portal/faculty' },
    { label: 'Mark Attendance', icon: ClipboardList, path: '/portal/faculty#attendance' },
    { label: 'My Classes', icon: Calendar, path: '/portal/faculty#classes' },
    { label: 'Performance', icon: BarChart3, path: '/portal/faculty#performance' },
]

const adminLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/portal/admin' },
    { label: 'Students', icon: Users, path: '/portal/admin#students' },
    { label: 'Faculty', icon: GraduationCap, path: '/portal/admin#faculty' },
    { label: 'Reports', icon: BarChart3, path: '/portal/admin#reports' },
    { label: 'Settings', icon: Settings, path: '/portal/admin#settings' },
]

export default function PortalLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const role = location.pathname.includes('faculty') ? 'Faculty'
        : location.pathname.includes('admin') ? 'Admin' : 'Student'

    const links = role === 'Faculty' ? facultyLinks
        : role === 'Admin' ? adminLinks : studentLinks

    const roleColor = role === 'Faculty' ? 'from-accent-teal to-accent-blue'
        : role === 'Admin' ? 'from-accent-violet to-accent-blue' : 'from-accent-blue to-accent-violet'

    return (
        <div className="min-h-screen bg-primary flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-light border-r border-white/5 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>

                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleColor} flex items-center justify-center`}>
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-white font-heading font-bold">DeptVerse</span>
                            <p className={`text-xs font-medium bg-gradient-to-r ${roleColor} bg-clip-text text-transparent`}>
                                {role} Portal
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Role Badge */}
                <div className="px-4 py-4">
                    <div className={`glass-card p-3 flex items-center gap-3 bg-gradient-to-r ${roleColor} bg-opacity-10`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColor} flex items-center justify-center text-white font-bold text-sm`}>
                            {role === 'Student' ? 'ST' : role === 'Faculty' ? 'FC' : 'AD'}
                        </div>
                        <div>
                            <p className="text-white text-sm font-semibold">
                                {role === 'Student' ? 'Arun Kumar' : role === 'Faculty' ? 'Dr. Meenakshi' : 'Administrator'}
                            </p>
                            <p className="text-slate-400 text-xs">{role}</p>
                        </div>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="px-4 py-2 space-y-1">
                    {links.map(({ label, icon: Icon, path }) => (
                        <Link key={label} to={path}
                            className={`sidebar-item ${location.pathname === path ? 'active' : ''}`}>
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Bottom actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
                    <button
                        onClick={() => navigate('/login')}
                        className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="h-16 bg-primary-light border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 text-slate-400 hover:text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="hidden lg:block">
                        <h2 className="text-white font-semibold font-heading">{role} Dashboard</h2>
                        <p className="text-slate-400 text-xs">Welcome back!</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-white">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-blue rounded-full"></span>
                        </button>
                        <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                            ← Back to Website
                        </Link>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
