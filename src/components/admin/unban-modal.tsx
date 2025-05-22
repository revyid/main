'use client';
import { User } from '@clerk/nextjs/server';
interface UnbanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    user: User | null;
}
export function UnbanModal({ isOpen, onClose, onSubmit, user }: UnbanModalProps) {
    if (!isOpen || !user)
        return null;
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Unban User: {user.email}</h2>
        <p className="mb-6">Are you sure you want to unban this user?</p>
        
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </button>
          <button type="button" onClick={onSubmit} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Unban User
          </button>
        </div>
      </div>
    </div>);
}
