'use client';
import { useState } from 'react';
import { CustomUser } from '@/types/clerk';
interface BanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        type: 'permanent' | 'temporary';
        reason: string;
        duration?: number;
    }) => void;
    user: CustomUser;
}
export function BanModal({ isOpen, onClose, onSubmit, user }: BanModalProps) {
    const [banType, setBanType] = useState<'permanent' | 'temporary'>('permanent');
    const [reason, setReason] = useState('');
    const [duration, setDuration] = useState(60);
    if (!isOpen || !user)
        return null;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            type: banType,
            reason,
            duration: banType === 'temporary' ? duration : undefined
        });
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Ban User: {user.email}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ban Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" checked={banType === 'permanent'} onChange={() => setBanType('permanent')}/>
                <span className="ml-2">Permanent</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" checked={banType === 'temporary'} onChange={() => setBanType('temporary')}/>
                <span className="ml-2">Temporary</span>
              </label>
            </div>
          </div>
          
          {banType === 'temporary' && (<div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input type="number" id="duration" min="1" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            </div>)}
          
          <div className="mb-6">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea id="reason" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Ban User
            </button>
          </div>
        </form>
      </div>
    </div>);
}
