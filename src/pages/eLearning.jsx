import React from 'react'
import { motion } from 'framer-motion'
import { Play, BookOpen, Star, Clock } from 'lucide-react'

const courses = [
    { title: 'Machine Learning with Python', instructor: 'Dr. Meenakshi', duration: '40h', rating: 4.9, enrolled: 320, tag: 'AI/ML', color: 'from-blue-500 to-cyan-500' },
    { title: 'Full Stack Web Development', instructor: 'Mr. Venkatesh', duration: '60h', rating: 4.8, enrolled: 280, tag: 'Development', color: 'from-violet-500 to-purple-500' },
    { title: 'Cloud Computing Essentials', instructor: 'Dr. Meenakshi', duration: '30h', rating: 4.7, enrolled: 190, tag: 'Cloud', color: 'from-teal-500 to-green-500' },
    { title: 'Ethical Hacking & Security', instructor: 'Dr. Arumugam', duration: '35h', rating: 4.9, enrolled: 150, tag: 'Security', color: 'from-orange-500 to-red-500' },
    { title: 'Data Structures & Algorithms', instructor: 'Dr. Krishnamurthy', duration: '50h', rating: 4.8, enrolled: 400, tag: 'DSA', color: 'from-pink-500 to-rose-500' },
    { title: 'Deep Learning & Neural Nets', instructor: 'Ms. Kavitha', duration: '45h', rating: 4.7, enrolled: 210, tag: 'AI/ML', color: 'from-indigo-500 to-blue-500' },
]

export default function eLearning() {
    return (
        <div className="pt-20">
            <section className="section-pad bg-gradient-to-br from-primary via-primary-light to-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6">e<span className="gradient-text">Learning</span> Portal</h1>
                        <p className="text-slate-400 text-xl">Department's online course library — learn at your own pace.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-pad">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title">Available <span className="gradient-text">Courses</span></h2>
                    <p className="section-subtitle">Created by our expert faculty for students and alumni</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, i) => (
                            <motion.div key={course.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                                className="glass-card overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group">
                                <div className={`h-3 bg-gradient-to-r ${course.color}`} />
                                <div className="p-6">
                                    <span className={`inline-block text-xs bg-gradient-to-r ${course.color} text-white px-3 py-1 rounded-full font-medium mb-3`}>
                                        {course.tag}
                                    </span>
                                    <h3 className="text-white font-semibold font-heading mb-2">{course.title}</h3>
                                    <p className="text-slate-400 text-sm mb-4">By {course.instructor}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{course.rating}</span>
                                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.enrolled} enrolled</span>
                                    </div>
                                    <button className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${course.color} opacity-80 hover:opacity-100 transition-all flex items-center justify-center gap-2 group-hover:shadow-glow`}>
                                        <Play className="w-4 h-4" /> Start Learning
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
