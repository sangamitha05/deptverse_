import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ListChecks, Clock, CheckCircle2, XCircle, FileText, FileBadge, RefreshCw } from 'lucide-react'

const MOCK_REQUESTS = [
    {
        id: 1,
        requestType: 'Leave',
        fromDate: '2025-01-10',
        toDate: '2025-01-12',
        totalDays: 3,
        status: 'Approved',
        remarks: 'Approved. Rest well and recover.',
    },
    {
        id: 2,
        requestType: 'OD',
        fromDate: '2025-01-20',
        toDate: '2025-01-20',
        totalDays: 1,
        status: 'Pending',
        remarks: '—',
    },
    {
        id: 3,
        requestType: 'Leave',
        fromDate: '2025-02-05',
        toDate: '2025-02-05',
        totalDays: 1,
        status: 'Rejected',
        remarks: 'Insufficient medical proof provided.',
    },
    {
        id: 4,
        requestType: 'OD',
        fromDate: '2025-02-14',
        toDate: '2025-02-15',
        totalDays: 2,
        status: 'Approved',
        remarks: 'Approved for National Symposium.',
    },
]

function fmt(dateStr) {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

export default function MyRequests() {
    const [requests, setRequests] = useState(MOCK_REQUESTS)
    const [filter, setFilter] = useState('All')
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = async () => {
        setRefreshing(true)
        try {
            const res = await fetch('/api/student/my-requests')
            if (res.ok) {
                const data = await res.json()
                setRequests(data)
            }
        } catch (e) {
            // keep mock data
        } finally {
            setTimeout(() => setRefreshing(false), 500)
        }
    }

    const filters = ['All', 'Leave', 'OD', 'Pending', 'Approved', 'Rejected']

    const filtered = requests.filter((r) => {
        if (filter === 'All') return true
        if (filter === 'Leave' || filter === 'OD') return r.requestType === filter
        return r.status === filter
    })

    const stats = [
        { label: 'Total', value: requests.length, color: '#f8fafc' },
        { label: 'Approved', value: requests.filter((r) => r.status === 'Approved').length, color: '#2dd4bf' },
        { label: 'Pending', value: requests.filter((r) => r.status === 'Pending').length, color: '#facc15' },
        { label: 'Rejected', value: requests.filter((r) => r.status === 'Rejected').length, color: '#f87171' },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
            {/* Header */}
            <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(to right, rgba(124,58,237,0.1), rgba(14,165,233,0.1))', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ListChecks size={20} color="#fff" />
                        </div>
                        <div>
                            <h1 style={{ color: '#f8fafc', fontWeight: 700, fontSize: 20, margin: 0 }}>My Requests</h1>
                            <p style={{ color: '#94a3b8', fontSize: 12, margin: '2px 0 0' }}>Track all your leave and OD submissions</p>
                        </div>
                    </div>
                    <button
                        onClick={handleRefresh}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, background: 'rgba(255,255,255,0.04)', color: '#94a3b8', cursor: 'pointer', fontSize: 14 }}
                    >
                        <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {stats.map((s) => (
                    <div key={s.label} className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
                        <p style={{ fontSize: 28, fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
                        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '6px 16px',
                            borderRadius: 12,
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: 'pointer',
                            border: 'none',
                            background: filter === f
                                ? 'linear-gradient(to right, #7c3aed, #0ea5e9)'
                                : 'rgba(255,255,255,0.06)',
                            color: filter === f ? '#fff' : '#94a3b8',
                            transition: 'all 0.2s',
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                {filtered.length === 0 ? (
                    <div style={{ padding: 48, textAlign: 'center', color: '#64748b' }}>
                        <ListChecks size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                        <p style={{ fontSize: 14 }}>No requests found.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                    {['Type', 'From Date', 'To Date', 'Days', 'Status', 'Faculty Remarks'].map((h) => (
                                        <th key={h} style={{ padding: '14px 20px', textAlign: h === 'Days' || h === 'Status' ? 'center' : 'left', color: '#64748b', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((req) => (
                                    <tr key={req.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        {/* Type */}
                                        <td style={{ padding: '16px 20px' }}>
                                            {req.requestType === 'Leave' ? (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.25)' }}>
                                                    <FileText size={11} /> Leave
                                                </span>
                                            ) : (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: 'rgba(14,165,233,0.15)', color: '#7dd3fc', border: '1px solid rgba(14,165,233,0.25)' }}>
                                                    <FileBadge size={11} /> OD
                                                </span>
                                            )}
                                        </td>
                                        {/* From */}
                                        <td style={{ padding: '16px 20px', color: '#cbd5e1' }}>{fmt(req.fromDate)}</td>
                                        {/* To */}
                                        <td style={{ padding: '16px 20px', color: '#cbd5e1' }}>{fmt(req.toDate)}</td>
                                        {/* Days */}
                                        <td style={{ padding: '16px 20px', textAlign: 'center', color: '#f8fafc', fontWeight: 700 }}>{req.totalDays}</td>
                                        {/* Status */}
                                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                            {req.status === 'Approved' && (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: 'rgba(20,184,166,0.15)', color: '#2dd4bf', border: '1px solid rgba(20,184,166,0.25)' }}>
                                                    <CheckCircle2 size={11} /> Approved
                                                </span>
                                            )}
                                            {req.status === 'Pending' && (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: 'rgba(234,179,8,0.15)', color: '#fde047', border: '1px solid rgba(234,179,8,0.25)' }}>
                                                    <Clock size={11} /> Pending
                                                </span>
                                            )}
                                            {req.status === 'Rejected' && (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}>
                                                    <XCircle size={11} /> Rejected
                                                </span>
                                            )}
                                        </td>
                                        {/* Remarks */}
                                        <td style={{ padding: '16px 20px', color: '#94a3b8', maxWidth: 240 }}>
                                            <span title={req.remarks} style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {req.remarks}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                tr:hover { background: rgba(255,255,255,0.025); }
            `}</style>
        </motion.div>
    )
}
