# Gigly - Freelance Platform Frontend

A modern, responsive frontend for a freelance marketplace platform built with React.js, Vite, and Tailwind CSS. This application provides a complete user interface for clients and freelancers to connect, manage gigs, process orders, and communicate in real-time.

## 🚀 Features

- **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- **User Authentication** - Registration, login, email verification with OTP
- **Role-Based Interface** - Separate dashboards for clients and freelancers
- **Gig Management** - Browse, create, edit, and manage gigs
- **Order Processing** - Complete order lifecycle with status tracking
- **Real-time Chat** - Socket.io powered messaging system
- **Payment Integration** - Stripe checkout and payment processing
- **File Upload** - Drag & drop file uploads with preview
- **Responsive Design** - Mobile-first approach, works on all devices
- **Search & Filter** - Advanced search and filtering capabilities
- **Rating & Reviews** - Feedback system for completed orders

## 🛠️ Tech Stack

- **Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + Shadcn/ui
- **State Management**: React Context + useState/useEffect
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Real-time Communication**: Socket.io Client
- **Payment Processing**: Stripe.js
- **Animations**: Lottie React (DotLottieReact)
- **Icons**: Lucide React
- **Form Handling**: Custom form components
- **File Upload**: React Dropzone

## 📁 Project Structure

```
Frontend/
├── public/                   # Static assets
│   ├── Hero_Background.mp4      # Hero section video
│   ├── login_reg_background.jpg # Auth modal background
│   └── default-avatar.jpg       # Default user avatar
├── src/
│   ├── components/           # Reusable components
│   │   ├── ui/                  # Shadcn/ui components
│   │   ├── Navbar.jsx           # Navigation component
│   │   ├── Hero.jsx             # Landing page hero
│   │   ├── Services.jsx         # Services showcase
│   │   ├── ContactUs.jsx        # Contact form
│   │   ├── Footer.jsx           # Footer component
│   │   ├── Login.jsx            # Login form
│   │   ├── Register.jsx         # Registration form
│   │   ├── RegLogModel.jsx      # Auth modal
│   │   ├── GigsDetailModal.jsx  # Gig details modal
│   │   ├── OtherFreelancersGigs.jsx # Gig listings
│   │   ├── GlobalChatWidget.jsx # Client chat interface
│   │   ├── FreelancerChat.jsx   # Freelancer chat interface
│   │   └── ...                  # Other components
│   ├── pages/                # Page components
│   │   ├── LandingPage.jsx      # Home page
│   │   ├── UserProfile.jsx      # User profile page
│   │   ├── GigsCreation.jsx     # Create/edit gigs
│   │   └── Dashboard/           # Dashboard pages
│   │       ├── ClientDashboard.jsx
│   │       ├── FreelancerDashboard.jsx
│   │       
│   ├── utils/                # Utility functions
│   │   └── api.js               # API configuration
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
├── package.json              # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── postcss.config.js        # PostCSS configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see Backend README)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # API Configuration
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000

   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

   # App Configuration
   VITE_APP_NAME=Gigly
   VITE_APP_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:5173`
