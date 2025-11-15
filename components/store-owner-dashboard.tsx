'use client';

import { User, Store, Rating } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Users, TrendingUp } from 'lucide-react';

interface StoreOwnerDashboardProps {
  currentUser: User;
  stores: Store[];
  ratings: Rating[];
  onLogout: () => void;
}

export function StoreOwnerDashboard({
  currentUser,
  stores,
  ratings,
  onLogout,
}: StoreOwnerDashboardProps) {
  const userStore = stores.find(s => s.ownerId === currentUser.id);
  const storeRatings = userStore ? ratings.filter(r => r.storeId === userStore.id) : [];

  const averageRating =
    storeRatings.length > 0
      ? (storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length).toFixed(1)
      : '0';

  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: storeRatings.filter(r => r.rating === rating).length,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Store Owner Dashboard</h1>
            <p className="text-sm text-muted-foreground">Managing: {userStore?.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {userStore ? (
          <div className="space-y-6">
            {/* Store Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>{userStore.name}</CardTitle>
                <CardDescription>{userStore.address}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userStore.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Store ID</p>
                    <p className="font-medium text-sm">{userStore.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{currentUser.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{averageRating}</div>
                  <p className="text-xs text-muted-foreground">out of 5 stars</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{storeRatings.length}</div>
                  <p className="text-xs text-muted-foreground">user submissions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Top Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {storeRatings.length > 0 ? Math.max(...storeRatings.map(r => r.rating)) : '-'}
                  </div>
                  <p className="text-xs text-muted-foreground">highest rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Breakdown of all ratings received</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ratingDistribution.map(({ rating, count }) => (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 min-w-20">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating
                              ? 'fill-primary text-primary'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: storeRatings.length > 0
                            ? `${(count / storeRatings.length) * 100}%`
                            : '0%',
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium min-w-8 text-right">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Ratings</CardTitle>
                <CardDescription>Latest customer ratings for your store</CardDescription>
              </CardHeader>
              <CardContent>
                {storeRatings.length > 0 ? (
                  <div className="space-y-3">
                    {[...storeRatings].reverse().map(rating => (
                      <div key={rating.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="text-sm font-medium">Rating #{rating.id.slice(-6)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(rating.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating.rating
                                  ? 'fill-primary text-primary'
                                  : 'fill-muted text-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">No ratings yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No store assigned to your account
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
