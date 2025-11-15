'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateName, validateEmail, validateAddress, validatePassword } from '@/lib/validation';
import { User } from '@/lib/types';

interface SignupFormProps {
  onSignup: (user: User) => void;
  onToggleLogin: () => void;
}

export function SignupForm({ onSignup, onToggleLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const addressError = validateAddress(formData.address);
    const passwordError = validatePassword(formData.password);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (addressError) newErrors.address = addressError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      address: formData.address,
      password: formData.password,
      role: 'user',
      createdAt: new Date(),
    };

    onSignup(newUser);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">Join our rating platform as a normal user</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                name="name"
                placeholder="Min 20 characters, max 60"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                name="address"
                placeholder="Max 400 characters"
                value={formData.address}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.address && <p className="text-destructive text-sm">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="8-16 chars, 1 uppercase, 1 special char"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
            <p className="font-semibold text-foreground mb-2">Password Requirements:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 text-xs">
              <li>8-16 characters long</li>
              <li>At least one uppercase letter</li>
              <li>At least one special character (!@#$%)</li>
            </ul>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button 
              onClick={onToggleLogin}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Sign in here
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
