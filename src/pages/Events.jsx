import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, X } from 'lucide-react'

const events = [
    { id: 1, title: 'AI/ML Workshop', type: 'Workshop', date: 'March 15, 2025', venue: 'Seminar Hall A', participants: 120, description: 'Hands-on workshop on Machine Learning using Python, Scikit-learn and TensorFlow.', status: 'Upcoming' },
    { id: 2, title: 'Symposium – TechNova 2025', type: 'Symposium', date: 'April 5, 2025', venue: 'Main Auditorium', participants: 500, description: 'Annual national-level technical symposium with paper presentations, project expo, and coding events.', status: 'Upcoming' },
    { id: 3, title: 'Cyber Security Seminar', type: 'Seminar', date: 'Feb 10, 2025', venue: 'Lab 3', participants: 60, description: 'Expert talk on ethical hacking, penetration testing and modern cybersecurity tools.', status: 'Completed' },
    { id: 4, title: 'Smart India Hackathon', type: 'Hackathon', date: 'May 20, 2025', venue: 'Innovation Hub', participants: 200, description: 'National-level hackathon organized by MoE. Our department sends top 5 teams.', status: 'Upcoming' },
    { id: 5, title: 'Cloud Computing Workshop', type: 'Workshop', date: 'Jan 28, 2025', venue: 'Cloud Lab', participants: 45, description: 'AWS certified instructor-led workshop on cloud fundamentals, EC2, and Lambda.', status: 'Completed' },
    { id: 6, title: 'Alumni Connect 2025', type: 'Alumni', date: 'June 8, 2025', venue: 'Open Amphitheatre', participants: 300, description: 'Annual alumni meet with career talks, networking sessions, and mentorship opportunities.', status: 'Upcoming' },
]

const typeColors = {
    Workshop: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Symposium: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    Seminar: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    Hackathon: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Alumni: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

export default function Events() {
    const [filter, setFilter] = useState('All')
    const [selected, setSelected] = useState(null)

    const types = ['All', 'Workshop', 'Symposium', 'Seminar', 'Hackathon', 'Alumni']
    const filtered = filter === 'All' ? events : events.filter(e => e.type === filter)

    return (
        <div className="pt-20">
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">Events & <span className="gradient-text">Gallery</span></h1>
                        <p className="text-slate-400 text-xl">Workshops, seminars, hackathons, and more — learn beyond the classroom.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {types.map((t) => (
                            <button key={t} onClick={() => setFilter(t)}
                                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${filter === t ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow' : 'glass-card text-slate-400 hover:text-white'
                                    }`}>
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((event, i) => (
                            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                                onClick={() => setSelected(event)}
                                className="glass-card p-6 cursor-pointer hover:border-accent-blue/40 hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${typeColors[event.type]}`}>
                                        {event.type}
                                    </span>
                                    <span className={`text-xs font-medium ${event.status === 'Upcoming' ? 'text-green-400' : 'text-slate-500'}`}>
                                        • {event.status}
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold font-heading mb-3">{event.title}</h3>
                                <p className="text-slate-400 text-sm line-clamp-2 mb-4">{event.description}</p>
                                <div className="space-y-1 text-xs text-slate-500">
                                    <div className="flex items-center gap-2"><Calendar className="w-3 h-3" />{event.date}</div>
                                    <div className="flex items-center gap-2"><MapPin className="w-3 h-3" />{event.venue}</div>
                                    <div className="flex items-center gap-2"><Users className="w-3 h-3" />{event.participants} participants</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="glass-card w-full max-w-lg p-8 relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg text-slate-400">
                            <X className="w-5 h-5" />
                        </button>
                        <span className={`text-xs px-3 py-1 rounded-full border font-medium mb-4 inline-block ${typeColors[selected.type]}`}>{selected.type}</span>
                        <h2 className="text-2xl font-heading font-bold text-white mb-3">{selected.title}</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">{selected.description}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="glass-card p-3 text-center">
                                <Calendar className="w-4 h-4 text-accent-blue mx-auto mb-1" />
                                <p className="text-slate-400 text-xs">Date</p>
                                <p className="text-white text-xs font-medium">{selected.date}</p>
                            </div>
                            <div className="glass-card p-3 text-center">
                                <MapPin className="w-4 h-4 text-accent-violet mx-auto mb-1" />
                                <p className="text-slate-400 text-xs">Venue</p>
                                <p className="text-white text-xs font-medium">{selected.venue}</p>
                            </div>
                            <div className="glass-card p-3 text-center">
                                <Users className="w-4 h-4 text-accent-teal mx-auto mb-1" />
                                <p className="text-slate-400 text-xs">Participants</p>
                                <p className="text-white text-xs font-medium">{selected.participants}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
