import React, { useState, useEffect } from 'react';
import { departmentService } from '../../services/departmentService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import {
  Users,
  Search,
  Filter,
  Shield,
  Building2,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  PlusCircle,
  Edit2,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Modal states for creating & updating user accounts
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff',
    department: '',
    phone: '',
    campus: 'Main Academic Campus',
  });

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'staff',
      department: departments[0]?._id || '',
      phone: '',
      campus: 'Main Academic Campus',
    });
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'student',
      department: user.department?._id || user.department || '',
      phone: user.phone || '',
      campus: user.campus || 'Main Academic Campus',
    });
    setModalOpen(true);
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please provide name and email.');
      return;
    }

    if (!editingUser && (!formData.password || formData.password.length < 6)) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingUser) {
        const isStaffRole = formData.role === 'staff' || formData.role === 'maintenance_staff';
        const payload = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          department: isStaffRole ? formData.department || null : null,
          phone: formData.phone,
          campus: formData.campus,
        };
        if (formData.password && formData.password.trim().length >= 6) {
          payload.password = formData.password.trim();
        }
        await departmentService.replaceUser(editingUser._id || editingUser.id, payload);
        toast.success(`Account for "${formData.name}" updated successfully.`);
      } else {
        const isStaffRole = formData.role === 'staff' || formData.role === 'maintenance_staff';
        await departmentService.createUser({
          ...formData,
          department: isStaffRole ? formData.department || null : null,
        });
        toast.success(`User account created successfully!`);
      }
      setModalOpen(false);
      await fetchUsersAndDepts();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchUsersAndDepts = async () => {
    setLoading(true);
    try {
      const [uRes, dRes] = await Promise.all([
        departmentService.getUsers(),
        departmentService.getAll(),
      ]);
      setUsers(uRes.users || []);
      setDepartments(dRes.departments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndDepts();
  }, []);

  const handleToggleActive = async (user) => {
    try {
      await departmentService.updateUser(user._id || user.id, {
        isActive: !user.isActive,
      });
      toast.success(`User "${user.name}" status updated.`);
      await fetchUsersAndDepts();
    } catch (err) {
      toast.error(err.message || 'Failed to update user status.');
    }
  };

  const handleDepartmentChange = async (user, deptId) => {
    try {
      await departmentService.updateUser(user._id || user.id, {
        department: deptId || null,
      });
      toast.success(`Assigned ${user.name} to department.`);
      await fetchUsersAndDepts();
    } catch (err) {
      toast.error(err.message || 'Could not update user department.');
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesSearch =
      searchTerm === '' ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-navy-primary tracking-tight">
          User Management &amp; Access Roles
        </h2>
        <p className="text-xs text-campus-muted mt-0.5">
          Audit campus accounts, manage technician department assignments, and toggle account access.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-campus-border p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 text-campus-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 text-navy-primary font-medium focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="student">Students</option>
            <option value="staff">Maintenance Staff</option>
            <option value="admin">Administrators</option>
            <option value="sustainability_officer">Sustainability Officers</option>
          </select>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-primary hover:bg-navy-secondary text-white text-xs font-semibold rounded-xl transition-smooth shadow-xs whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5 text-mint-DEFAULT" />
            <span>+ Create User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <LoadingSpinner text="Loading campus users..." />
      ) : (
        <div className="bg-white rounded-2xl border border-campus-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-campus-border text-campus-muted uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">User Details</th>
                  <th className="px-5 py-3.5 font-semibold">Role</th>
                  <th className="px-5 py-3.5 font-semibold">Assigned Department</th>
                  <th className="px-5 py-3.5 font-semibold">Campus Zone</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-campus-border">
                {filteredUsers.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-slate-50/70 transition-smooth">
                    <td className="px-5 py-4">
                      <div className="font-bold text-navy-primary">{user.name}</div>
                      <div className="text-[11px] text-campus-muted font-mono">{user.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          user.role === 'admin'
                            ? 'bg-rose-50 text-rose-700'
                            : user.role === 'sustainability_officer'
                            ? 'bg-mint-soft text-[#1b7a52]'
                            : user.role === 'staff'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {user.role === 'staff' ? (
                        <select
                          value={user.department?._id || user.department || ''}
                          onChange={(e) => handleDepartmentChange(user, e.target.value)}
                          className="text-xs p-1.5 rounded-lg border border-campus-border bg-slate-50 focus:bg-white"
                        >
                          <option value="">-- No Department --</option>
                          {departments.map((d) => (
                            <option key={d._id} value={d._id}>
                              {d.name} ({d.code})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-campus-muted italic text-[11px]">N/A</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-campus-text">
                      {user.campus || 'Main Campus'}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-full ${
                          user.isActive
                            ? 'bg-mint-soft text-[#1b7a52]'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          title="Edit user details"
                          className="p-1.5 text-campus-muted hover:text-navy-primary hover:bg-slate-100 rounded-lg transition-smooth"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(user)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth ${
                            user.isActive
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                              : 'bg-mint-soft text-[#1b7a52] hover:bg-mint-soft/80'
                          }`}
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? `Edit Account: ${editingUser.name}` : 'Create New Campus Account'}
      >
        <form onSubmit={handleSubmitUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-primary mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-primary mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. rahul.sharma@campus.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-primary mb-1">
              {editingUser ? 'Password (Leave blank to keep current)' : 'Account Password'}
            </label>
            <input
              type="password"
              placeholder={editingUser ? 'Leave blank to keep existing password' : 'Min. 6 characters'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-navy-primary mb-1">Access Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border bg-white focus:ring-2 focus:ring-navy-primary/20"
              >
                <option value="student">Student</option>
                <option value="staff">Maintenance Staff</option>
                <option value="sustainability_officer">Sustainability Officer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            {formData.role === 'staff' && (
              <div>
                <label className="block text-xs font-bold text-navy-primary mb-1">Assigned Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border bg-white focus:ring-2 focus:ring-navy-primary/20"
                >
                  <option value="">-- No Department --</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-navy-primary mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+91 98XXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border focus:ring-2 focus:ring-navy-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-primary mb-1">Campus Zone</label>
              <input
                type="text"
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border focus:ring-2 focus:ring-navy-primary/20"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-campus-border">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-campus-border rounded-xl text-xs font-semibold text-campus-muted hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-navy-primary hover:bg-navy-secondary text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              {submitting ? 'Saving...' : editingUser ? 'Update Account' : 'Create Account'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
