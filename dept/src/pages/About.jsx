import React from 'react'
import { motion } from 'framer-motion'
import { Target, Lightbulb, Award, Clock } from 'lucide-react'

const timeline = [
    { year: '2004', event: 'Department established with 60 UG seats' },
    { year: '2008', event: 'PG program (M.E. CSE) introduced' },
    { year: '2012', event: 'PhD program launched with research labs' },
    { year: '2016', event: 'NBA Accreditation achieved' },
    { year: '2019', event: 'AI & Cloud Computing labs inaugurated' },
    { year: '2022', event: 'Cyber Security Centre of Excellence established' },
    { year: '2024', event: '95%+ placement record achieved' },
]

export default function About() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.1)_0%,_transparent_60%)]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-block bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 text-accent-blue text-sm font-medium mb-4">
                            About Us
                        </div>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">
                            About the <span className="gradient-text">Department</span>
                        </h1>
                        <p className="text-slate-400 text-xl leading-relaxed">
                            Two decades of excellence in Computer Science & Engineering education, research, and industry connect.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section id="vision" className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Vision & <span className="gradient-text">Mission</span></h2>
                    <p className="section-subtitle">Our guiding principles</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="glass-card p-8 border-l-4 border-accent-blue">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-blue/20 flex items-center justify-center">
                                    <Target className="w-6 h-6 text-accent-blue" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white">Vision</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-lg italic">
                                "To be a world-class center of excellence in Computer Science and Engineering education, research, and innovation, producing globally competent engineers and researchers."
                            </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="glass-card p-8 border-l-4 border-accent-violet">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-violet/20 flex items-center justify-center">
                                    <Lightbulb className="w-6 h-6 text-accent-violet" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white">Mission</h3>
                            </div>
                            <ul className="text-slate-300 leading-relaxed space-y-3">
                                {[
                                    'Impart quality education through innovative teaching methodologies.',
                                    'Foster research culture and encourage publications.',
                                    'Provide industry-oriented training and internships.',
                                    'Develop ethical, responsible, and technically sound engineers.',
                                ].map((m, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-accent-violet mt-1">▸</span> {m}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* HoD Message */}
            <section id="hod" className="section-pad bg-primary-light/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">HoD's <span className="gradient-text">Message</span></h2>
                    <p className="section-subtitle">A word from our department head</p>
                    <div className="glass-card p-10 max-w-4xl mx-auto relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full -translate-y-20 translate-x-20" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0">
                                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-white font-bold font-heading text-3xl">
                                    RK
                                </div>
                            </div>
                            <div>
                                <blockquote className="text-slate-300 text-lg italic leading-relaxed mb-6">
                                    "It gives me immense pleasure to present the CSE Department — a vibrant hub of learning, innovation, and growth. Our faculty are dedicated mentors, our students are passionate learners, and together, we strive to make a meaningful impact on the world of computing. I welcome students to join our community and be part of our journey towards excellence."
                                </blockquote>
                                <div>
                                    <p className="text-white font-bold font-heading text-xl">Dr. R. Krishnamurthy</p>
                                    <p className="text-accent-blue">Professor & Head, Department of CSE</p>
                                    <p className="text-slate-400 text-sm mt-1">Ph.D (CSE), IIT Madras | 22 Years Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* History Timeline */}
            <section id="history" className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Department <span className="gradient-text">History</span></h2>
                    <p className="section-subtitle">Our journey through the years</p>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue to-accent-violet" />
                        <div className="space-y-8">
                            {timeline.map(({ year, event }, i) => (
                                <motion.div key={year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                    className="flex items-start gap-6 pl-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center flex-shrink-0 shadow-glow">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="glass-card p-4 flex-1 hover:border-accent-blue/30 transition-all">
                                        <span className="gradient-text font-bold font-heading text-xl">{year}</span>
                                        <p className="text-slate-300 mt-1">{event}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Accreditations */}
            <section className="section-pad bg-primary-light/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Accreditations & <span className="gradient-text">Recognition</span></h2>
                    <p className="section-subtitle">Recognized for excellence</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['NBA Accredited', 'NAAC A+', 'ISO 9001:2015', 'AICTE Approved'].map((item) => (
                            <motion.div key={item} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                className="glass-card p-6 text-center hover:border-accent-blue/40 transition-all hover:-translate-y-1">
                                <Award className="w-10 h-10 text-accent-blue mx-auto mb-3" />
                                <p className="text-white font-semibold font-heading">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
