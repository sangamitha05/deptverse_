import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Award, Lightbulb, DollarSign } from 'lucide-react'

const publications = [
    { title: 'Deep Learning for Medical Image Segmentation', authors: 'Dr. Krishnamurthy, Dr. Meenakshi', journal: 'IEEE TMI', year: 2024, type: 'Journal' },
    { title: 'Blockchain-based IoT Security Framework', authors: 'Dr. Arumugam, Ms. Kavitha', journal: 'Elsevier Future Generation', year: 2024, type: 'Journal' },
    { title: 'Federated Learning for Edge Computing', authors: 'Mr. Venkatesh', journal: 'ICML 2024', year: 2024, type: 'Conference' },
    { title: 'NLP-based Sentiment Agriculture Decision System', authors: 'Dr. Meenakshi', journal: 'Applied Soft Computing', year: 2023, type: 'Journal' },
]

const projects = [
    { title: 'AI-based Crop Disease Detection', agency: 'DST', amount: '₹18.5 Lakhs', pi: 'Dr. Krishnamurthy', year: '2023-2025' },
    { title: 'Blockchain for Supply Chain', agency: 'SERB', amount: '₹12.2 Lakhs', pi: 'Dr. Arumugam', year: '2022-2024' },
    { title: 'Smart Campus IoT Security', agency: 'AICTE', amount: '₹8.0 Lakhs', pi: 'Dr. Meenakshi', year: '2023-2025' },
]

export default function Research() {
    return (
        <div className="pt-20">
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">Research & <span className="gradient-text">Achievements</span></h1>
                        <p className="text-slate-400 text-xl">Pioneering research across AI, cybersecurity, IoT, and emerging technologies.</p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {[
                            { label: 'Publications', value: '100+', icon: FileText, color: 'text-blue-400' },
                            { label: 'Funded Projects', value: '12', icon: DollarSign, color: 'text-teal-400' },
                            { label: 'Patents', value: '8', icon: Lightbulb, color: 'text-violet-400' },
                            { label: 'Awards', value: '25+', icon: Award, color: 'text-orange-400' },
                        ].map(({ label, value, icon: Icon, color }) => (
                            <div key={label} className="stat-card">
                                <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                                <p className="text-3xl font-bold font-heading gradient-text">{value}</p>
                                <p className="text-slate-300">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Publications */}
                    <h2 className="section-title mb-8">Recent <span className="gradient-text">Publications</span></h2>
                    <div className="space-y-4 mb-16">
                        {publications.map((pub, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="glass-card p-6 flex items-start gap-4 hover:border-accent-blue/30 transition-all">
                                <div className={`text-xs px-2 py-1 rounded-lg font-medium flex-shrink-0 ${pub.type === 'Journal' ? 'bg-blue-500/20 text-blue-400' : 'bg-violet-500/20 text-violet-400'}`}>
                                    {pub.type}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold font-heading">{pub.title}</h3>
                                    <p className="text-slate-400 text-sm mt-1">{pub.authors}</p>
                                    <p className="text-accent-blue text-sm mt-1">{pub.journal} • {pub.year}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Funded Projects */}
                    <h2 className="section-title mb-8">Funded <span className="gradient-text">Projects</span></h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {projects.map((proj, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="glass-card p-6 hover:border-accent-teal/30 transition-all hover:-translate-y-1">
                                <h3 className="text-white font-semibold font-heading mb-3">{proj.title}</h3>
                                <div className="space-y-2 text-sm">
                                    <p className="text-slate-400"><span className="text-slate-500">Agency:</span> <span className="text-accent-teal">{proj.agency}</span></p>
                                    <p className="text-slate-400"><span className="text-slate-500">Amount:</span> <span className="text-green-400 font-semibold">{proj.amount}</span></p>
                                    <p className="text-slate-400"><span className="text-slate-500">PI:</span> {proj.pi}</p>
                                    <p className="text-slate-400"><span className="text-slate-500">Period:</span> {proj.year}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
