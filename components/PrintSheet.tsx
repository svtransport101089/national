import React from 'react';
import { IdCardData } from '../types';

interface PrintSheetProps {
  data: IdCardData;
  copies?: number;
}

const PrintSheet: React.FC<PrintSheetProps> = ({ data }) => {
  return (
    <div 
      id="print-area"
      className="bg-white mx-auto shadow-2xl relative flex flex-col print:shadow-none print:w-full print:h-full print:absolute print:top-0 print:left-0"
      style={{
        width: '210mm',
        height: '297mm',
      }}
    >
        {/* Full Page Template Image (Background) */}
        {data.templateImage && (
            <div className={`absolute inset-0 z-0 ${!data.printTemplate ? 'print:hidden' : ''}`}>
                <img 
                    src={data.templateImage} 
                    className="w-full h-full" 
                    style={{ objectFit: 'fill' }} // Forces image to stretch to A4 corners.
                    alt="Template" 
                />
            </div>
        )}

        {/* Content Overlay */}
        <div 
            className="absolute inset-0 z-10 flex flex-col px-12"
            style={{
                // Adjusted for the large NFITU header
                paddingTop: '280px', 
                // Adjusted for the footer address bar
                paddingBottom: '100px',
            }}
        >
            {/* Body Content */}
            <div className="flex-1 flex flex-col relative font-sans text-gray-900 leading-relaxed">
                
                {/* Ref No & Date */}
                <div className="flex justify-between items-start mb-6 font-bold text-sm">
                    <div>
                        <p>வ.எண்: {data.refNumber}</p>
                    </div>
                    <div>
                        <p>தேதி: {new Date(data.issueDate).toLocaleDateString('en-GB')}</p>
                    </div>
                </div>

                {/* Special Header */}
                {data.specialHeader && (
                    <div className="text-center mb-8">
                        <span 
                            className="inline-block px-4 py-1 rounded border-2 font-bold text-lg bg-white/80 backdrop-blur-sm shadow-sm"
                            style={{ borderColor: data.themeColor, color: data.themeColor }}
                        >
                            {data.specialHeader}
                        </span>
                    </div>
                )}

                {/* Main Text */}
                <div className="mb-8 relative z-10">
                    <p className="text-lg text-justify leading-9 font-medium indent-12">
                        {data.orgName}யின் <span className="font-bold">{data.district}</span> மாவட்டம், <span className="font-bold">{data.role}</span> பொறுப்பில், <span className="font-bold">{data.firstName}</span> அவர்களை <span className="font-bold">{new Date(data.issueDate).toLocaleDateString('en-GB')}</span> முதல் நியமனம் செய்யப்படுகிறது.
                    </p>
                    <p className="text-lg text-justify leading-9 font-medium indent-12 mt-4">
                        தங்களது பணி சிறக்க மனதார வாழ்த்துகின்றேன்.
                    </p>
                </div>

                {/* Bottom Section: Recipient & Photo/Sig */}
                <div className="mt-auto flex justify-between items-start relative z-10">
                    
                    {/* Recipient Block (Left) */}
                    <div className="flex-1 max-w-[55%] pr-4">
                        <h3 className="font-bold text-lg mb-2 underline decoration-2 underline-offset-4">பெறுநர்</h3>
                        <div className="text-md font-semibold space-y-1.5 leading-snug">
                            <p>{data.firstName} {data.lastName}</p>
                            <p>த/பெ {data.fatherName}</p>
                            <p>{data.address}</p>
                            {data.postOffice && <p>{data.postOffice}</p>}
                            <p>{data.district} - {data.pincode}</p>
                            <div className="mt-3 pt-2 border-t border-gray-400 inline-block pr-4">
                                <p>ஆதார் எண்: {data.aadhar}</p>
                                <p>செல்: {data.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Photo & Signature Placeholder */}
                    <div className="flex flex-col items-center gap-4">
                        {/* Photo */}
                        <div className="p-1 bg-white border border-gray-300 shadow-sm -rotate-1">
                            <div className="w-32 h-40 bg-gray-100 overflow-hidden relative">
                                {data.profileImage ? (
                                    <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                                        <span className="text-xs font-medium">PHOTO</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Signature Area */}
                        <div className="text-center mt-2">
                             {/* Transparent placeholder for signature area */}
                            <div className="h-12 flex items-end justify-center mb-1">
                                 {!data.printTemplate && (
                                     <span className="font-cursive text-xl text-blue-900 italic" style={{ fontFamily: 'cursive' }}>
                                        (கையெழுத்து)
                                     </span>
                                 )}
                            </div>
                            <p 
                                className="text-sm font-bold border-t border-gray-800 pt-1 px-2"
                                style={{ color: data.themeColor }}
                            >
                                பொதுச் செயலாளர்
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PrintSheet;