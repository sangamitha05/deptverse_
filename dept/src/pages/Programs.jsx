import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Users, CheckCircle2, BookOpen, FlaskConical, ChevronDown } from 'lucide-react'
import { programs } from '../data/data'

// ─────────────────────────────────────────────────────────────
// REGULATION DATA — subjects & labs per regulation / level / sem
// ─────────────────────────────────────────────────────────────
const regulationData = {
    '2020': {
        UG: {
            'Semester 1': {
                subjects: [
                    { name: 'Engineering Mathematics I', credits: 4 },
                    { name: 'Engineering Physics', credits: 4 },
                    { name: 'Engineering Chemistry', credits: 4 },
                    { name: 'Communicative English', credits: 3 },
                    { name: 'Problem Solving & C Programming', credits: 3 },
                    { name: 'Engineering Graphics', credits: 3 }
                ],
                labs: [
                    { name: 'Physics Lab', credits: 1.5 },
                    { name: 'Chemistry Lab', credits: 1.5 },
                    { name: 'C Programming Lab', credits: 2 },
                    { name: 'Engineering Practices Lab', credits: 2 }
                ],
            },
            'Semester 2': {
                subjects: [
                    { name: 'Engineering Mathematics II', credits: 4 },
                    { name: 'Engineering Mechanics', credits: 4 },
                    { name: 'Basic Electrical & Electronics Engineering', credits: 3 },
                    { name: 'Environmental Science & Engineering', credits: 3 },
                    { name: 'Data Structures', credits: 3 },
                    { name: 'Technical Writing', credits: 2 }
                ],
                labs: [
                    { name: 'Data Structures Lab', credits: 2 },
                    { name: 'Basic EEE Lab', credits: 2 },
                    { name: 'Engineering Practices Lab', credits: 2 }
                ],
            },
            'Semester 3': {
                subjects: [
                    { name: 'Transforms & Partial Differential Equations', credits: 4 },
                    { name: 'Digital Principles & Computer Organization', credits: 3 },
                    { name: 'Object-Oriented Programming', credits: 3 },
                    { name: 'Discrete Mathematics', credits: 4 },
                    { name: 'Signals & Systems', credits: 3 },
                    { name: 'Professional Ethics', credits: 2 }
                ],
                labs: [
                    { name: 'OOP Lab', credits: 2 },
                    { name: 'Digital Logic Lab', credits: 2 }
                ],
            },
            'Semester 4': {
                subjects: [
                    { name: 'Operating Systems', credits: 3 },
                    { name: 'Database Management Systems', credits: 3 },
                    { name: 'Design & Analysis of Algorithms', credits: 4 },
                    { name: 'Computer Networks', credits: 3 },
                    { name: 'Microprocessors & Microcontrollers', credits: 3 },
                    { name: 'Theory of Computation', credits: 3 }
                ],
                labs: [
                    { name: 'DBMS Lab', credits: 2 },
                    { name: 'Networks Lab', credits: 2 },
                    { name: 'Microprocessor Lab', credits: 2 }
                ],
            },
            'Semester 5': {
                subjects: [
                    { name: 'Compiler Design', credits: 3 },
                    { name: 'Software Engineering', credits: 3 },
                    { name: 'Artificial Intelligence', credits: 3 },
                    { name: 'Computer Graphics', credits: 3 },
                    { name: 'Elective I', credits: 3 },
                    { name: 'Elective II', credits: 3 }
                ],
                labs: [
                    { name: 'Compiler Design Lab', credits: 2 },
                    { name: 'AI Lab', credits: 2 },
                    { name: 'Application Development Lab', credits: 2 }
                ],
            },
            'Semester 6': {
                subjects: [
                    { name: 'Information Security', credits: 3 },
                    { name: 'Web Technology', credits: 3 },
                    { name: 'Mobile Computing', credits: 3 },
                    { name: 'Cloud Computing', credits: 3 },
                    { name: 'Elective III', credits: 3 },
                    { name: 'Elective IV', credits: 3 }
                ],
                labs: [
                    { name: 'Web Technology Lab', credits: 2 },
                    { name: 'Mobile Application Lab', credits: 2 }
                ],
            },
            'Semester 7': {
                subjects: [
                    { name: 'Machine Learning', credits: 3 },
                    { name: 'Big Data Analytics', credits: 3 },
                    { name: 'Internet of Things', credits: 3 },
                    { name: 'Elective V', credits: 3 },
                    { name: 'Elective VI', credits: 3 },
                    { name: 'Project Work – Phase I', credits: 4 }
                ],
                labs: [
                    { name: 'Machine Learning Lab', credits: 2 },
                    { name: 'IoT Lab', credits: 2 }
                ],
            },
            'Semester 8': {
                subjects: [
                    { name: 'Deep Learning', credits: 3 },
                    { name: 'Natural Language Processing', credits: 3 },
                    { name: 'Blockchain Technology', credits: 3 },
                    { name: 'Open Elective', credits: 3 },
                    { name: 'Project Work – Phase II', credits: 8 }
                ],
                labs: [
                    { name: 'Deep Learning Lab', credits: 2 }
                ],
            },
        },
        PG: {
            'Semester 1': {
                subjects: [
                    { name: 'Advanced Data Structures & Algorithms', credits: 4 },
                    { name: 'Advanced Computer Architecture', credits: 3 },
                    { name: 'Research Methodology', credits: 3 },
                    { name: 'Advanced Database Systems', credits: 3 },
                    { name: 'Elective I', credits: 3 }
                ],
                labs: [
                    { name: 'Advanced Programming Lab', credits: 2 },
                    { name: 'Database Lab', credits: 2 }
                ],
            },
            'Semester 2': {
                subjects: [
                    { name: 'Machine Learning Techniques', credits: 3 },
                    { name: 'Advanced Networks', credits: 3 },
                    { name: 'Distributed Systems', credits: 3 },
                    { name: 'Elective II', credits: 3 },
                    { name: 'Elective III', credits: 3 }
                ],
                labs: [
                    { name: 'Machine Learning Lab', credits: 2 },
                    { name: 'Networks Lab', credits: 2 }
                ],
            },
            'Semester 3': {
                subjects: [
                    { name: 'Deep Learning & NLP', credits: 3 },
                    { name: 'Big Data Technologies', credits: 3 },
                    { name: 'Cloud & Fog Computing', credits: 3 },
                    { name: 'Elective IV', credits: 3 },
                    { name: 'Project Work – Phase I', credits: 6 }
                ],
                labs: [
                    { name: 'Deep Learning Lab', credits: 2 },
                    { name: 'Big Data Lab', credits: 2 }
                ],
            },
            'Semester 4': {
                subjects: [
                    { name: 'Computer Vision', credits: 3 },
                    { name: 'Cyber Security', credits: 3 },
                    { name: 'Elective V', credits: 3 },
                    { name: 'Project Work – Phase II', credits: 12 }
                ],
                labs: [
                    { name: 'Computer Vision Lab', credits: 2 }
                ],
            },
        },
        PhD: {
            'Semester 1': {
                subjects: [
                    { name: 'Research Methodology', credits: 4 },
                    { name: 'Advanced Computing', credits: 4 },
                    { name: 'Literature Survey', credits: 2 }
                ],
                labs: []
            },
            'Semester 2': {
                subjects: [
                    { name: 'Coursework I', credits: 4 },
                    { name: 'Coursework II', credits: 4 },
                    { name: 'Paper Publication', credits: 2 }
                ],
                labs: []
            },
            'Semester 3': {
                subjects: [
                    { name: 'Comprehensive Viva Voce', credits: 2 },
                    { name: 'Research Proposal Defense', credits: 2 }
                ],
                labs: [
                    { name: 'Research Lab', credits: 4 }
                ]
            },
            'Semester 4': {
                subjects: [
                    { name: 'Thesis Work – Phase I', credits: 12 }
                ],
                labs: [
                    { name: 'Research Lab', credits: 4 }
                ]
            },
            'Semester 5': {
                subjects: [
                    { name: 'Thesis Work – Phase II', credits: 12 },
                    { name: 'Journal Publication', credits: 4 }
                ],
                labs: [
                    { name: 'Research Lab', credits: 4 }
                ]
            },
            'Semester 6': {
                subjects: [
                    { name: 'Thesis Submission & Defense', credits: 0 }
                ],
                labs: []
            },
        },
    },
    '2024': {
        UG: {
            'Semester 1': {
                subjects: [
                    { name: 'Calculus & Linear Algebra', credits: 4 },
                    { name: 'Engineering Physics', credits: 4 },
                    { name: 'Communicative English', credits: 3 },
                    { name: 'Computational Thinking with Python', credits: 3 },
                    { name: 'Environmental Science', credits: 2 },
                    { name: 'Engineering Graphics & Design', credits: 3 }
                ],
                labs: [
                    { name: 'Physics Lab', credits: 1.5 },
                    { name: 'Python Programming Lab', credits: 2 },
                    { name: 'Engineering Practices Lab', credits: 2 }
                ],
            },
            'Semester 2': {
                subjects: [
                    { name: 'Probability & Statistics', credits: 4 },
                    { name: 'Engineering Chemistry', credits: 4 },
                    { name: 'Digital Systems Design', credits: 3 },
                    { name: 'Object-Oriented Programming with Java', credits: 3 },
                    { name: 'Data Structures & Algorithms', credits: 3 },
                    { name: 'Soft Skills', credits: 2 }
                ],
                labs: [
                    { name: 'Chemistry Lab', credits: 1.5 },
                    { name: 'Java Lab', credits: 2 },
                    { name: 'Data Structures Lab', credits: 2 }
                ],
            },
            'Semester 3': {
                subjects: [
                    { name: 'Discrete Structures', credits: 4 },
                    { name: 'Computer Organization & Architecture', credits: 3 },
                    { name: 'Operating Systems', credits: 3 },
                    { name: 'Database Systems', credits: 3 },
                    { name: 'Software Engineering', credits: 3 },
                    { name: 'Open Course I', credits: 3 }
                ],
                labs: [
                    { name: 'OS Lab', credits: 2 },
                    { name: 'DBMS Lab', credits: 2 }
                ],
            },
            'Semester 4': {
                subjects: [
                    { name: 'Algorithm Design', credits: 4 },
                    { name: 'Computer Networks', credits: 3 },
                    { name: 'Web Development', credits: 3 },
                    { name: 'Theory of Computation', credits: 3 },
                    { name: 'Elective I', credits: 3 },
                    { name: 'Professional Ethics', credits: 2 }
                ],
                labs: [
                    { name: 'Networks Lab', credits: 2 },
                    { name: 'Web Dev Lab', credits: 2 }
                ],
            },
            'Semester 5': {
                subjects: [
                    { name: 'Machine Learning', credits: 3 },
                    { name: 'Artificial Intelligence', credits: 3 },
                    { name: 'Compiler Design', credits: 3 },
                    { name: 'Information Security', credits: 3 },
                    { name: 'Elective II', credits: 3 },
                    { name: 'Elective III', credits: 3 }
                ],
                labs: [
                    { name: 'ML Lab', credits: 2 },
                    { name: 'AI Lab', credits: 2 },
                    { name: 'Compiler Lab', credits: 2 }
                ],
            },
            'Semester 6': {
                subjects: [
                    { name: 'Deep Learning', credits: 3 },
                    { name: 'Cloud Computing', credits: 3 },
                    { name: 'Mobile Application Development', credits: 3 },
                    { name: 'Big Data Analytics', credits: 3 },
                    { name: 'Elective IV', credits: 3 },
                    { name: 'Industrial Internship', credits: 2 }
                ],
                labs: [
                    { name: 'Deep Learning Lab', credits: 2 },
                    { name: 'Mobile Dev Lab', credits: 2 }
                ],
            },
            'Semester 7': {
                subjects: [
                    { name: 'Natural Language Processing', credits: 3 },
                    { name: 'Computer Vision', credits: 3 },
                    { name: 'Internet of Things', credits: 3 },
                    { name: 'Blockchain Technology', credits: 3 },
                    { name: 'Elective V', credits: 3 },
                    { name: 'Project Work – Phase I', credits: 4 }
                ],
                labs: [
                    { name: 'NLP Lab', credits: 2 },
                    { name: 'IoT Lab', credits: 2 }
                ],
            },
            'Semester 8': {
                subjects: [
                    { name: 'Generative AI & LLMs', credits: 3 },
                    { name: 'Cyber Security & Forensics', credits: 3 },
                    { name: 'Open Elective', credits: 3 },
                    { name: 'Project Work – Phase II', credits: 8 },
                    { name: 'Entrepreneurship Development', credits: 2 }
                ],
                labs: [
                    { name: 'AI Lab', credits: 2 }
                ],
            },
        },
        PG: {
            'Semester 1': {
                subjects: [
                    { name: 'Advanced Algorithms', credits: 4 },
                    { name: 'AI & ML Foundations', credits: 3 },
                    { name: 'Research Writing & Ethics', credits: 2 },
                    { name: 'Advanced Database Technologies', credits: 3 },
                    { name: 'Elective I', credits: 3 }
                ],
                labs: [
                    { name: 'Advanced Programming Lab', credits: 2 },
                    { name: 'ML Foundations Lab', credits: 2 }
                ],
            },
            'Semester 2': {
                subjects: [
                    { name: 'Deep Neural Networks', credits: 3 },
                    { name: 'Distributed & Cloud Systems', credits: 3 },
                    { name: 'Data Science & Visualization', credits: 3 },
                    { name: 'Elective II', credits: 3 },
                    { name: 'Elective III', credits: 3 }
                ],
                labs: [
                    { name: 'Deep Learning Lab', credits: 2 },
                    { name: 'Data Science Lab', credits: 2 }
                ],
            },
            'Semester 3': {
                subjects: [
                    { name: 'Generative AI', credits: 3 },
                    { name: 'Edge Computing & IoT', credits: 3 },
                    { name: 'Computer Vision', credits: 3 },
                    { name: 'Elective IV', credits: 3 },
                    { name: 'Project Work – Phase I', credits: 6 }
                ],
                labs: [
                    { name: 'GenAI Lab', credits: 2 },
                    { name: 'Edge Computing Lab', credits: 2 }
                ],
            },
            'Semester 4': {
                subjects: [
                    { name: 'Thesis & Research Publication', credits: 4 },
                    { name: 'Open Elective', credits: 3 },
                    { name: 'Project Work – Phase II', credits: 12 }
                ],
                labs: [],
            },
        },
        PhD: {
            'Semester 1': {
                subjects: [
                    { name: 'Advanced Research Methodology', credits: 4 },
                    { name: 'Emerging Computing Paradigms', credits: 4 },
                    { name: 'Technical Paper Writing', credits: 2 }
                ],
                labs: []
            },
            'Semester 2': {
                subjects: [
                    { name: 'Advanced Coursework I', credits: 4 },
                    { name: 'Advanced Coursework II', credits: 4 },
                    { name: 'Conference Publication', credits: 2 }
                ],
                labs: []
            },
            'Semester 3': {
                subjects: [
                    { name: 'Proposal Submission', credits: 2 },
                    { name: 'Comprehensive Examination', credits: 2 }
                ],
                labs: [
                    { name: 'Research Lab', credits: 4 }
                ]
            },
            'Semester 4': {
                subjects: [
                    { name: 'Thesis Work – Phase I', credits: 12 },
                    { name: 'Journal Publication', credits: 4 }
                ],
                labs: [
                    { name: 'Research Lab', credits: 4 }
                ]
            },
            'Semester 5': {
                subjects: [
                    { name: 'Thesis Work – Phase II', credits: 12 },
                    { name: 'SCI Journal Publication', credits: 4 }
                ],
                labs: [
                    { name: 'Research Lab', credits: 4 }
                ]
            },
            'Semester 6': {
                subjects: [
                    { name: 'Thesis Viva Voce & Defense', credits: 0 }
                ],
                labs: []
            },
        },
    },
}

const levelColors = {
    UG: 'from-blue-500 to-cyan-500',
    PG: 'from-violet-500 to-purple-500',
    PhD: 'from-teal-500 to-green-500',
}

// ─────────────────────────────────────────────────────────────
// SEMESTER DROPDOWN + SUBJECT DISPLAY (per program card)
// ─────────────────────────────────────────────────────────────
function SemesterPanel({ level, selectedRegulation }) {
    const semCount = level === 'UG' ? 8 : level === 'PG' ? 4 : 6
    const semOptions = Array.from({ length: semCount }, (_, i) => `Semester ${i + 1}`)
    const [selectedSem, setSelectedSem] = useState('')

    const data = selectedRegulation && selectedSem
        ? regulationData[selectedRegulation]?.[level]?.[selectedSem]
        : null

    return (
        <div className="md:w-72">
            <p className="text-slate-400 text-sm mb-3">Semester Structure</p>

            {/* Dropdown */}
            <div className="relative mb-3">
                <select
                    value={selectedSem}
                    onChange={(e) => setSelectedSem(e.target.value)}
                    disabled={!selectedRegulation}
                    style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        padding: '9px 36px 9px 13px',
                        color: selectedSem ? '#f8fafc' : '#94a3b8',
                        fontSize: 13,
                        outline: 'none',
                        appearance: 'none',
                        cursor: selectedRegulation ? 'pointer' : 'not-allowed',
                        opacity: selectedRegulation ? 1 : 0.5,
                    }}
                >
                    <option value="">
                        {selectedRegulation ? 'Select Semester' : 'Select a Regulation first'}
                    </option>
                    {semOptions.map((s) => (
                        <option key={s} value={s} style={{ background: '#1e293b' }}>{s}</option>
                    ))}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
            </div>

            {/* Subject/Lab output */}
            <AnimatePresence mode="wait">
                {data ? (
                    <motion.div
                        key={`${selectedRegulation}-${level}-${selectedSem}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                    >
                        {/* Subjects */}
                        <div style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: 10, padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                <BookOpen size={13} color="#38bdf8" />
                                <span style={{ color: '#38bdf8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subjects</span>
                            </div>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                                {data.subjects.map((s, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 7 }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                                            <span style={{ color: '#0ea5e9', marginTop: 2, flexShrink: 0 }}>•</span>
                                            <span style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{s.name}</span>
                                        </div>
                                        <span style={{ color: '#64748b', fontSize: 10, fontWeight: 600, background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)', whiteSpace: 'nowrap' }}>
                                            {s.credits} CR
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Labs */}
                        {data.labs && data.labs.length > 0 && (
                            <div style={{ background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.15)', borderRadius: 10, padding: '12px 14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                    <FlaskConical size={13} color="#2dd4bf" />
                                    <span style={{ color: '#2dd4bf', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Labs</span>
                                </div>
                                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                                    {data.labs.map((l, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 7 }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                                                <span style={{ color: '#14b8a6', marginTop: 2, flexShrink: 0 }}>•</span>
                                                <span style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{l.name}</span>
                                            </div>
                                            <span style={{ color: '#64748b', fontSize: 10, fontWeight: 600, background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)', whiteSpace: 'nowrap' }}>
                                                {l.credits} CR
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                ) : !selectedRegulation ? (
                    <div style={{ textAlign: 'center', padding: '16px 8px', color: '#475569', fontSize: 12 }}>
                        👆 Pick a regulation below to unlock semester details
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '16px 8px', color: '#475569', fontSize: 12 }}>
                        Select a semester to view subjects & labs
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function Programs() {
    const [active, setActive] = useState('UG')
    const [selectedRegulation, setSelectedRegulation] = useState(null)

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

                                {/* Semester Panel — passes selectedRegulation down */}
                                <SemesterPanel level={prog.level} selectedRegulation={selectedRegulation} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Regulations & Downloads */}
            <section className="section-pad bg-primary-light/50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="section-title">Regulations & <span className="gradient-text">Downloads</span></h2>
                    <p className="section-subtitle">Select a regulation to view semester-wise subjects and labs</p>

                    <div className="flex justify-center gap-4 flex-wrap mt-8">
                        {['2020', '2024'].map((reg) => {
                            const isActive = selectedRegulation === reg
                            return (
                                <button
                                    key={reg}
                                    onClick={() => setSelectedRegulation(isActive ? null : reg)}
                                    style={{
                                        padding: '16px 32px',
                                        borderRadius: 14,
                                        border: isActive
                                            ? '2px solid rgba(14,165,233,0.6)'
                                            : '1px solid rgba(255,255,255,0.08)',
                                        background: isActive
                                            ? 'linear-gradient(135deg,rgba(14,165,233,0.15),rgba(124,58,237,0.15))'
                                            : 'rgba(255,255,255,0.04)',
                                        cursor: 'pointer',
                                        transition: 'all 0.25s',
                                        minWidth: 180,
                                    }}
                                >
                                    <div style={{ fontSize: 28, marginBottom: 6 }}>📋</div>
                                    <p style={{ color: isActive ? '#38bdf8' : '#f8fafc', fontWeight: 700, fontSize: 16, margin: 0 }}>
                                        Regulation {reg}
                                    </p>
                                    <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>
                                        {isActive ? '✓ Selected — scroll up' : 'Click to explore'}
                                    </p>
                                </button>
                            )
                        })}
                    </div>

                    {selectedRegulation && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ color: '#38bdf8', fontSize: 13, marginTop: 16 }}
                        >
                            Regulation {selectedRegulation} selected · Go to UG / PG / PhD tab → pick a semester to see subjects
                        </motion.p>
                    )}
                </div>
            </section>
        </div>
    )
}
