export interface IdCardData {
  firstName: string; // Used as Name {{பெயர்}}
  lastName: string;  // Optional, merged for name
  fatherName: string; // {{தந்தை/கணவர்}}
  role: string;      // {{பொறுப்பு}}
  idNumber: string;  // Not explicitly used in template but good to keep
  district: string;  // {{மாவட்டம்}}
  bloodGroup: string;
  issueDate: string; // {{தேதி}}
  expiryDate: string;
  phone: string;     // {{கைபேசி எண்}}
  email: string;
  address: string;   // {{முகவரி}}
  postOffice: string; // {{அஞ்சல்}}
  pincode: string;   // {{பின் கோடு}}
  aadhar: string;    // {{ஆதார் எண்}}
  profileImage: string | null; // {{PHOTO}}
  templateImage: string | null; // Full page background (Header+Footer+Watermark)
  printTemplate: boolean; // Controls if the background image prints
  orgLogo: string | null;
  themeColor: string;
  accentColor: string;
  orgName: string;
  tagline: string;
  refNumber: string; // {{வஎண்}}
  specialHeader: string; // {{SPECIAL}}
  letterContent: string; // Can be used for custom body override
}

export enum CardTheme {
  MODERN = 'MODERN',
  CLASSIC = 'CLASSIC',
  BOLD = 'BOLD',
}

export interface GeneratedProfile {
  firstName: string;
  fatherName: string;
  role: string;
  district: string;
  address: string;
  postOffice: string;
  pincode: string;
  aadhar: string;
  specialHeader: string;
}