'use client';

import { useState, useMemo } from 'react';
import { User, Store, Rating } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface UserDashboardProps {
  currentUser: User;
  stores: Store[];
  ratings: Rating[];
  onRating: (storeId: string, rating: number) => void;
  onLogout: () => void;
}

export function UserDashboard({
  currentUser,
  stores,
  ratings,
  onRating,
  onLogout,
}: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingState, setRatingState] = useState<Record<string, number>>({});
  const [hoverRating, setHoverRating] = useState<Record<string, number>>({});

  const filteredStores = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return stores.filter(
      store =>
        store.name.toLowerCase().includes(query) || store.address.toLowerCase().includes(query)
    );
  }, [searchQuery, stores]);

  const getStoreRating = (storeId: string) => {
    const storeRatings = ratings.filter(r => r.storeId === storeId);
    if (storeRatings.length === 0) return 0;
    return (storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length).toFixed(1);
  };

  const getUserRating = (storeId: string) => {
    return ratings.find(r => r.storeId === storeId && r.userId === currentUser.id)?.rating || 0;
  };

  const handleSubmitRating = (storeId: string) => {
    const rating = ratingState[storeId];
    if (rating && rating > 0 && rating <= 5) {
      onRating(storeId, rating);
      setRatingState(prev => ({ ...prev, [storeId]: 0 }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Store Ratings</h1>
            <p className="text-sm text-muted-foreground">Welcome, {currentUser.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find & Rate Stores</CardTitle>
            <CardDescription>Search for stores by name or address</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search by store name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.length > 0 ? (
            filteredStores.map(store => (
              <Card key={store.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{store.name}</CardTitle>
                  <CardDescription className="truncate">{store.address}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Rating</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-xl font-bold">{getStoreRating(store.id)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Your Rating</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-xl font-bold">{getUserRating(store.id)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Submit Your Rating</p>
                    <div className="flex gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          className="transition-transform hover:scale-110"
                          onMouseEnter={() => setHoverRating(prev => ({ ...prev, [store.id]: star }))}
                          onMouseLeave={() => setHoverRating(prev => ({ ...prev, [store.id]: 0 }))}
                          onClick={() => setRatingState(prev => ({ ...prev, [store.id]: star }))}
                        >
                          <Star
                            className={`h-6 w-6 transition-colors ${
                              star <= (hoverRating[store.id] || ratingState[store.id] || 0)
                                ? 'fill-primary text-primary'
                                : 'text-border'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <Button
                      onClick={() => handleSubmitRating(store.id)}
                      disabled={!ratingState[store.id]}
                      className="w-full"
                      size="sm"
                    >
                      Submit Rating
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No stores found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
