// Mock data for Faculty
export const faculty = [
    {
        id: 1,
        name: "Dr. R. Krishnamurthy",
        designation: "Professor & Head",
        category: "Professor",
        qualification: "Ph.D (CSE), IIT Madras",
        experience: "22 Years",
        specialization: "Machine Learning, Data Science",
        email: "hod.cse@dept.edu",
        publications: 48,
        image: null,
    },
    {
        id: 2,
        name: "Dr. S. Meenakshi",
        designation: "Professor",
        category: "Professor",
        qualification: "Ph.D (IT), Anna University",
        experience: "18 Years",
        specialization: "Cloud Computing, IoT",
        email: "meenakshi@dept.edu",
        publications: 32,
        image: null,
    },
    {
        id: 3,
        name: "Dr. P. Arumugam",
        designation: "Associate Professor",
        category: "Associate Professor",
        qualification: "Ph.D (CSE), VIT",
        experience: "14 Years",
        specialization: "Cybersecurity, Blockchain",
        email: "arumugam@dept.edu",
        publications: 21,
        image: null,
    },
    {
        id: 4,
        name: "Ms. K. Priya",
        designation: "Associate Professor",
        category: "Associate Professor",
        qualification: "M.E (CSE), Anna University",
        experience: "10 Years",
        specialization: "Web Technologies, DBMS",
        email: "priya@dept.edu",
        publications: 14,
        image: null,
    },
    {
        id: 5,
        name: "Mr. A. Venkatesh",
        designation: "Assistant Professor",
        category: "Assistant Professor",
        qualification: "M.E (Software Engg)",
        experience: "6 Years",
        specialization: "Full Stack Development",
        email: "venkatesh@dept.edu",
        publications: 8,
        image: null,
    },
    {
        id: 6,
        name: "Ms. D. Kavitha",
        designation: "Assistant Professor",
        category: "Assistant Professor",
        qualification: "M.Tech (CSE)",
        experience: "5 Years",
        specialization: "Artificial Intelligence, NLP",
        email: "kavitha@dept.edu",
        publications: 6,
        image: null,
    },
];

// Mock data for Announcements
export const announcements = [
    {
        id: 1,
        type: "Workshop",
        title: "AI/ML Workshop 2025",
        date: "March 15, 2025",
        description: "Hands-on workshop on Machine Learning using Python and TensorFlow.",
        badge: "Upcoming",
    },
    {
        id: 2,
        type: "Internship",
        title: "Google Summer Internship Drive",
        date: "March 20, 2025",
        description: "Applications open for Summer 2025 internship program at Google.",
        badge: "Apply Now",
    },
    {
        id: 3,
        type: "Exam",
        title: "Internal Assessment II",
        date: "March 25, 2025",
        description: "Internal Assessment II for all UG & PG programs.",
        badge: "Important",
    },
    {
        id: 4,
        type: "Hackathon",
        title: "Smart India Hackathon 2025",
        date: "April 5, 2025",
        description: "Team registrations open for SIH 2025. Max 6 members per team.",
        badge: "Register",
    },
];

// Mock data for Recruiters
export const recruiters = [
    "TCS", "Infosys", "Wipro", "Cognizant", "HCL",
    "Accenture", "IBM", "Amazon", "Google", "Microsoft",
    "Zoho", "Freshworks"
];

// Department Stats
export const stats = [
    { label: "Students", value: 1000, suffix: "+" },
    { label: "Faculty", value: 40, suffix: "+" },
    { label: "Placement %", value: 95, suffix: "%" },
    { label: "Labs", value: 10, suffix: "+" },
    { label: "MoUs", value: 20, suffix: "+" },
];

// Programs
export const programs = [
    {
        id: 1,
        level: "UG",
        name: "B.E. Computer Science & Engineering",
        duration: "4 Years",
        intake: 120,
        eligibility: "10+2 with Physics, Chemistry, Maths",
        highlights: ["AI/ML", "Cloud Computing", "Full Stack Development", "Data Science"],
    },
    {
        id: 2,
        level: "PG",
        name: "M.E. Computer Science & Engineering",
        duration: "2 Years",
        intake: 18,
        eligibility: "B.E./B.Tech in CSE or related",
        highlights: ["Research Projects", "Specializations", "Industry Connect", "Thesis"],
    },
    {
        id: 3,
        level: "PhD",
        name: "Ph.D Computer Science",
        duration: "3-5 Years",
        intake: 5,
        eligibility: "M.E./M.Tech with GATE/NET",
        highlights: ["Research Labs", "Publications", "Funded Projects", "Patents"],
    },
];

// Student attendance data
export const attendanceData = [
    { subject: "DS", attended: 42, total: 45, percentage: 93 },
    { subject: "OS", attended: 38, total: 48, percentage: 79 },
    { subject: "CN", attended: 44, total: 46, percentage: 96 },
    { subject: "DBMS", attended: 35, total: 44, percentage: 80 },
    { subject: "AI", attended: 40, total: 42, percentage: 95 },
    { subject: "SE", attended: 30, total: 44, percentage: 68 },
];

// Timetable
export const timetable = [
    { time: "9:00 - 10:00", subject: "Data Structures", room: "A101", faculty: "Dr. Meenakshi" },
    { time: "10:00 - 11:00", subject: "Operating Systems", room: "A102", faculty: "Mr. Venkatesh" },
    { time: "11:15 - 12:15", subject: "Computer Networks", room: "A101", faculty: "Dr. Krishnamurthy" },
    { time: "1:00 - 2:00", subject: "DBMS Lab", room: "Lab 3", faculty: "Ms. Kavitha" },
    { time: "2:00 - 3:00", subject: "AI Lab", room: "Lab 2", faculty: "Dr. Arumugam" },
];

// Labs
export const labs = [
    { name: "Artificial Intelligence Lab", capacity: 60, systems: 60, software: ["Python", "TensorFlow", "PyTorch"], year: 2022 },
    { name: "Cloud Computing Lab", capacity: 60, systems: 60, software: ["AWS", "Azure", "GCP"], year: 2021 },
    { name: "Cyber Security Lab", capacity: 40, systems: 40, software: ["Kali Linux", "Wireshark", "Metasploit"], year: 2023 },
    { name: "IoT & Embedded Systems Lab", capacity: 30, systems: 30, software: ["Arduino IDE", "Raspberry Pi"], year: 2022 },
    { name: "Full Stack Development Lab", capacity: 60, systems: 60, software: ["VS Code", "Node.js", "React"], year: 2020 },
];

// Placements data
export const placementStats = [
    { year: "2021", percentage: 88, avgPackage: 4.2 },
    { year: "2022", percentage: 91, avgPackage: 5.1 },
    { year: "2023", percentage: 94, avgPackage: 6.3 },
    { year: "2024", percentage: 95, avgPackage: 7.2 },
];
