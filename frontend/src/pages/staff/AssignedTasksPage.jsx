import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { complaintService } from '../../services/complaintService';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle,
  UserCheck,
  Building2,
} from 'lucide-react';

export default function AssignedTasksPage() {
  const { user, refreshProfile } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await complaintService.getAll({
        search: searchTerm,
        status: statusFilter,
        priority: priorityFilter,
      });
      setTasks(res.data?.complaints || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load assigned tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch whenever the logged-in user identity changes (e.g., demo switcher)
  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter, user?.id]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTasks();
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Technician Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-navy-primary tracking-tight">
            Assigned Maintenance Work Orders
          </h2>
          <p className="text-xs text-campus-muted mt-0.5">
            Execute campus repairs, post progress logs, and upload verification proof.
          </p>
        </div>
        {user && (
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-primary/5 border border-navy-primary/15 text-xs text-navy-primary">
            <UserCheck className="w-3.5 h-3.5 text-mint-DEFAULT" />
            <span>
              Technician: <span className="font-bold">{user.name}</span>
            </span>
            {user.department ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                <Building2 className="w-3 h-3 text-emerald-600" />
                {user.department?.name || user.department}
              </span>
            ) : (
              <span className="text-amber-700 text-[10px] italic">
                (No department assigned)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={fetchTasks}
            className="ml-4 font-semibold underline hover:text-rose-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-campus-border p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-campus-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks by ID, room, or issue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 text-navy-primary font-medium focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
          >
            <option value="All">All Statuses</option>
            <option value="Assigned">Assigned (New)</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 text-navy-primary font-medium focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks Table / Cards */}
      {loading ? (
        <LoadingSpinner text="Loading assigned work orders..." />
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks assigned"
          description="There are currently no maintenance work orders matching your filters."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-campus-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-campus-border text-campus-muted uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Order ID</th>
                  <th className="px-6 py-3.5 font-semibold">Title &amp; Category</th>
                  <th className="px-6 py-3.5 font-semibold">Location</th>
                  <th className="px-6 py-3.5 font-semibold">Target SLA</th>
                  <th className="px-6 py-3.5 font-semibold">Priority</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-campus-border">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-slate-50/70 transition-smooth">
                    <td className="px-6 py-4 font-mono font-bold text-navy-primary">
                      {task.complaintId}
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-semibold text-navy-primary truncate">{task.title}</div>
                      <span className="text-[10px] text-campus-muted font-medium inline-block mt-0.5">
                        {task.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-campus-text">
                      <div className="font-medium">{task.building}</div>
                      <div className="text-[10px] text-campus-muted">{task.locationDetails}</div>
                    </td>
                    <td className="px-6 py-4 text-campus-text">
                      {task.dueDate ? (
                        <span
                          className={`font-medium ${
                            new Date(task.dueDate) < new Date() && task.status !== 'Resolved'
                              ? 'text-rose-600 font-bold'
                              : 'text-campus-muted'
                          }`}
                        >
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-campus-muted">24-48h</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/staff/tasks/${task._id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-primary text-white hover:bg-navy-secondary transition-smooth font-semibold text-[11px] shadow-xs"
                      >
                        <span>Update Status</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
