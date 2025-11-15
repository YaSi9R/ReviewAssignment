'use client';

import { useState, useMemo } from 'react';
import { User, Store, Rating } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Users, StoreIcon, Star } from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  users: User[];
  stores: Store[];
  ratings: Rating[];
  onAddUser: (user: User) => void;
  onAddStore: (store: Store) => void;
  onLogout: () => void;
}

export function AdminDashboard({
  currentUser,
  users,
  stores,
  ratings,
  onAddUser,
  onAddStore,
  onLogout,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterField, setFilterField] = useState<'name' | 'email' | 'address' | 'role'>('name');

  const normalUsers = users.filter(u => u.role === 'user');
  const adminUsers = users.filter(u => u.role === 'admin');
  const storeOwners = users.filter(u => u.role === 'store_owner');

  // Calculate statistics
  const stats = {
    totalUsers: users.length,
    totalStores: stores.length,
    totalRatings: ratings.length,
  };

  // Filter logic
  const filteredUsers = useMemo(() => {
    return normalUsers.filter(user => {
      const searchLower = searchQuery.toLowerCase();
      if (filterField === 'name') return user.name.toLowerCase().includes(searchLower);
      if (filterField === 'email') return user.email.toLowerCase().includes(searchLower);
      if (filterField === 'address') return user.address.toLowerCase().includes(searchLower);
      return true;
    });
  }, [searchQuery, filterField, normalUsers]);

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const searchLower = searchQuery.toLowerCase();
      if (filterField === 'name') return store.name.toLowerCase().includes(searchLower);
      if (filterField === 'email') return store.email.toLowerCase().includes(searchLower);
      if (filterField === 'address') return store.address.toLowerCase().includes(searchLower);
      return true;
    });
  }, [searchQuery, filterField, stores]);

  const getStoreRating = (storeId: string) => {
    const storeRatings = ratings.filter(r => r.storeId === storeId);
    if (storeRatings.length === 0) return 0;
    return (storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <StoreIcon className="h-4 w-4" />
                Total Stores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalStores}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Star className="h-4 w-4" />
                Total Ratings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalRatings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="stores">Stores</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Platform statistics and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Normal Users</p>
                    <p className="text-2xl font-bold">{normalUsers.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Store Owners</p>
                    <p className="text-2xl font-bold">{storeOwners.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Admin Users</p>
                    <p className="text-2xl font-bold">{adminUsers.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold">
                      {ratings.length > 0
                        ? (
                            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
                          ).toFixed(1)
                        : '0'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>View and manage all users on the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <select
                    value={filterField}
                    onChange={(e) => setFilterField(e.target.value as any)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="name">By Name</option>
                    <option value="email">By Email</option>
                    <option value="address">By Address</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-muted">
                      <tr>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Address</th>
                        <th className="text-left p-2">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <tr key={user.id} className="border-b hover:bg-muted/50">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2 max-w-xs truncate">{user.address}</td>
                            <td className="p-2">
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                                {user.role}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-muted-foreground">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Stores</CardTitle>
                <CardDescription>View all registered stores and their ratings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search stores..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <select
                    value={filterField}
                    onChange={(e) => setFilterField(e.target.value as any)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="name">By Name</option>
                    <option value="email">By Email</option>
                    <option value="address">By Address</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-muted">
                      <tr>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Address</th>
                        <th className="text-left p-2">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStores.length > 0 ? (
                        filteredStores.map(store => (
                          <tr key={store.id} className="border-b hover:bg-muted/50">
                            <td className="p-2">{store.name}</td>
                            <td className="p-2">{store.email}</td>
                            <td className="p-2 max-w-xs truncate">{store.address}</td>
                            <td className="p-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span>{getStoreRating(store.id)}</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-muted-foreground">
                            No stores found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
