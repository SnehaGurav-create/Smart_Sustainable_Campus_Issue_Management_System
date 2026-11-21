import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import {
  Leaf,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Droplets,
  Recycle,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Building,
  Check,
  Activity,
  Award,
  TrendingUp,
  QrCode,
  Star,
  ChevronRight,
  Layers,
  Cpu,
  MapPin,
  Camera,
  Compass,
} from 'lucide-react';

export default function LandingPage() {
  const { user, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  // Interactive Hero Preview state
  const [activePreviewTab, setActivePreviewTab] = useState('operations'); // 'operations' | 'sustainability'
  // Interactive Role Showcase state
  const [activeRoleTab, setActiveRoleTab] = useState('student'); // 'student' | 'staff' | 'admin' | 'sustainability'
  // Interactive Simulator state
  const [simBuildingCount, setSimBuildingCount] = useState(6);

  const handleDemoLaunch = async (role) => {
    const newUser = await switchDemoRole(role);
    const targetRole = newUser?.role || role;
    if (targetRole === 'student') navigate('/student');
    else if (targetRole === 'staff' || targetRole === 'maintenance_staff') navigate('/staff');
    else if (targetRole === 'admin') navigate('/admin');
    else if (targetRole === 'sustainability_officer') navigate('/sustainability');
  };

  const rolePreviews = {
    student: {
      title: 'Student & Faculty Portal',
      subtitle: '30-second complaint logging with instant status tracking',
      badge: 'Student Experience',
      badgeColor: 'bg-blue-100 text-blue-700',
      demoRole: 'student',
      demoName: 'Aarav Sharma',
      features: [
        'Report broken ACs, water leaks, or lab hazards in under 30 seconds',
        'Upload camera photos and pinpoint precise campus block and room',
        'Live progress timeline from "Assigned" to "Resolved"',
        'Submit ratings and feedback once maintenance work is completed',
      ],
      mockData: {
        ticketId: 'CMP-2026-089',
        title: 'Water Leakage in 3rd Floor Restroom',
        location: 'Academic Block B • Room 304',
        status: 'In Progress',
        statusColor: 'bg-amber-100 text-amber-700 border-amber-200',
        eta: 'Est. completion in 25 mins',
      },
    },
    staff: {
      title: 'Maintenance Staff Dispatch Hub',
      subtitle: 'Actionable work orders with SLA deadlines & resolution proof',
      badge: 'Technician Operations',
      badgeColor: 'bg-purple-100 text-purple-700',
      demoRole: 'staff',
      demoName: 'Vikram Singh (Electrical Lead)',
      features: [
        'Mobile-optimized dispatch queue prioritized by urgency',
        'One-tap status progression: Accept, On-Site, In-Progress, Resolved',
        'Mandatory resolution photo upload for accountability',
        'Track personal SLA turnaround times and student satisfaction ratings',
      ],
      mockData: {
        ticketId: 'CMP-2026-074',
        title: 'Projector Power Surge in Seminar Hall A',
        location: 'Central Library Building • 1st Floor',
        status: 'Assigned',
        statusColor: 'bg-purple-100 text-purple-700 border-purple-200',
        eta: 'SLA Target: 2 Hours Remaining',
      },
    },
    admin: {
      title: 'Campus Central Command',
      subtitle: 'Automated triage, technician assignment & SLA compliance',
      badge: 'Administrative Intelligence',
      badgeColor: 'bg-rose-100 text-rose-700',
      demoRole: 'admin',
      demoName: 'Dr. Sunita Rao (Campus Admin)',
      features: [
        'Real-time overview of open, overdue, and completed complaints',
        'Department workload balancing across Electrical, Plumbing, and IT',
        'Automated SLA breach escalation alerts to senior supervisors',
        'Generate instant QR codes for campus equipment and room assets',
      ],
      mockData: {
        ticketId: 'ADMIN-METRICS',
        title: 'System Health: 98.4% SLA Compliance Rate',
        location: 'All 6 Academic & Hostel Zones',
        status: 'Optimal',
        statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        eta: '14 active work orders across 4 departments',
      },
    },
    sustainability: {
      title: 'Campus Sustainability Intelligence',
      subtitle: 'Audit-ready carbon emissions & resource telemetry',
      badge: 'Eco Governance',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      demoRole: 'sustainability_officer',
      demoName: 'Priya Deshmukh (Eco Officer)',
      features: [
        'Dynamic Sustainability Score calculation (0–100 Weighted Index)',
        'Rooftop solar telemetry vs. municipal grid consumption',
        'Water balance accounting (Municipal intake vs. STP recycled greywater)',
        'Green student campaigns with engagement leaderboards and impact badges',
      ],
      mockData: {
        ticketId: 'SUSTAIN-KPI',
        title: 'Composite Eco Score: 83 / 100 (Tier A)',
        location: 'Campus Carbon Balance: -34.8 t CO₂e Offset',
        status: 'Target Met',
        statusColor: 'bg-mint-soft text-[#1b7a52] border-mint-DEFAULT/40',
        eta: '12,900 kWh clean solar energy harvested this cycle',
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] selection:bg-mint-DEFAULT selection:text-navy-deep">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-white via-white to-[#F5F8FC] border-b border-campus-border">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-mint-DEFAULT/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Pill */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-mint-soft/90 border border-mint-DEFAULT/50 text-navy-deep text-xs font-semibold mb-6 shadow-xs backdrop-blur-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide">Smart &amp; Sustainable Campus Platform &bull; Live Academic Year 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-navy-deep tracking-tight max-w-5xl mx-auto leading-[1.1]">
              A Smarter Campus.{' '}
              <span className="relative inline-block text-navy-primary">
                A Greener Future.
                <span className="absolute left-0 bottom-1.5 w-full h-3 bg-mint-DEFAULT/40 -z-10 rounded-sm"></span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-xl text-campus-muted max-w-3xl mx-auto leading-relaxed font-normal">
              Unifying <strong>rapid campus maintenance dispatch</strong> with <strong>real-time carbon accounting &amp; resource telemetry</strong>. Built for students, technicians, administrators, and sustainability teams.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={user ? '/student/report' : '/login'}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-navy-primary text-white font-bold text-sm hover:bg-navy-secondary transition-smooth shadow-card flex items-center justify-center gap-2.5 group"
              >
                <AlertTriangle className="w-4 h-4 text-mint-DEFAULT" />
                <span>Report a Facility Issue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/sustainability"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-campus-border text-navy-primary font-bold text-sm hover:bg-slate-50 transition-smooth shadow-xs flex items-center justify-center gap-2.5 hover:border-mint-DEFAULT"
              >
                <Leaf className="w-4 h-4 text-[#22A06B]" />
                <span>Explore Eco Intelligence</span>
              </Link>
            </div>

           
          </div>

          {/* Interactive Live Product Showcase Mockup */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="relative rounded-3xl bg-white border border-campus-border shadow-2xl overflow-hidden">
              {/* Mockup Window Titlebar */}
              <div className="bg-navy-deep px-5 py-3.5 flex items-center justify-between border-b border-navy-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  <span className="ml-3 text-xs font-mono text-white hidden sm:inline">
                    smartcampus.cloud • unified operations console
                  </span>
                </div>

                {/* Tab Switcher inside Hero Mockup */}
                <div className="flex items-center gap-1 bg-navy-secondary p-1 rounded-lg">
                  <button
                    onClick={() => setActivePreviewTab('operations')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-smooth ${
                      activePreviewTab === 'operations'
                        ? 'bg-mint-DEFAULT text-navy-deep shadow-xs'
                        : 'text-white hover:text-mint-DEFAULT'
                    }`}
                  >
                    ⚡ Operations Stream
                  </button>
                  <button
                    onClick={() => setActivePreviewTab('sustainability')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-smooth ${
                      activePreviewTab === 'sustainability'
                        ? 'bg-mint-DEFAULT text-navy-deep shadow-xs'
                        : 'text-white hover:text-mint-DEFAULT'
                    }`}
                  >
                    🌱 Eco Telemetry
                  </button>
                </div>
              </div>

              {/* Mockup Body Content */}
              <div className="p-6 sm:p-8 bg-slate-50/70">
                {activePreviewTab === 'operations' ? (
                  <div className="space-y-6">
                    {/* Live Ticket Card */}
                    <div className="bg-white p-5 rounded-2xl border border-campus-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <Droplets className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono font-bold text-navy-primary bg-slate-100 px-2 py-0.5 rounded">
                              TKT-2026-104
                            </span>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Technician En-Route (ETA 14m)
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                              High Priority
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-navy-deep mt-1">
                            Main Water Pump Faucet Valve Pressure Loss
                          </h4>
                          <p className="text-xs text-campus-muted flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-campus-muted" />
                            Academic Quad Block B • Central Mechanical Bay 2
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                        <div className="text-right">
                          <div className="text-[11px] text-campus-muted">Assigned Lead</div>
                          <div className="text-xs font-bold text-navy-primary">Ramesh Patel (Plumbing)</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                          RP
                        </div>
                      </div>
                    </div>

                    {/* Operational Metrics Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      <div className="bg-white p-3.5 rounded-xl border border-campus-border shadow-xs">
                        <div className="text-[11px] text-campus-muted font-medium">SLA Resolution Rate</div>
                        <div className="text-xl font-extrabold text-navy-deep mt-0.5 flex items-center gap-1">
                          98.4%
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            ↑ 2.1%
                          </span>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-campus-border shadow-xs">
                        <div className="text-[11px] text-campus-muted font-medium">Avg Dispatch Speed</div>
                        <div className="text-xl font-extrabold text-navy-deep mt-0.5">18 mins</div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-campus-border shadow-xs">
                        <div className="text-[11px] text-campus-muted font-medium">Resolved This Month</div>
                        <div className="text-xl font-extrabold text-[#1b7a52] mt-0.5">342 Issues</div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-campus-border shadow-xs">
                        <div className="text-[11px] text-campus-muted font-medium">Student Satisfaction</div>
                        <div className="text-xl font-extrabold text-amber-600 mt-0.5 flex items-center gap-1">
                          4.85 ★
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Live Sustainability Gauge Card */}
                    <div className="bg-gradient-to-r from-navy-primary to-navy-secondary text-white p-6 rounded-2xl shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-mint-DEFAULT bg-white/10 px-3 py-1 rounded-full border border-white/20">
                          Weighted Campus Eco Rating
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                          83 / 100 — Tier A Green Institution
                        </h4>
                        <p className="text-xs text-white max-w-lg leading-relaxed font-medium">
                          Computed across 5 audited indicators: Grid Electricity efficiency, Rooftop Solar Yield, Water Recycling, Waste Diversion, and Green Campaigns.
                        </p>
                      </div>

                      <div className="shrink-0 text-center p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
                        <div className="text-3xl font-black text-mint-DEFAULT">34.8 t</div>
                        <div className="text-xs text-white font-bold mt-1">Monthly CO₂e Averted</div>
                        <div className="text-[11px] text-mint-DEFAULT font-semibold mt-0.5">Equivalent to 1,600 Trees</div>
                      </div>
                    </div>

                    {/* Eco Telemetry Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      <div className="bg-white p-3.5 rounded-xl border border-campus-border shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-campus-muted font-medium">Solar Generation</span>
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <div className="text-xl font-extrabold text-navy-deep mt-1">12,900 kWh</div>
                        <div className="text-[10px] text-emerald-600 mt-0.5">32% Campus Clean Power</div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-campus-border shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-campus-muted font-medium">Water Reclaimed</span>
                          <Droplets className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <div className="text-xl font-extrabold text-navy-deep mt-1">140,000 L</div>
                        <div className="text-[10px] text-blue-600 mt-0.5">STP &amp; Rainwater Tanks</div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-campus-border shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-campus-muted font-medium">Waste Segregated</span>
                          <Recycle className="w-3.5 h-3.5 text-emerald-500" />
                        </div>
                        <div className="text-xl font-extrabold text-navy-deep mt-1">88.5%</div>
                        <div className="text-[10px] text-emerald-600 mt-0.5">Organic &amp; Recyclables</div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-campus-border shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-campus-muted font-medium">Active Eco-Warriors</span>
                          <Users className="w-3.5 h-3.5 text-purple-500" />
                        </div>
                        <div className="text-xl font-extrabold text-navy-deep mt-1">1,840</div>
                        <div className="text-[10px] text-purple-600 mt-0.5">Green Campus Badges</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Scale Stat Bar */}
      <section className="bg-navy-deep text-white py-10 border-y border-navy-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-mint-DEFAULT tracking-tight">1,420+</div>
              <div className="text-xs text-white font-semibold mt-1">Maintenance Tickets Resolved</div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">&lt; 35 min</div>
              <div className="text-xs text-white font-semibold mt-1">Average Dispatch Turnaround</div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-mint-DEFAULT tracking-tight">45 kW</div>
              <div className="text-xs text-white font-semibold mt-1">Active Rooftop Solar Capacity</div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">6 Blocks</div>
              <div className="text-xs text-white font-semibold mt-1">Full IoT &amp; Department Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pillars Section */}
      <section id="features" className="py-20 lg:py-28 bg-white border-b border-campus-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-soft text-[#1b7a52] text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              Two Mission-Critical Pillars
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
              One Unified Campus Operating System
            </h2>
            <p className="mt-4 text-base text-campus-muted leading-relaxed">
              Designed specifically to fulfill college campus operational requirements: eliminating administrative paperwork while fostering genuine sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pillar A: Maintenance */}
            <div className="p-8 rounded-3xl bg-navy-primary text-white border border-navy-secondary hover:border-mint-DEFAULT hover:shadow-card transition-smooth group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-navy-deep text-white border border-navy-secondary flex items-center justify-center mb-6 shadow-card group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-bold text-mint-DEFAULT uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Pillar 1 &bull; Operational Integrity
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-3">
                  Campus Facility Complaint &amp; Dispatch Management
                </h3>
                <p className="mt-3 text-sm text-white/90 leading-relaxed font-normal">
                  Turn random student complaints into structured, accountable work orders with transparent SLA countdowns and digital proof of work.
                </p>

                <div className="mt-6 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-mint-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium">
                      <strong className="text-white">Location Tagging &amp; Photo Proofs:</strong> Tag room numbers, block names, and upload images.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-mint-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium">
                      <strong className="text-white">Department Auto-Routing:</strong> Electrical, Plumbing, IT, Cleanliness, and Safety departments.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-mint-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium">
                      <strong className="text-white">SLA Clock &amp; Escalations:</strong> Target deadlines prevent tickets from sitting unnoticed.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-mint-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium">
                      <strong className="text-white">Student Ratings:</strong> 5-star feedback and remarks upon ticket resolution.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-navy-secondary flex items-center justify-between">
                <span className="text-xs font-medium text-white/90">
                  Ready to test dispatch workflow?
                </span>
                <Link
                  to="/login"
                  className="text-xs font-bold text-mint-DEFAULT hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  Explore Complaints Portal <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar B: Sustainability */}
            <div className="p-8 rounded-3xl bg-navy-deep text-white border border-navy-secondary hover:border-mint-DEFAULT hover:shadow-card transition-smooth group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-navy-secondary text-white border border-slate-700 flex items-center justify-center mb-6 shadow-card group-hover:scale-105 transition-transform">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-bold text-mint-DEFAULT uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Pillar 2 &bull; Environmental Accounting
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-3">
                  Campus Resource Monitoring &amp; Carbon Accounting
                </h3>
                <p className="mt-3 text-sm text-white/90 leading-relaxed font-normal">
                  Transform raw utility bills and meters into auditable carbon emissions, resource consumption trends, and interactive eco-campaigns.
                </p>

                <div className="mt-6 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-mint-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium">
                      <strong className="text-white">Solar &amp; Electricity Accounting:</strong> Real-time comparison between clean solar and grid power.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-mint-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium">
                      <strong className="text-white">Water Reclamation Telemetry:</strong> Track freshwater intake vs. STP recycled greywater.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-mint-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium">
                      <strong className="text-white">Waste Diversion Analytics:</strong> Audited compost, recyclables, and bio-gas logs.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-mint-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium">
                      <strong className="text-white">Weighted Sustainability Index (0–100):</strong> Scientifically formulated college green score.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-navy-secondary flex items-center justify-between">
                <span className="text-xs font-medium text-white/90">
                  View live campus eco score
                </span>
                <Link
                  to="/sustainability"
                  className="text-xs font-bold text-mint-DEFAULT hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  Explore Sustainability <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Role Experience Showcase */}
      <section className="py-20 lg:py-28 bg-[#F5F8FC] border-b border-campus-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-primary bg-blue-100/70 px-3 py-1 rounded-full mb-3 inline-block">
              Role-Based Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
              Tailored Portals for Every Campus Stakeholder
            </h2>
            <p className="mt-3 text-sm text-campus-muted">
              Select a stakeholder role below to inspect how the interface adapts specifically to their daily workflow.
            </p>

            {/* Role Tab Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {Object.keys(rolePreviews).map((key) => {
                const item = rolePreviews[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveRoleTab(key)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-smooth border flex items-center gap-2 ${
                      activeRoleTab === key
                        ? 'bg-navy-primary text-white border-navy-primary shadow-card'
                        : 'bg-white text-navy-primary border-campus-border hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.title.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Showcase Card */}
          {(() => {
            const preview = rolePreviews[activeRoleTab];
            return (
              <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-campus-border shadow-xl p-6 sm:p-10 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${preview.badgeColor}`}>
                      {preview.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-navy-deep mt-2">{preview.title}</h3>
                    <p className="text-xs text-campus-muted mt-1">{preview.subtitle}</p>
                  </div>

                  <button
                    onClick={() => handleDemoLaunch(preview.demoRole)}
                    className="px-6 py-3 rounded-xl bg-mint-DEFAULT hover:bg-mint-hover text-navy-deep font-bold text-xs transition-smooth shadow-xs flex items-center gap-2 self-start md:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch as {preview.demoName}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
                  {/* Features List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-campus-muted">
                      Key Capabilities Included:
                    </h4>
                    {preview.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-mint-soft text-[#1b7a52] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <p className="text-xs text-campus-text leading-relaxed font-medium">{feat}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mock Data Card */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono text-campus-muted font-semibold">{preview.mockData.ticketId}</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${preview.mockData.statusColor}`}>
                        {preview.mockData.status}
                      </span>
                    </div>

                    <h5 className="font-bold text-navy-deep text-sm leading-snug">
                      {preview.mockData.title}
                    </h5>

                    <p className="text-xs text-campus-muted mt-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {preview.mockData.location}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <span className="text-campus-muted">Operational Feedback:</span>
                      <span className="font-semibold text-navy-primary">{preview.mockData.eta}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 4-Step End-to-End Workflow */}
      <section id="workflow" className="py-20 lg:py-28 bg-white border-b border-campus-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b7a52] bg-mint-soft px-3 py-1 rounded-full mb-3 inline-block">
              Continuous Loop
            </span>
            <h2 className="text-3xl font-extrabold text-navy-deep tracking-tight">
              From Report to Sustainable Resolution
            </h2>
            <p className="mt-3 text-sm text-campus-muted">
              How a single faucet drip or broken projector flows transparently through the smart system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-navy-primary text-white p-6 rounded-2xl border border-navy-secondary text-center hover:border-mint-DEFAULT hover:shadow-card transition-smooth">
              <div className="w-12 h-12 rounded-2xl bg-navy-secondary border-2 border-white/30 text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                1
              </div>
              <h4 className="font-extrabold text-white text-base mb-2">1. Snap &amp; Submit</h4>
              <p className="text-xs text-white/95 leading-relaxed font-normal">
                Student or professor detects an issue, snaps a photo, selects the department, and hits submit in 30 seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-navy-primary text-white p-6 rounded-2xl border border-navy-secondary text-center hover:border-mint-DEFAULT hover:shadow-card transition-smooth">
              <div className="w-12 h-12 rounded-2xl bg-navy-secondary border-2 border-white/30 text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                2
              </div>
              <h4 className="font-extrabold text-white text-base mb-2">2. Smart Dispatch</h4>
              <p className="text-xs text-white/95 leading-relaxed font-normal">
                Admins review priority, assign appropriate technician (Plumbing/Electrical), and activate the live SLA timer.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-navy-primary text-white p-6 rounded-2xl border border-navy-secondary text-center hover:border-mint-DEFAULT hover:shadow-card transition-smooth">
              <div className="w-12 h-12 rounded-2xl bg-navy-secondary border-2 border-white/30 text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                3
              </div>
              <h4 className="font-extrabold text-white text-base mb-2">3. Technician Repair</h4>
              <p className="text-xs text-white/95 leading-relaxed font-normal">
                Staff member arrives on-site, executes maintenance, uploads resolution evidence photo, and marks as Resolved.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-navy-primary text-white p-6 rounded-2xl border border-navy-secondary text-center hover:border-mint-DEFAULT hover:shadow-card transition-smooth">
              <div className="w-12 h-12 rounded-2xl bg-navy-secondary border-2 border-white/30 text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                4
              </div>
              <h4 className="font-extrabold text-white text-base mb-2">4. Eco Verification</h4>
              <p className="text-xs text-white/95 leading-relaxed font-normal">
                User rates the service 5-stars; conserved water or electricity is dynamically added to campus sustainability score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Eco Calculator Simulator */}
      <section id="sustainability" className="py-20 lg:py-24 bg-[#0B172A] text-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-mint-DEFAULT/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-mint-DEFAULT bg-navy-secondary px-3 py-1 rounded-full border border-mint-DEFAULT/30 mb-3 inline-block">
              Interactive Impact Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Simulate Your Campus Green Potential
            </h2>
            <p className="mt-3 text-sm text-white font-medium">
              Adjust the campus building count to see how rapid maintenance and clean telemetry scale environmental savings.
            </p>

            {/* Interactive Slider */}
            <div className="mt-8 p-6 rounded-2xl bg-navy-secondary border border-slate-700/80 max-w-lg mx-auto shadow-card">
              <div className="flex justify-between items-center text-xs font-bold mb-3">
                <span className="text-white font-semibold">Monitored Academic &amp; Hostel Blocks:</span>
                <span className="text-mint-DEFAULT font-mono text-base font-bold">{simBuildingCount} Buildings</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={simBuildingCount}
                onChange={(e) => setSimBuildingCount(Number(e.target.value))}
                className="w-full accent-mint-DEFAULT h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/90 font-medium mt-2">
                <span>Small Campus (2)</span>
                <span>Medium (8)</span>
                <span>Mega University (15)</span>
              </div>
            </div>
          </div>

          {/* Dynamic Savings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-navy-secondary border border-slate-700 text-center shadow-card hover:border-mint-DEFAULT transition-smooth">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {(simBuildingCount * 28400).toLocaleString()} L
              </div>
              <div className="text-xs text-white font-bold mt-1">Water Leaks Averted Yearly</div>
              <p className="text-[11px] text-white/90 font-medium mt-1">Through sub-hour plumbing dispatches</p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-secondary border border-slate-700 text-center shadow-card hover:border-mint-DEFAULT transition-smooth">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-mint-DEFAULT">
                {(simBuildingCount * 4150).toLocaleString()} kWh
              </div>
              <div className="text-xs text-white font-bold mt-1">Phantom Energy Prevented</div>
              <p className="text-[11px] text-white/90 font-medium mt-1">Via automated classroom audits</p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-secondary border border-slate-700 text-center shadow-card hover:border-mint-DEFAULT transition-smooth">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {(simBuildingCount * 5.8).toFixed(1)} Tons
              </div>
              <div className="text-xs text-white font-bold mt-1">Annual CO₂e Offset</div>
              <p className="text-[11px] text-white/90 font-medium mt-1">Verified with Mongoose audit models</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-white border-t border-campus-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-navy-primary text-white p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-mint-DEFAULT/15 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-secondary text-mint-DEFAULT text-xs font-semibold mb-4 border border-mint-DEFAULT/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Stack Web Technology Capstone Deliverable</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
              Ready to Upgrade Your Campus Experience?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-white max-w-xl mx-auto leading-relaxed font-normal">
              Experience the live portal now with pre-seeded demo accounts or test real database integration.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-mint-DEFAULT hover:bg-mint-hover text-navy-deep font-bold text-sm transition-smooth shadow-glow flex items-center justify-center gap-2"
              >
                <span>Access Demo Portals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/sustainability"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-navy-secondary hover:bg-slate-700 text-white font-semibold text-sm transition-smooth border border-slate-600 flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-mint-DEFAULT" />
                <span>View Live Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}