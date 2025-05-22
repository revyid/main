'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
interface User {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    publicMetadata: {
        isBanned?: boolean;
        banReason?: string;
        banExpiresAt?: string;
        banType?: 'permanent' | 'temporary';
    };
}
interface AppSettings {
    registrationEnabled: boolean;
    maintenanceMode: boolean;
    apiRateLimit: number;
    passwordPolicy: 'low' | 'medium' | 'high';
    require2FA: boolean;
    activityLogging: boolean;
}
export default function AdminPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [settings, setSettings] = useState<AppSettings>({
        registrationEnabled: true,
        maintenanceMode: false,
        apiRateLimit: 100,
        passwordPolicy: 'medium',
        require2FA: true,
        activityLogging: true,
    });
    const [banModalOpen, setBanModalOpen] = useState(false);
    const [unbanModalOpen, setUnbanModalOpen] = useState(false);
    const [banType, setBanType] = useState<'permanent' | 'temporary'>('permanent');
    const [banReason, setBanReason] = useState('');
    const [banDuration, setBanDuration] = useState(60);
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            document.cookie = `admin-token=${process.env.NEXT_PUBLIC_ADMIN_TOKEN_SECRET}; path=/; max-age=86400`;
            setIsLoggedIn(true);
            fetchUsers();
            fetchSettings();
        }
        else {
            setError('Invalid credentials');
        }
        setIsLoading(false);
    };
    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('admin-token='))?.split('=')[1];
        if (token === process.env.NEXT_PUBLIC_ADMIN_TOKEN_SECRET) {
            setIsLoggedIn(true);
            fetchUsers();
            fetchSettings();
        }
    }, []);
    const fetchUsers = async () => {
        try {
            setLoadingUsers(true);
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            setUsers(data.users);
        }
        catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to fetch users');
        }
        finally {
            setLoadingUsers(false);
        }
    };
    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/admin/settings');
            const data = await response.json();
            setSettings(data.settings);
        }
        catch (error) {
            console.error('Failed to fetch settings:', error);
        }
    };
    const saveSettings = async () => {
        try {
            const response = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            });
            if (response.ok) {
                toast.success('Settings saved successfully');
            }
            else {
                throw new Error('Failed to save settings');
            }
        }
        catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Failed to save settings');
        }
    };
    const handleBanUser = async () => {
        if (!selectedUser)
            return;
        try {
            const response = await fetch('/api/admin/ban', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: selectedUser.id,
                    type: banType,
                    reason: banReason,
                    duration: banType === 'temporary' ? banDuration : undefined,
                }),
            });
            if (response.ok) {
                toast.success('User banned successfully');
                setBanModalOpen(false);
                fetchUsers();
            }
            else {
                throw new Error('Failed to ban user');
            }
        }
        catch (error) {
            console.error('Error banning user:', error);
            toast.error('Failed to ban user');
        }
    };
    const handleUnbanUser = async () => {
        if (!selectedUser)
            return;
        try {
            const response = await fetch('/api/admin/unban', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: selectedUser.id,
                }),
            });
            if (response.ok) {
                toast.success('User unbanned successfully');
                setUnbanModalOpen(false);
                fetchUsers();
            }
            else {
                throw new Error('Failed to unban user');
            }
        }
        catch (error) {
            console.error('Error unbanning user:', error);
            toast.error('Failed to unban user');
        }
    };
    const filteredUsers = users.filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())));
    if (!isLoggedIn) {
        return (<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => {
            document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            setIsLoggedIn(false);
            router.push('/admin');
        }}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <div className="relative w-64">
                    <Input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8"/>
                    <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (<div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"/>
                  </div>) : (<Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (<TableRow key={user.id}>
                          <TableCell>
                            {user.firstName} {user.lastName}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.publicMetadata.isBanned ? 'destructive' : 'default'}>
                              {user.publicMetadata.isBanned ? 'Banned' : 'Active'}
                            </Badge>
                            {user.publicMetadata.isBanned && user.publicMetadata.banExpiresAt && (<p className="text-xs text-gray-500 mt-1">
                                Until: {format(new Date(user.publicMetadata.banExpiresAt), 'PPpp')}
                              </p>)}
                          </TableCell>
                          <TableCell>
                            {user.publicMetadata.isBanned ? (<Button variant="outline" size="sm" onClick={() => {
                        setSelectedUser(user);
                        setUnbanModalOpen(true);
                    }}>
                                Unban
                              </Button>) : (<Button variant="destructive" size="sm" onClick={() => {
                        setSelectedUser(user);
                        setBanModalOpen(true);
                    }}>
                                Ban
                              </Button>)}
                          </TableCell>
                        </TableRow>))}
                    </TableBody>
                  </Table>)}
              </CardContent>
            </Card>
          </div>

          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="registration">User Registration</Label>
                  <Switch id="registration" checked={settings.registrationEnabled} onCheckedChange={(checked) => setSettings({ ...settings, registrationEnabled: checked })}/>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <Switch id="maintenance" checked={settings.maintenanceMode} onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">API Rate Limit</Label>
                  <Input id="rateLimit" type="number" value={settings.apiRateLimit} onChange={(e) => setSettings({ ...settings, apiRateLimit: Number(e.target.value) })}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select value={settings.passwordPolicy} onValueChange={(value: 'low' | 'medium' | 'high') => setSettings({ ...settings, passwordPolicy: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (6+ chars)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, 1 number)</SelectItem>
                      <SelectItem value="high">High (10+ chars, mixed case, special)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} className="w-full">
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      
      <Dialog open={banModalOpen} onOpenChange={setBanModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              Ban {selectedUser?.email} from the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Ban Type</Label>
              <div className="flex space-x-4 mt-2">
                <Button variant={banType === 'permanent' ? 'default' : 'outline'} onClick={() => setBanType('permanent')}>
                  Permanent
                </Button>
                <Button variant={banType === 'temporary' ? 'default' : 'outline'} onClick={() => setBanType('temporary')}>
                  Temporary
                </Button>
              </div>
            </div>
            {banType === 'temporary' && (<div>
                <Label>Duration (minutes)</Label>
                <Input type="number" value={banDuration} onChange={(e) => setBanDuration(Number(e.target.value))} min="1"/>
              </div>)}
            <div>
              <Label>Reason</Label>
              <Textarea value={banReason} onChange={(e) => setBanReason(e.target.value)} placeholder="Enter reason for ban..."/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBanUser}>
              Ban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      <Dialog open={unbanModalOpen} onOpenChange={setUnbanModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unban User</DialogTitle>
            <DialogDescription>
              Unban {selectedUser?.email} from the platform
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to unban this user? They will regain access to the platform.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUnbanModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUnbanUser}>Unban User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
}
