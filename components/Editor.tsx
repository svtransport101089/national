import React, { useState } from 'react';
import { IdCardData } from '../types';
import { generateRandomProfile } from '../services/geminiService';
import { Wand2, Upload, Trash2, Printer, FileText, Image as ImageIcon, ScanLine, AlertCircle, CheckSquare, Square, Stamp, Download } from 'lucide-react';

interface EditorProps {
  data: IdCardData;
  onChange: (data: IdCardData) => void;
  onPrint: () => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, onPrint }) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleChange = (field: keyof IdCardData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'profileImage' | 'templateImage' | 'signatureImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...data, [field]: url });
    }
  };

  const handleAiGenerate = async () => {
    setLoadingAi(true);
    const profile = await generateRandomProfile();
    setLoadingAi(false);
    if (profile) {
      onChange({
        ...data,
        firstName: profile.firstName,
        fatherName: profile.fatherName,
        role: profile.role,
        district: profile.district,
        address: profile.address,
        postOffice: profile.postOffice,
        pincode: profile.pincode,
        aadhar: profile.aadhar,
        specialHeader: profile.specialHeader || data.specialHeader,
      });
    } else {
        alert("Failed to generate profile. Check your API key or try again.");
    }
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('print-area');
    if (!element) return;
    
    setDownloading(true);
    
    // @ts-ignore
    if (typeof window.html2pdf === 'undefined') {
        alert('PDF generator library not loaded. Please wait or refresh.');
        setDownloading(false);
        return;
    }

    // Optimized options for single-page A4 export
    const opt = {
        margin:       [0, 0, 0, 0], // Force zero margins
        filename:     `Appointment_${(data.firstName || 'Order').replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, // Higher scale for clear text
            useCORS: true, 
            scrollY: 0,
            scrollX: 0,
            windowWidth: 794, // Exact A4 width in px at 96 DPI
            windowHeight: 1123, // Exact A4 height in px at 96 DPI
            letterRendering: true,
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        // @ts-ignore
        await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
        console.error("PDF Export failed:", err);
        alert("Failed to export PDF.");
    } finally {
        setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide">
      
      {/* Header Actions */}
      <div className="p-6 border-b border-gray-100 bg-gray-50 sticky top-0 z-20">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Appointment Editor</h2>
        <p className="text-sm text-gray-500 mb-4 truncate" title={data.orgName}>{data.orgName}</p>
        
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={handleAiGenerate}
                    disabled={loadingAi}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {loadingAi ? (
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        <Wand2 size={16} />
                    )}
                    Auto-Fill
                </button>
                <button 
                    onClick={onPrint}
                    className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                    <Printer size={16} />
                    Print
                </button>
            </div>
            
            <button 
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors w-full"
            >
                {downloading ? (
                     <span className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></span>
                ) : (
                    <Download size={16} />
                )}
                Export as PDF
            </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Template Section */}
        <section className="space-y-4">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon size={12} /> Letterhead Template
             </h3>
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <label className="block text-sm font-medium text-blue-900 mb-2">Background Image</label>
                <p className="text-xs text-blue-700 mb-3">Upload a full A4 image (Header+Footer). It will scale to fit.</p>
                
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                        <label className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-white border border-blue-300 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-50 cursor-pointer shadow-sm">
                            <Upload size={14} />
                            {data.templateImage ? 'Change Image' : 'Upload Image'}
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'templateImage')} />
                        </label>
                    </div>
                    {data.templateImage && (
                        <button 
                            onClick={() => onChange({...data, templateImage: null})}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                            title="Remove Template"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                {data.templateImage && (
                    <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => handleChange('printTemplate', !data.printTemplate)}>
                        {data.printTemplate ? (
                            <CheckSquare size={16} className="text-blue-600" />
                        ) : (
                            <Square size={16} className="text-blue-400" />
                        )}
                        <span className="text-sm text-blue-800 font-medium">Print Background Image?</span>
                    </div>
                )}
                {data.templateImage && !data.printTemplate && (
                    <p className="text-[10px] text-blue-600 ml-6 mt-1">
                        Image will be visible in preview but hidden when printing.
                    </p>
                )}

                {/* Visual Indicator / Bounding Box Preview */}
                {data.templateImage && (
                    <div className="mt-4 border-t border-blue-200 pt-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-blue-800 uppercase flex items-center gap-1">
                                <ScanLine size={12} /> A4 Fit Preview
                            </span>
                            <span className="text-[9px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                                210mm x 297mm
                            </span>
                        </div>
                        <div className="relative w-full bg-gray-200 rounded-sm overflow-hidden shadow-inner ring-1 ring-blue-200 ring-offset-2 ring-offset-blue-50" style={{ aspectRatio: '210/297' }}>
                            <img 
                                src={data.templateImage} 
                                alt="A4 Preview" 
                                className="w-full h-full"
                                style={{ objectFit: 'fill' }} 
                            />
                            
                            {/* Bounding Box Indicator */}
                            <div className="absolute inset-0 border-[3px] border-dashed border-yellow-400 opacity-60 pointer-events-none"></div>
                        </div>
                        <div className="mt-2 flex gap-2 items-start">
                            <AlertCircle size={12} className="text-blue-600 mt-0.5 shrink-0" />
                            <p className="text-[10px] text-blue-700 leading-tight">
                                Image will be stretched to fill A4.
                            </p>
                        </div>
                    </div>
                )}
             </div>
        </section>

        {/* Document Info */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FileText size={12} /> Header Info
             </h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ref Number (வ.எண்)</label>
                <input type="text" value={data.refNumber || ''} onChange={(e) => handleChange('refNumber', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Header (Title)</label>
                <input type="text" value={data.specialHeader || ''} onChange={(e) => handleChange('specialHeader', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date (தேதி)</label>
                <input type="date" value={data.issueDate} onChange={(e) => handleChange('issueDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
        </section>

        {/* Personal Info */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Details</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name (பெயர்)</label>
                <input type="text" value={data.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name (தந்தை)</label>
                <input type="text" value={data.fatherName || ''} onChange={(e) => handleChange('fatherName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role (பொறுப்பு)</label>
                <input type="text" value={data.role} onChange={(e) => handleChange('role', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District (மாவட்டம்)</label>
                <input type="text" value={data.district} onChange={(e) => handleChange('district', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
            </div>
        </section>

        {/* Address Block */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address & Contact</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address (முகவரி)</label>
                <textarea 
                    value={data.address} 
                    onChange={(e) => handleChange('address', e.target.value)} 
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none" 
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Office (அஞ்சல்)</label>
                <input type="text" value={data.postOffice || ''} onChange={(e) => handleChange('postOffice', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode (பின் கோடு)</label>
                    <input type="text" value={data.pincode || ''} onChange={(e) => handleChange('pincode', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
                 </div>
                 <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Mobile (கைபேசி)</label>
                     <input type="text" value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
                 </div>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar (ஆதார் எண்)</label>
                <input type="text" value={data.aadhar || ''} onChange={(e) => handleChange('aadhar', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
        </section>

        {/* Media */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Images</h3>
             
             {/* Profile Image */}
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Photo (PHOTO)</label>
                <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                        {data.profileImage ? (
                            <img src={data.profileImage} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <UserIcon />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer w-fit mb-2">
                            <Upload size={14} />
                            Upload Photo
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImage')} />
                        </label>
                        {data.profileImage && (
                            <button 
                                onClick={() => onChange({...data, profileImage: null})}
                                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                            >
                                <Trash2 size={12} /> Remove
                            </button>
                        )}
                    </div>
                </div>
             </div>

             {/* Signature/Seal Image */}
             <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Signature / Seal</label>
                <div className="flex items-center gap-4">
                    <div className="h-16 w-32 rounded bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-200 flex items-center justify-center">
                        {data.signatureImage ? (
                            <img src={data.signatureImage} alt="Seal" className="h-full w-full object-contain" />
                        ) : (
                            <div className="text-gray-400 flex flex-col items-center">
                                <Stamp size={20} />
                                <span className="text-[10px] mt-1">No Seal</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer w-fit mb-2">
                            <Upload size={14} />
                            Upload Seal
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'signatureImage')} />
                        </label>
                        {data.signatureImage && (
                            <button 
                                onClick={() => onChange({...data, signatureImage: null})}
                                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                            >
                                <Trash2 size={12} /> Remove
                            </button>
                        )}
                    </div>
                </div>
             </div>
        </section>

        {/* Branding (Collapsed/Minimal as Template is used) */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Organization Name (Text Fallback)</h3>
             <div>
                <input type="text" value={data.orgName} onChange={(e) => handleChange('orgName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                    <div className="flex items-center gap-2">
                         <input type="color" value={data.themeColor} onChange={(e) => handleChange('themeColor', e.target.value)} className="h-9 w-9 p-0.5 rounded border border-gray-300 cursor-pointer" />
                         <span className="text-xs text-gray-500">{data.themeColor}</span>
                    </div>
                 </div>
             </div>
        </section>
        
        <div className="h-12"></div> {/* Spacer */}
      </div>
    </div>
  );
};

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default Editor;