'use client';
import { UserButton, useUser, useSession } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Copy, Check, User, Shield, Lock, Key, Calendar, Clock, Edit } from 'lucide-react';
const DotIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="16" height="16">
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
  </svg>);
const DashboardPage = () => {
    const { user } = useUser();
    const { session } = useSession();
    const getSessionDuration = () => {
        if (!session?.lastActiveAt)
            return 'N/A';
        const now = new Date();
        const lastActive = new Date(session.lastActiveAt);
        const diffMinutes = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60));
        if (diffMinutes < 1)
            return 'Just now';
        if (diffMinutes < 60)
            return `${diffMinutes} min ago`;
        const diffHours = Math.floor(diffMinutes / 60);
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    };
    return (<div className="p-4 md:p-6 max-w-6xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.firstName || 'User'}! 👋</h1>
          <p className="text-gray-600">Here&apos;s your account overview</p>
          <p className="text-gray-600">hshshshshjsJshshehhehehdggd</p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Account Status</p>
              <h3 className="text-xl font-bold mt-1">
                {user?.banned ? 'Banned' : 'Active'}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <User className="w-5 h-5"/>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4"/>
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Security</p>
              <h3 className="text-xl font-bold mt-1">
                {session?.status === 'active' ? 'Protected' : 'Inactive'}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <Shield className="w-5 h-5"/>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4"/>
              Last active {getSessionDuration()}
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Authentication</p>
              <h3 className="text-xl font-bold mt-1">
                {user?.twoFactorEnabled ? '2FA Enabled' : 'Basic'}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <Lock className="w-5 h-5"/>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Key className="w-4 h-4"/>
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <button className="text-sm text-blue-600 hover:underline">View all</button>
        </div>
        
        <div className="space-y-4">
          {user?.lastSignInAt && (<div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                <Key className="w-4 h-4"/>
              </div>
              <div>
                <p className="font-medium">Last sign in</p>
                <p className="text-sm text-gray-500">
                  {new Date(user.lastSignInAt).toLocaleString()} from {session?.lastActiveOrganizationId || 'personal account'}
                </p>
              </div>
            </div>)}

          {user?.updatedAt && (<div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-full text-green-600 mt-1">
                <Edit className="w-4 h-4"/>
              </div>
              <div>
                <p className="font-medium">Profile updated</p>
                <p className="text-sm text-gray-500">
                  {new Date(user.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>)}

          {user?.createdAt && (<div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-full text-purple-600 mt-1">
                <Calendar className="w-4 h-4"/>
              </div>
              <div>
                <p className="font-medium">Account created</p>
                <p className="text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </div>);
};
const AccountDetails = () => {
    const { user } = useUser();
    const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({});
    interface UserData {
        'User ID': string;
        'Full Name': string | null;
        'Primary Email': string | undefined;
        'Email Verified': 'Yes' | 'No';
        'Username': string | null;
        'Phone Number': string | 'Not set';
        'Account Created': string;
        'Last Sign In': string | 'Never';
        'Two Factor Enabled': 'Enabled' | 'Disabled';
        'Public Metadata': string;
        'Private Metadata': string;
        'Unsafe Metadata': string;
    }
    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        if (user) {
            const safeData = {
                'User ID': user.id,
                'Full Name': user.fullName,
                'Primary Email': user.primaryEmailAddress?.emailAddress,
                'Email Verified': user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.verification.status === 'verified' ? 'Yes' : 'No',
                'Username': user.username || 'Not set',
                'Phone Number': user.primaryPhoneNumber?.phoneNumber || 'Not set',
                'Account Created': new Date(user.createdAt).toLocaleString(),
                'Last Sign In': user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : 'Never',
                'Two Factor Enabled': user.twoFactorEnabled ? 'Enabled' : 'Disabled',
                'Public Metadata': JSON.stringify(user.publicMetadata, null, 2),
                'Private Metadata': '***** (sensitive)',
                'Unsafe Metadata': '***** (sensitive)'
            };
            setUserData(safeData);
        }
    }, [user]);
    const handleCopy = (key: string, value: string) => {
        navigator.clipboard.writeText(value);
        setCopiedItems(prev => ({ ...prev, [key]: true }));
        setTimeout(() => {
            setCopiedItems(prev => ({ ...prev, [key]: false }));
        }, 2000);
    };
    if (!userData) {
        return (<div className="p-6 flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-500">Loading user data...</div>
      </div>);
    }
    return (<div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Account Details</h1>
        <div className="flex gap-2">
        </div>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm divide-y overflow-hidden">
        {Object.entries(userData).map(([key, value]) => (<div key={key} className="p-4 flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <strong className="block font-medium text-gray-900 truncate">{key}</strong>
              <p className="text-sm text-gray-600 break-all mt-1">
                {String(value)}
              </p>
            </div>
            {value && !['Private Metadata', 'Unsafe Metadata'].includes(key) && (<button onClick={() => handleCopy(key, String(value))} className="p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0" title="Copy to clipboard">
                {copiedItems[key] ? (<Check className="w-4 h-4 text-green-500"/>) : (<Copy className="w-4 h-4 text-gray-500"/>)}
              </button>)}
          </div>))}
      </div>
    </div>);
};
export const UserButtonCustom = () => {
    return (<UserButton>
      <UserButton.UserProfilePage label="Dashboard" url="dashboard" labelIcon={<DotIcon />}>
        <DashboardPage />
      </UserButton.UserProfilePage>

      <UserButton.UserProfilePage label="account"/>
      <UserButton.UserProfilePage label="security"/>

      <UserButton.UserProfilePage label="Account Details" url="account-details" labelIcon={<DotIcon />}>
        <AccountDetails />
      </UserButton.UserProfilePage>
    </UserButton>);
};
