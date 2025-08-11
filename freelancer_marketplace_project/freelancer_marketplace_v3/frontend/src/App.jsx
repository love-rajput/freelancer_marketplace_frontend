import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ClientDashboard from "./pages/Dashboard/ClientDashboard";
import UserProfile from "./pages/UserProfile";
import FreelancerDashboard from "./pages/Dashboard/FreelancerDashboard";
import GigsCreation from "./pages/GigsCreation";
import Sucesss from "./pages/Sucess";
import CancelPayment from "./pages/CancelPayment";
import PaymentProcessing from "./pages/PaymentProcessing";
import ClientOrders from "./pages/ClientOrders.jsx";
import FreelancerOrders from "./pages/FreelancerOrders";
import GlobalChatWidget from "./components/GlobalChatWidget";

// Auth
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";
import FreelancerChat from "./components/FreelancerChat.jsx";
import EmailVerification from "./pages/EmailVerification";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/creategigs" element={<GigsCreation />} />
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route
            path="/freelancerdashboard"
            element={<FreelancerDashboard />}
          />
          <Route path="/success" element={<Sucesss />} />
          <Route path="/cancelpayment" element={<CancelPayment />} />
          <Route path="/paymentprocessing" element={<PaymentProcessing />} />
          <Route path="/clientorders" element={<ClientOrders />} />
          <Route path="/freelancerorders" element={<FreelancerOrders />} />
          <Route path="/verify-email" element={<EmailVerification />} />

          {/* Add other routes as needed */}
        </Routes>

        {/* Global Chat Widgets */}
        {user?.role === "client" && <GlobalChatWidget />}
        {user?.role === "freelancer" && <FreelancerChat />}
      </Router>
    </div>
  );
}

export default App;
