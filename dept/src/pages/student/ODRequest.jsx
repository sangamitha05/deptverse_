import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FileBadge, Calendar, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const student = {
    name: 'Arun Kumar',
    regNo: '2021CS001',
}

const initialForm = {
    eventName: '',
    eventType: '',
    organization: '',
    fromDate: '',
    toDate: '',
    facultyIncharge: '',
    proof: null,
}

const required = ['eventName', 'eventType', 'organization', 'fromDate', 'toDate', 'facultyIncharge']

export default function ODRequest() {
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    const validate = () => {
        const e = {}
        required.forEach((field) => {
            if (!form[field].trim()) e[field] = 'This field is required.'
        })
        if (form.fromDate && form.toDate && new Date(form.toDate) < new Date(form.fromDate))
            e.toDate = 'To date must be on or after From date.'
        return e
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }))
        setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const e2 = validate()
        if (Object.keys(e2).length) { setErrors(e2); return }

        setStatus('loading')
        try {
            const payload = new FormData()
            payload.append('studentName', student.name)
            payload.append('regNo', student.regNo)
            Object.entries(form).forEach(([k, v]) => {
                if (k !== 'proof' && v) payload.append(k, v)
            })
            if (form.proof) payload.append('proof', form.proof)

            await axios.post('/api/student/od-request', payload)
            setStatus('success')
            setMessage('OD request submitted successfully! Your faculty will be notified.')
            setForm(initialForm)
        } catch (err) {
            setStatus('error')
            setMessage(err?.response?.data?.message || 'Submission failed. Please try again.')
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="glass-card p-6 bg-gradient-to-r from-accent-teal/10 to-accent-blue/10 border border-accent-teal/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-teal to-accent-blue flex items-center justify-center">
                        <FileBadge className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-heading font-bold text-white">OD Request</h1>
                        <p className="text-slate-400 text-xs mt-0.5">Request On-Duty permission for events and activities</p>
                    </div>
                </div>
            </div>

            {/* Status Banner */}
            {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4 border border-teal-500/30 bg-teal-500/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <p className="text-teal-300 text-sm">{message}</p>
                </motion.div>
            )}
            {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4 border border-red-500/30 bg-red-500/10 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{message}</p>
                </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
                {/* Auto-filled */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Student Name">
                        <input value={student.name} readOnly className="od-input opacity-60 cursor-not-allowed" />
                    </Field>
                    <Field label="Register Number">
                        <input value={student.regNo} readOnly className="od-input opacity-60 cursor-not-allowed" />
                    </Field>
                </div>

                <hr className="border-white/5" />

                {/* Event Name */}
                <Field label="Event Name" error={errors.eventName}>
                    <input type="text" name="eventName" value={form.eventName} onChange={handleChange}
                        placeholder="e.g. National Level Hackathon 2025"
                        className="od-input" />
                </Field>

                {/* Event Type & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Event Type" error={errors.eventType}>
                        <select name="eventType" value={form.eventType} onChange={handleChange} className="od-input">
                            <option value="">Select type</option>
                            <option value="Workshop">🛠 Workshop</option>
                            <option value="Symposium">🎓 Symposium</option>
                            <option value="Sports">⚽ Sports</option>
                            <option value="Other">📌 Other</option>
                        </select>
                    </Field>
                    <Field label="Organization / College" error={errors.organization}>
                        <input type="text" name="organization" value={form.organization} onChange={handleChange}
                            placeholder="e.g. Anna University"
                            className="od-input" />
                    </Field>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="From Date" error={errors.fromDate}>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange}
                                className="od-input pl-9" />
                        </div>
                    </Field>
                    <Field label="To Date" error={errors.toDate}>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            <input type="date" name="toDate" value={form.toDate} onChange={handleChange}
                                className="od-input pl-9" />
                        </div>
                    </Field>
                </div>

                {/* Faculty Incharge */}
                <Field label="Faculty Incharge" error={errors.facultyIncharge}>
                    <input type="text" name="facultyIncharge" value={form.facultyIncharge} onChange={handleChange}
                        placeholder="e.g. Dr. Meenakshi R"
                        className="od-input" />
                </Field>

                {/* Proof Upload */}
                <Field label="Upload Proof / Permission Letter (PDF / JPG / PNG) — Optional">
                    <label className="flex items-center gap-3 od-input cursor-pointer hover:border-accent-teal/50 transition-colors">
                        <Upload className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-400 text-sm truncate">
                            {form.proof ? form.proof.name : 'Click to upload a file'}
                        </span>
                        <input type="file" name="proof" accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleChange} className="hidden" />
                    </label>
                </Field>

                {/* Submit */}
                <button type="submit" disabled={status === 'loading'}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-teal to-accent-blue hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'loading' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                        <><FileBadge className="w-4 h-4" /> Submit OD Request</>
                    )}
                </button>
            </form>

            <style>{`
                .od-input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 10px 14px;
                    color: #f8fafc;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.2s;
                    appearance: none;
                }
                .od-input:focus { border-color: rgba(20,184,166,0.5); }
                .od-input option { background: #1e293b; color: #f8fafc; }
                select.od-input { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; padding-right: 36px; }
            `}</style>
        </motion.div>
    )
}

function Field({ label, error, children }) {
    return (
        <div className="space-y-1.5">
            <label className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</label>
            {children}
            {error && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
        </div>
    )
}
