import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import PortalLayout from './layouts/PortalLayout'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Faculty from './pages/Faculty'
import CurriculumLabs from './pages/CurriculumLabs'
import Research from './pages/Research'
import Placements from './pages/Placements'
import Events from './pages/Events'
import StudentCorner from './pages/StudentCorner'
import eLearning from './pages/eLearning'
import Login from './pages/Login'

// Portal Pages
import StudentDashboard from './pages/portal/StudentDashboard'
import FacultyDashboard from './pages/portal/FacultyDashboard'
import AdminPanel from './pages/portal/AdminPanel'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/curriculum-labs" element={<CurriculumLabs />} />
          <Route path="/research" element={<Research />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/events" element={<Events />} />
          <Route path="/student-corner" element={<StudentCorner />} />
          <Route path="/elearning" element={<eLearning />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Portal Routes */}
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<Navigate to="/portal/student" replace />} />
          <Route path="student" element={<StudentDashboard />} />
          <Route path="faculty" element={<FacultyDashboard />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
