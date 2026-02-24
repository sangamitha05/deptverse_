import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'

const navItems = [
    { label: 'Home', path: '/' },
    {
        label: 'About', path: '/about',
        dropdown: [
            { label: 'Vision & Mission', path: '/about#vision' },
            { label: "HoD's Message", path: '/about#hod' },
            { label: 'Department History', path: '/about#history' },
        ]
    },
    { label: 'Programs', path: '/programs' },
    { label: 'Faculty', path: '/faculty' },
    {
        label: 'Academics', path: '#',
        dropdown: [
            { label: 'Curriculum & Labs', path: '/curriculum-labs' },
            { label: 'Research', path: '/research' },
            { label: 'eLearning', path: '/elearning' },
        ]
    },
    { label: 'Placements', path: '/placements' },
    { label: 'Events', path: '/events' },
    { label: 'Student Corner', path: '/student-corner' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
        setOpenDropdown(null)
    }, [location])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-white font-heading font-bold text-lg leading-none">Dept<span className="gradient-text">Verse</span></span>
                            <p className="text-slate-400 text-xs leading-none">CSE Department</p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <div key={item.label} className="relative group">
                                <button
                                    onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                    onClick={() => !item.dropdown && navigate(item.path)}
                                    className={`nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/5 ${location.pathname === item.path ? 'text-accent-blue' : ''
                                        }`}
                                >
                                    {item.label}
                                    {item.dropdown && <ChevronDown className="w-3 h-3" />}
                                </button>
                                {item.dropdown && openDropdown === item.label && (
                                    <div
                                        onMouseEnter={() => setOpenDropdown(item.label)}
                                        onMouseLeave={() => setOpenDropdown(null)}
                                        className="absolute top-full left-0 mt-1 w-52 glass-card py-2 shadow-glass animate-fade-in"
                                    >
                                        {item.dropdown.map((sub) => (
                                            <Link key={sub.label} to={sub.path}
                                                className="block px-4 py-2 text-sm text-slate-300 hover:text-accent-blue hover:bg-white/5 transition-colors">
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link to="/login"
                            className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-3 py-2">
                            Sign In
                        </Link>
                        <Link to="/login"
                            className="btn-primary text-sm px-5 py-2">
                            Portal Login
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-white/5">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-primary/98 backdrop-blur-md border-t border-white/5 animate-slide-up">
                    <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                <Link to={item.dropdown ? '#' : item.path}
                                    className={`block px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white font-medium ${location.pathname === item.path ? 'text-accent-blue bg-white/5' : ''
                                        }`}>
                                    {item.label}
                                </Link>
                                {item.dropdown && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {item.dropdown.map((sub) => (
                                            <Link key={sub.label} to={sub.path}
                                                className="block px-4 py-2 text-sm text-slate-400 hover:text-accent-blue">
                                                → {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pt-4 border-t border-white/10 flex gap-3">
                            <Link to="/login" className="flex-1 btn-primary text-center text-sm">Portal Login</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
