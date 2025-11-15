'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  // Redirect to home where login is handled
  router.replace('/');

  return null;
}
