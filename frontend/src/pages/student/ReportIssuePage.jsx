import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { complaintService } from '../../services/complaintService';
import {
  Upload,
  AlertTriangle,
  CheckCircle2,
  Building,
  MapPin,
  Tag,
  FileText,
  X,
  ArrowRight,
  QrCode,
  Sparkles,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Electrical',
  'Plumbing and Water',
  'Cleanliness and Waste',
  'Furniture and Infrastructure',
  'IT and Wi-Fi',
  'Laboratory Equipment',
  'Classroom Equipment',
  'Safety',
  'Other',
];

const BUILDINGS = [
  'Main Academic Block',
  'Science & Engineering Wing',
  'Library Building',
  'Hostel Block A',
  'Hostel Block B',
  'Student Cafeteria',
  'Sports Complex',
];

const PRESET_SCAN_ITEMS = [
  {
    id: 'AST-SCI-204',
    name: 'Lab 204 - Projector 2',
    building: 'Science & Engineering Wing',
    locationDetails: 'Room 204, 2nd Floor, Electronics Wing',
    category: 'Classroom Equipment',
    priority: 'High',
    defaultTitle: 'Ceiling projector lamp failure or display distortion',
  },
  {
    id: 'AST-PLB-012',
    name: 'Block C - Water Cooler',
    building: 'Main Academic Block',
    locationDetails: 'Block C, Ground Floor Near Staircase 2',
    category: 'Plumbing and Water',
    priority: 'High',
    defaultTitle: 'Water cooler dispensing warm water or filter leakage',
  },
  {
    id: 'AST-ELC-304',
    name: 'Library 3rd Floor - AC Unit 4',
    building: 'Library Building',
    locationDetails: '3rd Floor Reference Section, West Wall',
    category: 'Electrical',
    priority: 'Medium',
    defaultTitle: 'Central AC blower unit emitting buzzing noise',
  },
  {
    id: 'AST-LAB-101',
    name: 'Chemistry Lab - Fume Hood 1',
    building: 'Science & Engineering Wing',
    locationDetails: 'Ground Floor Chem Lab 1, Station A',
    category: 'Laboratory Equipment',
    priority: 'Urgent',
    defaultTitle: 'Exhaust suction motor failing in chemical fume hood',
  },
];

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // QR prefill parameters
  const qrAssetId = searchParams.get('assetId') || '';
  const qrBuilding = searchParams.get('building') || '';
  const qrLocation = searchParams.get('location') || searchParams.get('locationDetails') || '';
  const qrCategory = searchParams.get('category') || '';
  const qrTitle = searchParams.get('title') || '';
  const qrPriority = searchParams.get('priority') || '';

  const isQrPrefilled = Boolean(qrAssetId || qrLocation || qrBuilding);

  const [formData, setFormData] = useState({
    title: qrTitle || '',
    category: qrCategory || 'Plumbing and Water',
    description: qrAssetId ? `Issue reported regarding asset tag ${qrAssetId} at ${qrLocation}.` : '',
    building: qrBuilding || 'Main Academic Block',
    locationDetails: qrLocation || '',
    priority: qrPriority || 'Medium',
  });

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState(null);

  // Sync if query parameters change (e.g. user triggers simulated scan)
  useEffect(() => {
    if (qrBuilding || qrLocation || qrCategory || qrTitle || qrAssetId) {
      setFormData((prev) => ({
        ...prev,
        building: qrBuilding || prev.building,
        locationDetails: qrLocation || prev.locationDetails,
        category: qrCategory || prev.category,
        title: qrTitle || prev.title,
        priority: qrPriority || prev.priority,
        description:
          prev.description ||
          (qrAssetId ? `Issue reported regarding asset tag ${qrAssetId} at ${qrLocation}.` : ''),
      }));
    }
  }, [qrBuilding, qrLocation, qrCategory, qrTitle, qrPriority, qrAssetId]);

  const handleApplyPreset = (preset) => {
    setSearchParams({
      assetId: preset.id,
      building: preset.building,
      location: preset.locationDetails,
      category: preset.category,
      priority: preset.priority,
      title: preset.defaultTitle,
    });
    setQrModalOpen(false);
    toast.success(`⚡ Scanned QR code for ${preset.name}!`);
  };

  const handleClearQrPrefill = () => {
    setSearchParams({});
    setFormData({
      title: '',
      category: 'Plumbing and Water',
      description: '',
      building: 'Main Academic Block',
      locationDetails: '',
      priority: 'Medium',
    });
    toast.success('Form cleared to blank report.');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size cannot exceed 5MB.');
      return;
    }

    setSelectedPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setSelectedPhoto(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter a clear title for the complaint.');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Please provide details describing the issue.');
      return;
    }
    if (!formData.locationDetails.trim()) {
      toast.error('Please specify the exact room, lab or floor location.');
      return;
    }

    setSubmitting(true);

    try {
      // Use FormData to support image uploads
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('building', formData.building);
      data.append('locationDetails', formData.locationDetails);
      data.append('priority', formData.priority);

      if (selectedPhoto) {
        data.append('photos', selectedPhoto);
      }

      const res = await complaintService.create(data);
      setCreatedComplaint(res.data);
      toast.success(`Complaint registered: ${res.data.complaintId}`);
    } catch (err) {
      toast.error(err.message || 'Failed to submit complaint. Please check server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-navy-primary tracking-tight">
            Report a Campus Issue
          </h2>
          <p className="text-xs text-campus-muted mt-0.5">
            Submit facility breakdowns, water leakages, electrical hazards, or cleanliness requests.
          </p>
        </div>

        {/* Quick QR Demo Trigger */}
        <button
          type="button"
          onClick={() => setQrModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mint-soft hover:bg-mint-soft/80 text-navy-primary text-xs font-bold border border-mint-DEFAULT/40 transition-smooth shadow-xs self-start sm:self-auto"
        >
          <QrCode className="w-4 h-4 text-[#1b7a52]" />
          <span>Simulate QR Code Scan</span>
        </button>
      </div>

      {/* QR Prefill Detection Banner */}
      {isQrPrefilled && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 shadow-xs flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-800">
              <QrCode className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-900">
                  ⚡ Pre-filled from Asset QR Tag
                </span>
                {qrAssetId && (
                  <span className="font-mono text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                    {qrAssetId}
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                Building: <strong className="text-emerald-950">{formData.building}</strong> &bull; Location: <strong className="text-emerald-950">{formData.locationDetails}</strong> &bull; Category: <strong className="text-emerald-950">{formData.category}</strong>
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">
                Room location and category were automatically populated from the scanned equipment tag.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClearQrPrefill}
            className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold underline shrink-0"
          >
            Clear Tag
          </button>
        </div>
      )}

      {/* QR Presets Modal for Easy Evaluation */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-campus-border shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-campus-border">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-mint-DEFAULT" />
                <h3 className="text-sm font-bold text-navy-primary">
                  Simulate QR Tag Scan (Quick Demo)
                </h3>
              </div>
              <button
                onClick={() => setQrModalOpen(false)}
                className="p-1 rounded-lg text-campus-muted hover:text-navy-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-campus-muted leading-relaxed">
              Select any campus asset sticker below to simulate scanning its physical QR code with a smartphone camera:
            </p>

            <div className="space-y-2.5">
              {PRESET_SCAN_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleApplyPreset(item)}
                  className="w-full text-left p-3 rounded-xl border border-campus-border hover:border-mint-DEFAULT hover:bg-mint-soft/20 transition-smooth group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-navy-primary bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.id}
                    </span>
                    <span className="text-[10px] font-semibold text-white bg-navy-primary px-2 py-0.5 rounded shadow-2xs">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-navy-primary group-hover:text-emerald-800">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-campus-muted mt-0.5">
                    {item.building} &bull; {item.locationDetails}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setQrModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-navy-primary hover:bg-slate-200 transition-smooth"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {createdComplaint ? (
        /* Success Screen */
        <div className="bg-white rounded-2xl border border-campus-border p-8 shadow-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-mint-soft text-[#1b7a52] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#22A06B]" />
          </div>
          <h3 className="text-xl font-bold text-navy-primary">Complaint Successfully Registered!</h3>
          <p className="text-xs text-campus-muted mt-1 max-w-md mx-auto">
            Your grievance has been assigned a unique reference ticket. Campus administration will review and dispatch the maintenance crew.
          </p>

          <div className="my-6 p-4 rounded-xl bg-slate-50 border border-campus-border max-w-sm mx-auto text-left">
            <div className="text-[10px] text-campus-muted uppercase font-bold tracking-wider">Ticket Reference</div>
            <div className="text-lg font-mono font-extrabold text-navy-primary">{createdComplaint.complaintId}</div>
            <div className="text-xs text-campus-text font-medium mt-1 truncate">{createdComplaint.title}</div>
            <div className="text-[11px] text-campus-muted mt-0.5">{createdComplaint.building} - {createdComplaint.locationDetails}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setCreatedComplaint(null);
                setFormData({
                  title: '',
                  category: 'Plumbing and Water',
                  description: '',
                  building: 'Main Academic Block',
                  locationDetails: '',
                  priority: 'Medium',
                });
                removePhoto();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-campus-border text-xs font-semibold text-navy-primary hover:bg-slate-50 transition-smooth"
            >
              Report Another Issue
            </button>
            <button
              onClick={() => navigate(`/student/complaints/${createdComplaint._id}`)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-navy-primary text-white text-xs font-semibold hover:bg-navy-secondary transition-smooth flex items-center justify-center gap-2"
            >
              <span>Track Complaint Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-campus-border p-6 sm:p-8 shadow-card space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-navy-primary mb-1">
              Complaint Subject / Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={150}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g., Water leaking from ceiling valve in 2nd Floor Restroom"
              className="w-full text-xs p-3 rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary transition-smooth"
            />
          </div>

          {/* Category & Building Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-primary mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-primary mb-1">
                Campus Building / Zone <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
              >
                {BUILDINGS.map((bld) => (
                  <option key={bld} value={bld}>
                    {bld}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Exact Location & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-primary mb-1">
                Specific Location Details <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.locationDetails}
                onChange={(e) => setFormData({ ...formData, locationDetails: e.target.value })}
                placeholder="E.g., Room 304, Computer Lab 2, East Corridor"
                className="w-full text-xs p-3 rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-primary mb-1">
                Reported Urgency / Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
              >
                <option value="Low">Low - Minor nuisance, non-blocking</option>
                <option value="Medium">Medium - Regular maintenance needed</option>
                <option value="High">High - Impairing classroom or lab activities</option>
              </select>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-bold text-navy-primary mb-1">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what is broken, approximate leakage rate, unusual sounds, or safety concerns..."
              className="w-full text-xs p-3 rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary"
            />
          </div>

          {/* Photo Upload with Live Preview */}
          <div>
            <label className="block text-xs font-bold text-navy-primary mb-1">
              Upload Supporting Photo / Evidence (Optional)
            </label>

            {previewUrl ? (
              <div className="relative inline-block mt-2">
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="w-48 h-36 object-cover rounded-xl border border-campus-border shadow-xs"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 p-1 bg-rose-600 text-white rounded-full shadow-md hover:bg-rose-700"
                  title="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-campus-border rounded-xl hover:border-navy-primary/50 transition-smooth bg-slate-50/50">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-8 w-8 text-campus-muted" />
                  <div className="flex text-xs text-campus-muted justify-center">
                    <label
                      htmlFor="photo-upload"
                      className="relative cursor-pointer rounded-md font-bold text-navy-primary hover:text-navy-secondary focus-within:outline-none"
                    >
                      <span>Upload an image</span>
                      <input
                        id="photo-upload"
                        name="photo-upload"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handlePhotoChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-[10px] text-campus-muted">PNG, JPG, WebP up to 5MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-navy-primary hover:bg-navy-secondary text-white font-semibold text-xs transition-smooth shadow-md flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Registering Complaint...</span>
              ) : (
                <>
                  <span>Submit Complaint Ticket</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
