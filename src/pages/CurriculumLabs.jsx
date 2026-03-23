import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Cpu, Wifi, Server } from 'lucide-react'
import { labs } from '../data/data'

const semesters = {
    'Semester 1': ['Engineering Mathematics I', 'Physics', 'C Programming', 'Engineering Graphics'],
    'Semester 2': ['Engineering Mathematics II', 'Chemistry', 'Data Structures', 'Digital Electronics'],
    'Semester 3': ['Discrete Mathematics', 'OOPs with Java', 'Computer Architecture', 'Database Systems'],
    'Semester 4': ['Operating Systems', 'Computer Networks', 'System Software', 'Design & Analysis of Algorithms'],
    'Semester 5': ['Artificial Intelligence', 'Machine Learning', 'Software Engineering', 'Web Technologies'],
    'Semester 6': ['Cloud Computing', 'Cyber Security', 'Mobile Application Development', 'Open Elective'],
    'Semester 7': ['Deep Learning', 'Big Data Analytics', 'Professional Elective I', 'Project Phase I'],
    'Semester 8': ['Internet of Things', 'Professional Elective II', 'Project Phase II'],
}

export default function CurriculumLabs() {
    const [activeSem, setActiveSem] = useState('Semester 1')

    return (
        <div className="pt-20">
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">Curriculum & <span className="gradient-text">Labs</span></h1>
                        <p className="text-slate-400 text-xl">Comprehensive syllabus and world-class laboratory infrastructure.</p>
                    </motion.div>
                </div>
            </section>

            {/* Curriculum */}
            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Course <span className="gradient-text">Curriculum</span></h2>
                    <p className="section-subtitle">B.E. CSE — Semester-wise subjects</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {Object.keys(semesters).map((sem) => (
                            <button key={sem} onClick={() => setActiveSem(sem)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeSem === sem ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow' : 'glass-card text-slate-400 hover:text-white'
                                    }`}>
                                {sem}
                            </button>
                        ))}
                    </div>
                    <motion.div key={activeSem} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {semesters[activeSem].map((subject, i) => (
                            <div key={subject} className="glass-card p-4 hover:border-accent-blue/30 transition-all hover:-translate-y-1">
                                <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-sm mb-3">
                                    {i + 1}
                                </div>
                                <p className="text-white text-sm font-medium">{subject}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Labs */}
            <section className="section-pad bg-primary-light/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Our <span className="gradient-text">Laboratories</span></h2>
                    <p className="section-subtitle">State-of-the-art facilities for hands-on learning</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labs.map((lab, i) => (
                            <motion.div key={lab.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="glass-card p-6 hover:border-accent-blue/30 transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center mb-4">
                                    <Monitor className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold font-heading mb-2">{lab.name}</h3>
                                <div className="flex gap-4 text-sm text-slate-400 mb-3">
                                    <span><Cpu className="w-3 h-3 inline mr-1" />{lab.systems} Systems</span>
                                    <span>Est. {lab.year}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {lab.software.map((sw) => (
                                        <span key={sw} className="text-xs bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-2 py-0.5 rounded-full">{sw}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
