import { IdCardData } from './types';

// Updated Template SVG matching the specific NFITU Letterhead provided
const DEFAULT_TEMPLATE_IMAGE = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2480' height='3508' viewBox='0 0 2480 3508'%3E%3Cdefs%3E%3Cstyle%3E.o%7Bfill:%23ea580c%7D.g%7Bfill:%23166534%7D.b%7Bfill:black%7D.c%7Btext-anchor:middle;font-family:sans-serif;font-weight:bold%7D.w%7Bfill:white%7D%3C/style%3E%3C/defs%3E%3Crect width='2480' height='3508' fill='white'/%3E%3C!-- Header Content --%3E%3Cg transform='translate(1240, 160)'%3E%3Ctext y='0' font-size='75' class='c o'%3ENATIONAL FRONT OF INDIAN TRADE UNIONS (DHN)%3C/text%3E%3Ctext y='90' font-size='60' class='c g'%3E%E0%AE%A8%E0%AF%87%E0%AE%B7%E0%AE%A9%E0%AE%B2%E0%AF%8D %E0%AE%AA%E0%AE%BF%E0%AE%B0%E0%AE%A3%E0%AF%8D%E0%AE%9F%E0%AF%8D %E0%AE%86%E0%AE%AA%E0%AF%8D %E0%AE%87%E0%AE%A8%E0%AF%8D%E0%AE%A4%E0%AE%BF%E0%AE%AF%E0%AE%A9%E0%AF%8D %E0%AE%9F%E0%AE%BF%E0%AE%B0%E0%AF%87%E0%AE%9F%E0%AF%8D %E0%AE%AF%E0%AF%82%E0%AE%A9%E0%AE%BF%E0%AE%AF%E0%AE%A9%E0%AF%8D%3C/text%3E%3Ctext y='170' font-size='50' class='c o'%3ENFITU TAMILNADU%3C/text%3E%3Ctext y='230' font-size='32' class='c b' font-weight='normal'%3ERecognized by Goverment of India Vide Order No.L-52025/202003-IR%3C/text%3E%3Ctext y='310' font-size='55' class='c b'%3EM.Srinivasan, State President of Tamil Nadu%3C/text%3E%3Ctext y='380' font-size='45' class='c b'%3EPhone - 93815 66777 , 73388 77500%3C/text%3E%3C/g%3E%3C!-- Logo Placeholders (Left/Right) --%3E%3Cg transform='translate(220, 220)'%3E%3Ccircle cx='0' cy='0' r='100' stroke='%23166534' stroke-width='15' fill='none'/%3E%3Cpath d='M-60 0 L 60 0 M 0 -60 L 0 60' stroke='%23166534' stroke-width='15'/%3E%3C/g%3E%3Cg transform='translate(2260, 220)'%3E%3Crect x='-100' y='-100' width='200' height='200' fill='%23f3f4f6' rx='20'/%3E%3Ctext x='0' y='10' class='c' font-size='30' fill='%239ca3af'%3EPHOTO%3C/text%3E%3C/g%3E%3C!-- Watermark --%3E%3Cg transform='translate(1240, 1754)' opacity='0.08'%3E%3Ccircle r='600' fill='%23166534'/%3E%3Ctext y='150' font-size='250' class='c w'%3ENFITU%3C/text%3E%3C/g%3E%3C!-- Footer --%3E%3Crect y='3200' width='2480' height='308' fill='%23166534'/%3E%3Cg transform='translate(1240, 3280)'%3E%3Ctext y='0' font-size='34' class='c w'%3ENFITU Head Office : Shramik Sadan, in Front City Dental Clinic Vidyanagar, Bilashpur (C.G)%3C/text%3E%3Ctext y='50' font-size='34' class='c w'%3Epin 495004. e.mail: nfitunp@gmail.com, website: www.nfitu.org%3C/text%3E%3Ctext y='110' font-size='34' class='c w'%3ETamilnadu State Office: No 1053, 6th Street, Yamuna Nagar, Nazarathpettai, Thiruvallur Dist,%3C/text%3E%3Ctext y='160' font-size='34' class='c w'%3ETamilnadu - 600123. Cell: 7338877500, 9976950418%3C/text%3E%3C/g%3E%3C/svg%3E";

// Updated Seal SVG matching the user provided purple stamp with green signature
const DEFAULT_SEAL_IMAGE = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Cdefs%3E%3Cstyle%3E.p%7Bfill:%234b0082;font-family:sans-serif;text-anchor:middle;font-weight:bold%7D.g%7Bstroke:%23166534;fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:round%7D%3C/style%3E%3C/defs%3E%3C!-- Green Signature --%3E%3Cpath d='M280 100 Q 300 50, 330 90 T 400 80 T 480 70' class='g'/%3E%3Cpath d='M250 110 Q 260 60, 270 120 Q 350 80, 450 100' class='g'/%3E%3Cpath d='M420 90 L 550 85' class='g' stroke-width='3'/%3E%3C!-- Purple Stamp Text --%3E%3Ctext x='400' y='160' class='p' font-size='36'%3E%E0%AE%AE%E0%AF%81. %E0%AE%9A%E0%AF%80%E0%AE%A9%E0%AE%BF%E0%AE%B5%E0%AE%BE%E0%AE%9A%E0%AE%A9%E0%AF%8D%3C/text%3E%3Ctext x='400' y='200' class='p' font-size='28'%3E%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AF%8D%E0%AE%A8%E0%AE%BE%E0%AE%9F%E0%AF%8D %E0%AE%AE%E0%AE%BE%E0%AE%A8%E0%AE%BF%E0%AE%B2 %E0%AE%A4%E0%AE%B2%E0%AF%88%E0%AE%B5%E0%AE%B0%E0%AF%8D%3C/text%3E%3Ctext x='400' y='235' class='p' font-size='22'%3E%E0%AE%A8%E0%AF%87%E0%AE%B7%E0%AE%A9%E0%AE%B2%E0%AF%8D %E0%AE%AA%E0%AE%BF%E0%AE%B0%E0%AE%A3%E0%AF%8D%E0%AE%9F%E0%AF%8D %E0%AE%86%E0%AE%AA%E0%AF%8D %E0%AE%87%E0%AE%A8%E0%AF%8D%E0%AE%A4%E0%AE%BF%E0%AE%AF%E0%AE%A9%E0%AF%8D %E0%AE%9F%E0%AE%BF%E0%AE%B0%E0%AF%87%E0%AE%9F%E0%AF%8D %E0%AE%AF%E0%AF%82%E0%AE%A9%E0%AE%BF%E0%AE%AF%E0%AE%A9%E0%AF%8D%3C/text%3E%3Ctext x='400' y='265' class='p' font-size='18'%3ERecognized By Goverment of India Vide Order No. L-520%3C/text%3E%3Ctext x='400' y='295' class='p' font-size='20'%3E%E0%AE%AE%E0%AE%BE%E0%AE%A8%E0%AE%BF%E0%AE%B2%E0%AE%A4%E0%AE%B2%E0%AF%88%E0%AE%AE%E0%AF%88 %E0%AE%85%E0%AE%B2%E0%AF%81%E0%AE%B5%E0%AE%B2%E0%AE%95%E0%AE%AE%E0%AF%8D%3C/text%3E%3Ctext x='400' y='325' class='p' font-size='20'%3E%E0%AE%8E%E0%AE%A3%E0%AF%8D: 1053, 6%E0%AE%B5%E0%AE%A4%E0%AF%81 %E0%AE%A4%E0%AE%95%E0%AF%81, %E0%AE%AF%E0%AE%AE%E0%AF%81%E0%AE%A9%E0%AE%BE %E0%AE%A8%E0%AE%95%E0%AE%B0%E0%AF%8D, %E0%AE%A8%E0%AE%9A%E0%AE%B0%E0%AE%A4%E0%AF%8D%E0%AE%AA%E0%AF%87%E0%AE%9F%E0%AF%8D%E0%AE%9F%E0%AF%88,%3C/text%3E%3Ctext x='400' y='355' class='p' font-size='20'%3E%E0%AE%AA%E0%AF%82%E0%AE%A8%E0%AF%8D%E0%AE%A4%E0%AE%AE%E0%AE%B2%E0%AF%8D%E0%AE%B2%E0%AE%BF, %E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%B5%E0%AE%B3%E0%AF%8D%E0%AE%B3%E0%AF%82%E0%AE%B0%E0%AF%8D %E0%AE%AE%E0%AE%BE%E0%AE%B5%E0%AE%9F%E0%AF%8D%E0%AE%9F%E0%AE%AE%E0%AF%8D,%3C/text%3E%3Ctext x='400' y='385' class='p' font-size='22'%3E%E0%AE%9A%E0%AF%86%E0%AE%A9%E0%AF%8D%E0%AE%A9%E0%AF%88 - 600 123%3C/text%3E%3Ctext x='400' y='425' class='p' font-size='28'%3E%E0%AE%9A%E0%AF%86%E0%AE%B2%E0%AF%8D: 93815 66777, 73388 77500%3C/text%3E%3C/svg%3E";

export const DEFAULT_CARD_DATA: IdCardData = {
  firstName: 'M. Srinivasan',
  lastName: '',
  fatherName: 'Govindasamy',
  role: 'State President of Tamil Nadu',
  idNumber: 'NFITU-TN-001',
  district: 'Thiruvallur',
  bloodGroup: 'O+',
  issueDate: new Date().toISOString().split('T')[0],
  expiryDate: '2025-12-31',
  phone: '93815 66777',
  email: 'nfitunp@gmail.com',
  address: 'No 1053, 6th Street, Yamuna Nagar, Nazarathpettai, Poonamallee',
  postOffice: 'Nazarathpettai Post',
  pincode: '600123',
  aadhar: 'XXXX XXXX XXXX',
  profileImage: null, 
  templateImage: DEFAULT_TEMPLATE_IMAGE,
  printTemplate: true, 
  signatureImage: DEFAULT_SEAL_IMAGE, 
  orgLogo: null, 
  themeColor: '#166534', // NFITU Green
  accentColor: '#ea580c', // NFITU Orange
  orgName: 'National Front of Indian Trade Unions (DHN)',
  tagline: 'Global Coalition for Social Justice',
  refNumber: 'NFITU/TN/2024/01',
  specialHeader: 'APPOINTMENT ORDER',
  letterContent: '', 
};

export const SAMPLE_PROFILE_IMAGES = [
  'https://picsum.photos/300/300?random=1',
  'https://picsum.photos/300/300?random=2',
  'https://picsum.photos/300/300?random=3',
];