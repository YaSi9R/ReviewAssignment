# Store Rating Web Application

A comprehensive web application for managing store ratings with role-based access control. Users can sign up, browse stores, submit ratings, and manage their accounts. Admins can manage users and stores, while store owners can view their ratings and performance metrics.

## Features

### Authentication & User Management
- User registration with email and password
- Role-based login (Admin, Normal User, Store Owner)
- Secure session management
- Form validation with real-time error messages

### User Dashboards
- **Admin Dashboard**: Manage users and stores, view system statistics
- **Normal User Dashboard**: Search stores, submit/update ratings, view store details
- **Store Owner Dashboard**: View store information, ratings, and performance metrics

### Store Management
- Browse available stores with filtering
- View store ratings and review counts
- Submit 1-5 star ratings
- Update previous ratings

### Data Validation
- Name: 20-60 characters
- Email: Valid email format
- Address: Max 400 characters
- Password: 8-16 characters (requires uppercase letter and special character)
- Ratings: 1-5 scale

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # If cloning from GitHub
   git clone <repository-url>
   cd store-rating-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

### Running the Project

**Development Mode:**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will start at `http://localhost:3000`

**Production Build:**
\`\`\`bash
npm run build
npm start
# or
yarn build
yarn start
\`\`\`

## Demo Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: Admin@1234

### Store Owner Accounts
- **Email**: john@store.com
- **Password**: Owner@1234


### Normal User Accounts
- **Email**: user1@example.com
- **Password**: User@1234

- **Email**: user2@example.com
- **Password**: User@1234

### New User Registration
You can create a new account by clicking "Sign Up" on the login page. Fill in all required fields:
- Name (20-60 characters)
- Email (valid email format)
- Address (max 400 characters)
- Password (8-16 characters, with uppercase letter and special character)

After successful signup, you can immediately log in with your credentials.

## Project Structure

\`\`\`
store-rating-app/
├── app/
│   ├── page.tsx                 # Main app logic and routing
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── login-form.tsx           # Login component
│   ├── signup-form.tsx          # Registration component
│   ├── admin-dashboard.tsx      # Admin interface
│   ├── user-dashboard.tsx       # Normal user interface
│   └── store-owner-dashboard.tsx # Store owner interface
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   ├── store.ts                 # Initial data
│   └── validation.ts            # Form validation functions
└── README.md                    # This file
\`\`\`

## Technologies Used

- **Frontend Framework**: Next.js with React
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **UI Components**: shadcn/ui

## How to Use

### For Normal Users
1. Sign up or log in with your credentials
2. Search for stores by name or address
3. View store ratings and your previous ratings
4. Submit or update ratings (1-5 stars)
5. Log out when finished

### For Store Owners
1. Log in with your store owner credentials
2. View your store information and statistics
3. Check your average rating and total ratings count
4. View recent ratings from users
5. Monitor store performance

### For Admins
1. Log in with admin credentials
2. Manage users: search, view, and add new users
3. Manage stores: view all stores and their ratings
4. View system statistics including total users and stores
5. Access complete user information

## Features Breakdown

### Form Validation
All forms include comprehensive validation:
- Email format checking
- Password strength requirements
- Character length limits
- Real-time error messages

### Rating System
- 1-5 star rating scale
- Update existing ratings
- Track rating history
- View average ratings per store

### Search & Filter
- Search stores by name or address
- Filter users by name and email
- Real-time search results

## Notes

- All data is stored in the browser's React state and will be reset on page reload
- For persistent data storage, integrate with a backend database (Supabase, Firebase, etc.)
- User sessions are maintained during the browser session only

## Future Enhancements

- Backend database integration (Supabase, PostgreSQL)
- Email verification for new accounts
- Password reset functionality
- Store images and detailed descriptions
- User reviews and comments on ratings
- Pagination for large data sets
- Export data functionality for admins

## Support

For issues or questions about the application, please refer to the component files in the `components/` directory for implementation details.

---

**Created with Next.js and Tailwind CSS**
