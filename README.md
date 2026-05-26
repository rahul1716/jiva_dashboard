# Jiva Health User Management Dashboard

A modern, professional React + TypeScript admin dashboard for healthcare user management, built with Vite, Tailwind CSS, and React Router.

## 🌟 Features

- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional healthcare theme with Tailwind CSS
- **Multiple Pages**: Dashboard, User Management, User Details, Orders, Payments, Family Members
- **Sidebar Navigation**: Fixed sidebar with active menu highlighting
- **Top Navbar**: Search bar, notifications, settings, and user profile
- **Data Tables**: Interactive user table with sorting and filtering
- **Statistics Cards**: Dashboard statistics with icons and values
- **Tabs System**: Multi-tab content sections for detailed views
- **Clean Components**: Reusable, modular React components
- **Mock Data**: Realistic healthcare-related sample data

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **React Router DOM 7** - Client-side routing
- **Lucide React** - Beautiful icons
- **Mock Data** - Realistic sample data

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.tsx      # Top navigation bar
│   ├── Sidebar.tsx     # Left sidebar navigation
│   ├── StatCard.tsx    # Statistics card component
│   └── UserTable.tsx   # User data table
├── pages/              # Page components
│   ├── Dashboard.tsx   # User Management dashboard
│   ├── UserDetail.tsx  # Individual user detail page
│   ├── OrderDetail.tsx # Order details page
│   ├── PaymentHistory.tsx # Payment history page
│   ├── FamilyMembers.tsx # Family members management
│   ├── Department.tsx  # Department page (placeholder)
│   ├── Consultations.tsx # Consultations page (placeholder)
│   └── Placeholder.tsx # Generic placeholder page
├── layouts/            # Layout components
│   └── MainLayout.tsx  # Main layout with sidebar and navbar
├── routes/             # Routing configuration
│   └── index.tsx       # Route definitions
├── data/               # Mock data
│   └── mockData.ts     # Sample data for all pages
├── assets/             # Static assets
├── App.tsx             # Main App component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd jiva-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build

# Preview the production build
npm run preview
```

## 📄 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | User Management dashboard with statistics and user table |
| `/users` | User Management | Main user management page (same as dashboard) |
| `/users/:id` | User Detail | Detailed view of a specific user with tabs |
| `/orders` | Order Detail | Order information and delivery timeline |
| `/payments` | Payment History | Payment transactions and history |
| `/family` | Family Members | Family member management and cards |
| `/department` | Department | Department management (coming soon) |
| `/consultations` | Consultations | Medical consultations (coming soon) |
| `/lab-tests` | Lab Tests | Lab test booking (coming soon) |
| `/medicine-orders` | Medicine | Medicine orders management (coming soon) |
| `/ambulance` | Ambulance | Ambulance booking (coming soon) |
| `/reports` | Reports | Reports and history (coming soon) |
| `/access` | Access | User access management (coming soon) |
| `/settings` | Settings | Application settings (coming soon) |

## 🎨 Design Features

### Color Scheme
- **Primary**: Green (#16a34a)
- **Background**: Light gray (#f8fafc)
- **Borders**: Gray (#e2e8f0)
- **Text**: Dark gray (#1f2937)

### Components Included
- **Stat Cards**: Display key metrics with icons
- **Data Table**: Responsive table with user information and actions
- **User Cards**: Profile cards with avatars and relationship info
- **Tab Navigation**: Multi-tab content switching
- **Status Badges**: Color-coded status indicators
- **Search & Filter**: Search functionality and dropdown filters
- **Forms**: Input fields for adding/editing data
- **Buttons**: Primary and secondary action buttons
- **Icons**: Lucide React icons throughout

## 📊 Mock Data

The dashboard includes comprehensive mock data for:
- **Users**: 5 sample users with various statuses
- **Dashboard Stats**: 4 key statistics (Total Users, Prime Users, etc.)
- **Orders**: 3 sample orders with delivery status
- **Payments**: 4 payment transactions with different statuses
- **Family Members**: 4 family members with relationships
- **Sidebar Menu**: 10 menu items with appropriate icons

All data is located in `src/data/mockData.ts` and can be easily replaced with API calls.

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route to `src/routes/index.tsx`
3. Add menu item to `src/data/mockData.ts` (if needed)

### Styling
- All components use Tailwind CSS utility classes
- Global styles in `src/index.css` and `src/App.css`
- Consistent spacing and color scheme throughout

### Icons
All icons from Lucide React. Update icon imports in component files to change icons.

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop** (1024px+): Fixed sidebar + full content
- **Tablet** (768px - 1023px): Collapsible sidebar option
- **Mobile** (< 768px): Hamburger menu with drawer

## 🎯 Features & Functionality

### Dashboard/User Management
- Statistics cards showing key metrics
- Searchable and filterable user table
- User action buttons (View, Edit, Delete)
- Prime member badges
- Status indicators

### User Detail Page
- User profile card with avatar
- Statistics cards (orders, bookings, family, spending)
- Tab navigation for different content sections
- Personal information display
- Address information
- Premium membership section

### Family Members
- Grid-based family member cards
- Relationship badges with color coding
- Age and blood group display
- Contact information
- Edit and delete functionality
- Add new member form

### Payment History
- Payment transaction table
- Status filtering
- Summary statistics
- Export functionality
- Payment method display

### Order Details
- Order item display with images
- Delivery status badges
- Order summary with totals
- Delivery timeline with step indicators
- Action buttons (Download Invoice, Track Order)

## 🛡️ Best Practices

- **Component Organization**: Logical folder structure
- **Reusable Components**: DRY principle applied
- **Type Safety**: Full TypeScript typing
- **Responsive**: Mobile-first design approach
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized rendering and lazy loading ready

## 📚 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🚀 Deployment

The dashboard can be deployed to any static hosting service:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the dist folder
- **GitHub Pages**: Configure GitHub Actions
- **AWS S3**: Upload dist folder to S3

## 📝 Notes

- Mock data is included for demonstration purposes
- Replace `mockData.ts` with API calls for production
- Update placeholder images with real image URLs
- Configure authentication and API endpoints
- Add error handling for API calls

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

For questions or contributions, please refer to the project structure and coding conventions used throughout the codebase.

---

**Built with ❤️ for Jiva Health**
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
