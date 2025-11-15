export interface ValidationError {
  field: string;
  message: string;
}

export const validateName = (name: string): string | null => {
  if (!name || name.length < 20 || name.length > 60) {
    return 'Name must be between 20 and 60 characters';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validateAddress = (address: string): string | null => {
  if (!address || address.length > 400) {
    return 'Address must not exceed 400 characters';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 8 || password.length > 16) {
    return 'Password must be between 8 and 16 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }
  return null;
};

export const validateRating = (rating: number): string | null => {
  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return 'Rating must be between 1 and 5';
  }
  return null;
};
