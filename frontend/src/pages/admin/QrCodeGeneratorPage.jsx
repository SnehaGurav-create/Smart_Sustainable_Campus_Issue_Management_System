import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  Printer,
  Download,
  ExternalLink,
  Sparkles,
  Building,
  MapPin,
  Tag,
  Copy,
  Check,
  PlusCircle,
  Eye,
  ShieldCheck,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';

const BUILDINGS = [
  'Main Academic Block',
  'Science & Engineering Wing',
  'Library Building',
  'Hostel Block A',
  'Hostel Block B',
  'Student Cafeteria',
  'Sports Complex',
];

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

const PRESET_ASSETS = [
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
  {
    id: 'AST-WST-005',
    name: 'Cafeteria - Waste Station',
    building: 'Student Cafeteria',
    locationDetails: 'Cafeteria Main Hall, Exit Door B',
    category: 'Cleanliness and Waste',
    priority: 'Medium',
    defaultTitle: 'Segregation recycling bin lid hinge detached',
  },
  {
    id: 'AST-HST-102',
    name: 'Hostel Block A - Water Heater',
    building: 'Hostel Block A',
    locationDetails: '1st Floor Common Washroom, North Wing',
    category: 'Plumbing and Water',
    priority: 'High',
    defaultTitle: 'Solar thermal booster element tripped circuit',
  },
];

export default function QrCodeGeneratorPage() {
  const [selectedAsset, setSelectedAsset] = useState(PRESET_ASSETS[0]);
  const [customMode, setCustomMode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Custom Asset Form
  const [customForm, setCustomForm] = useState({
    id: `AST-CUS-${Math.floor(100 + Math.random() * 900)}`,
    name: '',
    building: BUILDINGS[0],
    locationDetails: '',
    category: CATEGORIES[0],
    priority: 'Medium',
    defaultTitle: '',
  });

  const activeAsset = customMode ? customForm : selectedAsset;

  // Build the Quick-Report URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5174';
  const queryParams = new URLSearchParams({
    building: activeAsset.building || '',
    location: activeAsset.locationDetails || activeAsset.name || '',
    category: activeAsset.category || '',
    priority: activeAsset.priority || 'Medium',
    assetId: activeAsset.id || '',
    title: activeAsset.defaultTitle || `Issue with ${activeAsset.name || 'Equipment'}`,
  }).toString();

  const reportUrl = `${origin}/student/report?${queryParams}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reportUrl);
    setCopied(true);
    toast.success('Quick-Report URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customForm.name.trim() || !customForm.locationDetails.trim()) {
      toast.error('Please enter an Asset Name and Location.');
      return;
    }
    toast.success('Custom Asset QR generated!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header (Hidden when printing tags) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mint-soft text-[#1b7a52] text-xs font-semibold mb-2">
            <QrCode className="w-3.5 h-3.5" />
            <span>Campus Asset Tagging System</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-primary tracking-tight">
            QR Code Quick-Reporting Generator
          </h2>
          <p className="text-xs text-campus-muted mt-0.5">
            Generate and print physical QR code tags for campus assets, labs, and rooms. Scanning automatically pre-fills the issue report form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-primary hover:bg-navy-secondary text-white text-xs font-semibold transition-smooth shadow-sm"
          >
            <Printer className="w-4 h-4 text-mint-DEFAULT" />
            <span>Print All Asset Tags</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid (Hidden when printing tags) */}
      <div className="print:hidden grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Asset Selection / Custom Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Preset vs Custom Tabs */}
          <div className="bg-white rounded-2xl border border-campus-border p-4 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-navy-primary uppercase tracking-wider">
                Select Asset Source
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setCustomMode(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-smooth ${
                    !customMode
                      ? 'bg-white text-navy-primary shadow-xs'
                      : 'text-campus-muted hover:text-navy-primary'
                  }`}
                >
                  Campus Presets ({PRESET_ASSETS.length})
                </button>
                <button
                  onClick={() => setCustomMode(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-smooth ${
                    customMode
                      ? 'bg-white text-navy-primary shadow-xs'
                      : 'text-campus-muted hover:text-navy-primary'
                  }`}
                >
                  Custom Generator
                </button>
              </div>
            </div>

            {!customMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_ASSETS.map((asset) => {
                  const isSelected = selectedAsset.id === asset.id;
                  return (
                    <button
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`text-left p-3.5 rounded-xl border transition-smooth ${
                        isSelected
                          ? 'bg-mint-soft/30 border-mint-DEFAULT ring-2 ring-mint-DEFAULT/20'
                          : 'bg-slate-50/50 border-campus-border hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] font-bold text-navy-primary bg-white px-1.5 py-0.5 rounded border border-campus-border">
                          {asset.id}
                        </span>
                        <span className="text-[10px] font-semibold text-white bg-navy-primary px-2 py-0.5 rounded shadow-2xs">
                          {asset.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-navy-primary">{asset.name}</h4>
                      <p className="text-[11px] text-campus-muted truncate mt-0.5">{asset.building}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <form onSubmit={handleCreateCustom} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy-primary mb-1">
                      Asset Name / Label *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lab 301 - Smart Board"
                      value={customForm.name}
                      onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-primary mb-1">
                      Asset Identifier Code
                    </label>
                    <input
                      type="text"
                      value={customForm.id}
                      onChange={(e) => setCustomForm({ ...customForm, id: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy-primary mb-1">
                      Campus Building
                    </label>
                    <select
                      value={customForm.building}
                      onChange={(e) => setCustomForm({ ...customForm, building: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
                    >
                      {BUILDINGS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-primary mb-1">
                      Category
                    </label>
                    <select
                      value={customForm.category}
                      onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-primary mb-1">
                    Exact Location Details *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3rd Floor, Room 301, Front Podium"
                    value={customForm.locationDetails}
                    onChange={(e) =>
                      setCustomForm({ ...customForm, locationDetails: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-primary mb-1">
                    Default Issue Title Suggestion (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Smart board touch sensor unresponsive"
                    value={customForm.defaultTitle}
                    onChange={(e) =>
                      setCustomForm({ ...customForm, defaultTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-campus-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Evaluator Instructions Card */}
          <div className="bg-slate-50 rounded-2xl border border-campus-border p-5 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-navy-primary">
              <Sparkles className="w-4 h-4 text-mint-DEFAULT" />
              <span>How To Demo This for Examiners / Evaluators:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-campus-text pl-1 text-[11px] leading-relaxed">
              <li>
                <strong>Option A (Live Phone Scan):</strong> Point any smartphone camera at the QR code on the right. Tap the link to open the Student portal with the room and issue category already filled in!
              </li>
              <li>
                <strong>Option B (1-Click Test Button):</strong> Click <em>"Test Open in New Tab"</em> to simulate what the phone user sees instantly on your laptop.
              </li>
              <li>
                <strong>Option C (Print Tags):</strong> Click <em>"Print All Asset Tags"</em> to preview the formatted physical stickers with QR codes for campus equipment.
              </li>
            </ol>
          </div>
        </div>

        {/* Right Column: Live Interactive QR Tag Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-white rounded-2xl border-2 border-navy-primary/15 p-6 shadow-md space-y-5 text-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-primary text-white text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-mint-DEFAULT" />
              <span>SmartCampus Official Asset Tag</span>
            </div>

            {/* Asset Identity */}
            <div>
              <span className="font-mono text-xs font-bold text-white bg-navy-primary px-2.5 py-0.5 rounded shadow-2xs">
                {activeAsset.id || 'AST-PREVIEW'}
              </span>
              <h3 className="text-base font-extrabold text-navy-primary mt-2">
                {activeAsset.name || 'Campus Equipment Tag'}
              </h3>
              <p className="text-xs text-campus-muted mt-0.5">
                {activeAsset.building} &bull; {activeAsset.locationDetails || 'Campus Site'}
              </p>
            </div>

            {/* The Live QR Code */}
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 inline-block shadow-inner">
              <QRCodeSVG
                value={reportUrl}
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#142B4A"
              />
            </div>

            <p className="text-[11px] text-campus-muted">
              Scan with phone camera to report maintenance issue at this asset
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={reportUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-primary hover:bg-navy-secondary text-white text-xs font-bold transition-smooth shadow-xs"
              >
                <ExternalLink className="w-4 h-4 text-mint-DEFAULT" />
                <span>Test Open Report Form (Simulate Scan)</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-primary text-xs font-semibold transition-smooth border border-campus-border"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Direct QR Target Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Sheet Section (Visible on Screen & formatted for window.print()) */}
      <div className="bg-white rounded-2xl border border-campus-border p-6 shadow-xs space-y-4">
        <div className="print:hidden flex items-center justify-between pb-3 border-b border-campus-border">
          <div>
            <h3 className="text-sm font-bold text-navy-primary">
              Printable Campus Equipment Tags (Sheet View)
            </h3>
            <p className="text-xs text-campus-muted">
              Ready-to-cut physical sticker tags for campus labs, water dispensers, and lecture halls.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-primary text-xs font-semibold border border-campus-border transition-smooth"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>

        {/* 6-Grid Printable Sticker Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-4">
          {PRESET_ASSETS.map((asset) => {
            const assetUrl = `${origin}/student/report?building=${encodeURIComponent(
              asset.building
            )}&location=${encodeURIComponent(asset.locationDetails)}&category=${encodeURIComponent(
              asset.category
            )}&assetId=${encodeURIComponent(asset.id)}&title=${encodeURIComponent(asset.defaultTitle)}`;

            return (
              <div
                key={asset.id}
                className="p-4 rounded-2xl border-2 border-navy-primary/30 bg-slate-50/50 flex flex-col justify-between items-center text-center space-y-3 print:border-2 print:border-black print:p-4 print:break-inside-avoid"
              >
                {/* Tag Header */}
                <div className="w-full border-b border-slate-200 pb-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-navy-primary">
                    SmartCampus Eco-Operations
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#1b7a52]">
                    {asset.id}
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-white p-2 rounded-xl border border-slate-300 shadow-xs">
                  <QRCodeSVG value={assetUrl} size={110} level="M" fgColor="#142B4A" />
                </div>

                {/* Info */}
                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-navy-primary leading-tight">
                    {asset.name}
                  </h4>
                  <p className="text-[10px] text-campus-muted line-clamp-1">{asset.building}</p>
                  <p className="text-[9px] text-slate-500 font-mono">
                    Scan to Report Issue Instantly
                  </p>
                </div>

                {/* Interactive Test Link (Hidden in print) */}
                <a
                  href={assetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="print:hidden text-[10px] text-navy-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3 text-mint-DEFAULT" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
