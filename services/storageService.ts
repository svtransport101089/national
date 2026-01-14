import { IdCardData } from '../types';

export interface SavedRecord extends IdCardData {
  id: string;
  savedAt: string;
  name: string;
}

const STORAGE_KEY = 'idforge_saved_records';

export const getRecords = (): SavedRecord[] => {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Failed to load records", e);
    return [];
  }
};

export const saveRecord = (data: IdCardData): string => {
  const records = getRecords();
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  const newRecord: SavedRecord = {
    ...data,
    id,
    savedAt: new Date().toISOString(),
    name: `${data.firstName || 'Unknown'} - ${data.role || 'Member'}`
  };
  
  // Clean up Blob URLs before saving as they don't persist in localStorage
  if (typeof newRecord.profileImage === 'string' && newRecord.profileImage.startsWith('blob:')) newRecord.profileImage = null;
  if (typeof newRecord.signatureImage === 'string' && newRecord.signatureImage.startsWith('blob:')) newRecord.signatureImage = null;
  if (typeof newRecord.templateImage === 'string' && newRecord.templateImage.startsWith('blob:')) newRecord.templateImage = null;

  records.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return id;
};

export const updateRecord = (id: string, data: IdCardData) => {
    const records = getRecords();
    const index = records.findIndex(r => r.id === id);
    if (index !== -1) {
        const updatedRecord = { 
            ...data, 
            id, 
            savedAt: new Date().toISOString(),
            name: `${data.firstName || 'Unknown'} - ${data.role || 'Member'}` 
        };
        
        // Clean blobs
        if (typeof updatedRecord.profileImage === 'string' && updatedRecord.profileImage.startsWith('blob:')) updatedRecord.profileImage = null;
        if (typeof updatedRecord.signatureImage === 'string' && updatedRecord.signatureImage.startsWith('blob:')) updatedRecord.signatureImage = null;
        if (typeof updatedRecord.templateImage === 'string' && updatedRecord.templateImage.startsWith('blob:')) updatedRecord.templateImage = null;

        records[index] = updatedRecord as SavedRecord;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }
};

export const deleteRecord = (id: string) => {
  const records = getRecords().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};
