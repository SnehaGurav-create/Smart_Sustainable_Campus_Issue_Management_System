import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationDropdown from '../common/NotificationDropdown';
import { useAuth } from '../../context/AuthContext';
import { Menu, Shield, User, Building, LogOut, Mail, Phone, MapPin, ChevronDown, Briefcase, Settings } from 'lucide-react';

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logout, refreshProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/');
  };

  // Role label & color
  const roleInfo = {
    student:              { label: 'Student',               color: 'bg-blue-100 text-blue-700' },
    staff:                { label: 'Maintenance Staff',     color: 'bg-purple-100 text-purple-700' },
    maintenance_staff:    { label: 'Maintenance Staff',     color: 'bg-purple-100 text-purple-700' },
    admin:                { label: 'Administrator',         color: 'bg-rose-100 text-rose-700' },
    sustainability_officer: { label: 'Sustainability Officer', color: 'bg-emerald-100 text-emerald-700' },
  };
  const roleStyle = roleInfo[user?.role] || { label: user?.role, color: 'bg-slate-100 text-slate-600' };

  // Avatar initials
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  // Helper to format title from URL path
  const getPageTitle = () => {
    const p = location.pathname;
    if (p.includes('/student/report')) return 'Report a Campus Issue';
    if (p.includes('/student/complaints')) return 'My Complaints Tracker';
    if (p.includes('/staff/tasks')) return 'Assigned Maintenance Tasks';
    if (p.includes('/admin/complaints')) return 'Complaint Management & Assignment';
    if (p.includes('/admin/departments')) return 'Department & Service Catalog';
    if (p.includes('/admin/users')) return 'User Role & Permissions';
    if (p.includes('/admin/qr-codes')) return 'Campus Asset QR Code Generator';
    if (p.includes('/sustainability/records')) return 'Campus Resource Log Books';
    if (p.includes('/sustainability/campaigns')) return 'Green Campus Initiatives & Campaigns';
    if (p.includes('/sustainability')) return 'Campus Sustainability Intelligence';
    if (p.includes('/student')) return 'Student Portal Dashboard';
    if (p.includes('/staff')) return 'Maintenance Operations Hub';
    if (p.includes('/admin')) return 'Campus Administrative Operations';
    return 'Campus Management Dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col bg-campus-bg">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-campus-border px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden p-2 rounded-lg text-campus-muted hover:text-navy-primary hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-navy-primary tracking-tight">
                  {getPageTitle()}
                </h1>
                <p className="text-[11px] text-campus-muted hidden sm:block">
                  Smart &amp; Sustainable Campus Platform &bull; {user?.campus || 'Main Campus'}
                </p>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <NotificationDropdown />

              <div className="h-6 w-px bg-campus-border hidden sm:block" />

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    const next = !profileOpen;
                    setProfileOpen(next);
                    if (next && refreshProfile) {
                      refreshProfile();
                    }
                  }}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-campus-border text-xs transition-smooth focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                >
                  {/* Avatar circle */}
                  <div className="w-7 h-7 rounded-full bg-navy-primary flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                    {initials}
                  </div>
                  <span className="font-semibold text-navy-primary">{user?.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${roleStyle.color}`}>
                    {roleStyle.label}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-campus-muted transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Panel */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-campus-border z-50 overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-br from-navy-primary to-navy-secondary px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-mint-DEFAULT/20 border-2 border-mint-DEFAULT/40 flex items-center justify-center text-white text-lg font-bold shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm truncate">{user?.name}</p>
                          <p className="text-slate-300 text-xs truncate">{user?.email}</p>
                          <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-semibold ${roleStyle.color}`}>
                            {roleStyle.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-[10px] uppercase font-bold text-campus-muted tracking-wider mb-2">
                        Profile Information
                      </p>

                      {/* Department Assignment Banner for Maintenance Staff */}
                      {(user?.role === 'staff' || user?.role === 'maintenance_staff') && (
                        <div
                          className={`p-3 rounded-xl border text-xs ${
                            user?.department
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                              : 'bg-amber-50 border-amber-200 text-amber-950'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold mb-1">
                            <Briefcase
                              className={`w-4 h-4 ${
                                user?.department ? 'text-emerald-600' : 'text-amber-600'
                              }`}
                            />
                            <span className="text-[11px] uppercase tracking-wide">
                              {user?.department ? 'Department Assignment' : 'No Department Assigned'}
                            </span>
                          </div>
                          {user?.department ? (
                            <p className="text-xs text-emerald-900 leading-snug">
                              You are assigned to the{' '}
                              <strong className="font-bold underline decoration-emerald-500">
                                {user.department?.name || user.department}
                              </strong>{' '}
                              department.
                              {user.department?.code && (
                                <span className="block mt-1 text-[10px] font-mono text-emerald-800 font-semibold">
                                  Dept Code: {user.department.code}
                                </span>
                              )}
                            </p>
                          ) : (
                            <p className="text-xs text-amber-800 leading-snug">
                              You are not yet assigned to any department. Please contact an administrator.
                            </p>
                          )}
                        </div>
                      )}

                      {/* Email */}
                      <div className="flex items-center gap-2.5 text-xs text-campus-text">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <Mail className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-[10px] text-campus-muted font-medium">Email Address</p>
                          <p className="font-semibold text-navy-primary truncate max-w-[200px]">{user?.email || '—'}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      {user?.phone && (
                        <div className="flex items-center gap-2.5 text-xs text-campus-text">
                          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                            <Phone className="w-3.5 h-3.5 text-purple-500" />
                          </div>
                          <div>
                            <p className="text-[10px] text-campus-muted font-medium">Phone</p>
                            <p className="font-semibold text-navy-primary">{user.phone}</p>
                          </div>
                        </div>
                      )}

                      {/* Campus */}
                      <div className="flex items-center gap-2.5 text-xs text-campus-text">
                        <div className="w-7 h-7 rounded-lg bg-mint-soft flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-[#22A06B]" />
                        </div>
                        <div>
                          <p className="text-[10px] text-campus-muted font-medium">Campus</p>
                          <p className="font-semibold text-navy-primary">{user?.campus || 'Main Campus'}</p>
                        </div>
                      </div>

                      {/* Department (for all roles) */}
                      {user?.department && (
                        <div className="flex items-center gap-2.5 text-xs text-campus-text">
                          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                            <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-[10px] text-campus-muted font-medium">Department</p>
                            <p className="font-semibold text-navy-primary">
                              {user.department?.name || user.department}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Role */}
                      <div className="flex items-center gap-2.5 text-xs text-campus-text">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <Shield className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[10px] text-campus-muted font-medium">System Role</p>
                          <p className={`font-semibold text-[11px] inline-block px-2 py-0.5 rounded-full ${roleStyle.color}`}>
                            {roleStyle.label}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-campus-border" />

                    {/* Footer Actions */}
                    <div className="px-4 py-3 flex flex-col gap-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-smooth"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
