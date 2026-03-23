import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FileText, Calendar, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

// Simulated logged-in student data
const student = {
    name: 'Arun Kumar',
    regNo: '2021CS001',
    yearSection: 'III Year B.E. CSE - Section A',
}

const initialForm = {
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
    proof: null,
}

export default function LeaveRequest() {
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
    const [message, setMessage] = useState('')

    const totalDays = (() => {
        if (!form.fromDate || !form.toDate) return 0
        const from = new Date(form.fromDate)
        const to = new Date(form.toDate)
        const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1
        return diff > 0 ? diff : 0
    })()

    const validate = () => {
        const e = {}
        if (!form.leaveType) e.leaveType = 'Please select a leave type.'
        if (!form.fromDate) e.fromDate = 'From date is required.'
        if (!form.toDate) e.toDate = 'To date is required.'
        if (form.fromDate && form.toDate && new Date(form.toDate) < new Date(form.fromDate))
            e.toDate = 'To date must be after From date.'
        if (!form.reason.trim()) e.reason = 'Reason cannot be empty.'
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
            payload.append('yearSection', student.yearSection)
            payload.append('leaveType', form.leaveType)
            payload.append('fromDate', form.fromDate)
            payload.append('toDate', form.toDate)
            payload.append('totalDays', totalDays)
            payload.append('reason', form.reason)
            if (form.proof) payload.append('proof', form.proof)

            await axios.post('/api/student/leave-request', payload)
            setStatus('success')
            setMessage('Leave request submitted successfully! You will be notified once reviewed.')
            setForm(initialForm)
        } catch (err) {
            setStatus('error')
            setMessage(err?.response?.data?.message || 'Submission failed. Please try again.')
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="glass-card p-6 bg-gradient-to-r from-accent-blue/10 to-accent-violet/10 border border-accent-blue/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-heading font-bold text-white">Leave Request</h1>
                        <p className="text-slate-400 text-xs mt-0.5">Fill in the details below to submit a leave request</p>
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
                {/* Auto-filled read-only */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Student Name">
                        <input value={student.name} readOnly className="form-input opacity-60 cursor-not-allowed" />
                    </Field>
                    <Field label="Register Number">
                        <input value={student.regNo} readOnly className="form-input opacity-60 cursor-not-allowed" />
                    </Field>
                </div>
                <Field label="Year / Section">
                    <input value={student.yearSection} readOnly className="form-input opacity-60 cursor-not-allowed" />
                </Field>

                <hr className="border-white/5" />

                {/* Leave Type */}
                <Field label="Leave Type" error={errors.leaveType}>
                    <select name="leaveType" value={form.leaveType} onChange={handleChange} className="form-input">
                        <option value="">Select leave type</option>
                        <option value="Sick">🤒 Sick Leave</option>
                        <option value="Personal">👤 Personal Leave</option>
                        <option value="Emergency">🚨 Emergency Leave</option>
                    </select>
                </Field>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="From Date" error={errors.fromDate}>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange}
                                className="form-input pl-9" />
                        </div>
                    </Field>
                    <Field label="To Date" error={errors.toDate}>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            <input type="date" name="toDate" value={form.toDate} onChange={handleChange}
                                className="form-input pl-9" />
                        </div>
                    </Field>
                    <Field label="Total Days">
                        <div className="form-input flex items-center gap-2 opacity-60 cursor-not-allowed select-none">
                            <span className={`font-bold text-lg ${totalDays > 0 ? 'text-accent-blue' : 'text-slate-500'}`}>
                                {totalDays}
                            </span>
                            <span className="text-slate-400 text-sm">day{totalDays !== 1 ? 's' : ''}</span>
                        </div>
                    </Field>
                </div>

                {/* Reason */}
                <Field label="Reason" error={errors.reason}>
                    <textarea name="reason" value={form.reason} onChange={handleChange} rows={4}
                        placeholder="Describe the reason for your leave..."
                        className="form-input resize-none" />
                </Field>

                {/* Proof Upload */}
                <Field label="Upload Proof (PDF / JPG / PNG) — Optional">
                    <label className="flex items-center gap-3 form-input cursor-pointer hover:border-accent-blue/50 transition-colors">
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
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-blue to-accent-violet hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'loading' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                        <><FileText className="w-4 h-4" /> Submit Leave Request</>
                    )}
                </button>
            </form>

            <style>{`
                .form-input {
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
                .form-input:focus { border-color: rgba(14,165,233,0.5); }
                .form-input option { background: #1e293b; color: #f8fafc; }
                select.form-input { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; padding-right: 36px; }
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
