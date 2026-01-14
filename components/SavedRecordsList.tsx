import React from 'react';
import { Trash2, FileEdit, Clock } from 'lucide-react';
import { SavedRecord } from '../services/storageService';

interface SavedRecordsListProps {
  records: SavedRecord[];
  onLoad: (record: SavedRecord) => void;
  onDelete: (id: string) => void;
  currentId: string | null;
}

const SavedRecordsList: React.FC<SavedRecordsListProps> = ({ records, onLoad, onDelete, currentId }) => {
  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <p className="text-sm">No saved records found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-hide">
      {records.map((record) => (
        <div 
          key={record.id} 
          className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
            currentId === record.id 
              ? 'bg-blue-50 border-blue-200 shadow-sm' 
              : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
          }`}
        >
          <div 
            className="flex-1 min-w-0 cursor-pointer"
            onClick={() => onLoad(record)}
          >
            <h4 className={`text-sm font-medium truncate ${currentId === record.id ? 'text-blue-700' : 'text-gray-700'}`}>
              {record.name}
            </h4>
            <div className="flex items-center gap-1 mt-0.5 text-[10px] text-gray-400">
              <Clock size={10} />
              <span>{new Date(record.savedAt).toLocaleDateString()} {new Date(record.savedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 ml-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(record.id); }}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Delete Record"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedRecordsList;
