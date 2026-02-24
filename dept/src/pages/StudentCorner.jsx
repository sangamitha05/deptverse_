import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Users, Trophy, Star } from 'lucide-react'

const clubs = [
    { name: 'CodersHub', type: 'Coding Club', members: 120, desc: 'Competitive programming, hackathons, open source.', icon: Code2, color: 'from-blue-500 to-cyan-500' },
    { name: 'DevCircle', type: 'Development Club', members: 85, desc: 'Web and mobile app development projects.', icon: Code2, color: 'from-violet-500 to-purple-500' },
    { name: 'AI Society', type: 'Research Club', members: 60, desc: 'AI/ML research, reading groups, projects.', icon: Star, color: 'from-teal-500 to-green-500' },
    { name: 'Cipher Squad', type: 'Cyber Security', members: 45, desc: 'CTF competitions, ethical hacking practice.', icon: Trophy, color: 'from-orange-500 to-red-500' },
]

const alumni = [
    { name: 'Aakash Ramesh', batch: '2018', company: 'Google', role: 'Software Engineer', package: '₹42 LPA' },
    { name: 'Keerthi Suresh', batch: '2019', company: 'Microsoft', role: 'Senior Dev', package: '₹38 LPA' },
    { name: 'Naveen Kumar', batch: '2017', company: 'Startup (YC funded)', role: 'CTO & Co-Founder', package: '—' },
    { name: 'Dhivya Priya', batch: '2020', company: 'Amazon', role: 'SDE-II', package: '₹28 LPA' },
]

export default function StudentCorner() {
    return (
        <div className="pt-20">
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">Student <span className="gradient-text">Corner</span></h1>
                        <p className="text-slate-400 text-xl">Clubs, communities, and alumni success stories.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Student <span className="gradient-text">Clubs</span></h2>
                    <p className="section-subtitle">Join a community and grow beyond academics</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {clubs.map((club, i) => (
                            <motion.div key={club.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="glass-card p-6 hover:border-white/20 hover:-translate-y-1 transition-all">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center mb-4`}>
                                    <club.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-white font-bold font-heading mb-1">{club.name}</h3>
                                <p className="text-accent-blue text-xs mb-2">{club.type}</p>
                                <p className="text-slate-400 text-sm mb-3">{club.desc}</p>
                                <div className="flex items-center gap-1 text-slate-500 text-xs">
                                    <Users className="w-3 h-3" />{club.members} members
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <h2 className="section-title">Alumni <span className="gradient-text">Success</span></h2>
                    <p className="section-subtitle">Our graduates making a difference worldwide</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {alumni.map((a, i) => (
                            <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="glass-card p-6 hover:border-accent-violet/30 hover:-translate-y-1 transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-violet to-accent-blue flex items-center justify-center text-white font-bold font-heading text-xl mb-4">
                                    {a.name[0]}{a.name.split(' ')[1][0]}
                                </div>
                                <h3 className="text-white font-semibold font-heading">{a.name}</h3>
                                <p className="text-accent-blue text-xs mt-0.5">{a.company} — {a.role}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-slate-500 text-xs">Batch {a.batch}</span>
                                    <span className="text-green-400 text-xs font-semibold">{a.package}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
