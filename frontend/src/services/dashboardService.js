import api from './api';
import { DEMO_COMPLAINTS, DEMO_DEPARTMENTS, DEMO_USERS } from './mockData';

export const dashboardService = {
  // Fetch real aggregated administrative metrics or return rich demo fallback
  getAdminDashboard: async () => {
    try {
      const response = await api.get('/dashboard/admin');
      return response.data;
    } catch (err) {
      console.warn('[DashboardService] Using admin dashboard demo fallback:', err.message);
      
      const complaints = DEMO_COMPLAINTS || [];
      const total = complaints.length;
      const newUnderReview = complaints.filter(c => c.status === 'Submitted').length;
      const assigned = complaints.filter(c => c.status === 'Assigned').length;
      const inProgress = complaints.filter(c => c.status === 'In Progress').length;
      const resolved = complaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;
      
      // Calculate category distribution
      const catCount = {};
      complaints.forEach(c => {
        catCount[c.category] = (catCount[c.category] || 0) + 1;
      });
      const complaintsByCategory = Object.entries(catCount).map(([name, count]) => ({ name, count }));

      // Calculate status breakdown
      const complaintsByStatus = [
        { name: 'Submitted', value: newUnderReview },
        { name: 'Assigned', value: assigned },
        { name: 'In Progress', value: inProgress },
        { name: 'Resolved', value: resolved },
      ];

      // Building wise counts
      const bldCount = {};
      complaints.forEach(c => {
        bldCount[c.building] = (bldCount[c.building] || 0) + 1;
      });
      const buildingWise = Object.entries(bldCount).map(([building, count]) => ({ building, count }));

      return {
        success: true,
        data: {
          stats: {
            total,
            newUnderReview,
            assigned,
            inProgress,
            resolved,
            overdue: 2,
            avgResolutionHours: 28.5,
          },
          complaintsByCategory,
          complaintsByStatus,
          buildingWise,
          departmentStats: [
            { name: 'Electrical Maintenance', total: 18, resolved: 14 },
            { name: 'Plumbing & Water Works', total: 15, resolved: 11 },
            { name: 'Campus Sanitation', total: 12, resolved: 10 },
          ],
          staffWorkload: [
            { name: 'Vikram Singh', department: 'Electrical', assigned: 4, completed: 14 },
            { name: 'Ramesh Patel', department: 'Plumbing', assigned: 3, completed: 11 },
          ],
          criticalIssues: complaints.filter(c => c.priority === 'Urgent' || c.priority === 'High'),
          recentComplaints: complaints.slice(0, 5),
        },
        source: 'mock',
      };
    }
  },

  // Fetch real maintenance staff work orders
  getStaffDashboard: async () => {
    try {
      const response = await api.get('/dashboard/staff');
      return response.data;
    } catch (err) {
      console.warn('[DashboardService] Using staff dashboard demo fallback:', err.message);
      return {
        success: true,
        data: {
          stats: {
            newAssigned: 3,
            inProgress: 2,
            resolved: 14,
            overdue: 0,
          },
        },
        source: 'mock',
      };
    }
  },

  // Fetch student ticket status and sustainability index
  getStudentDashboard: async () => {
    try {
      const response = await api.get('/dashboard/student');
      return response.data;
    } catch (err) {
      console.warn('[DashboardService] Using student dashboard demo fallback:', err.message);
      return {
        success: true,
        data: {
          stats: {
            totalSubmitted: 4,
            inProgress: 1,
            resolved: 3,
          },
        },
        source: 'mock',
      };
    }
  },
};
