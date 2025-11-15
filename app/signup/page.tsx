'use client';

import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  // Redirect to home where signup is handled
  router.replace('/');

  return null;
}
