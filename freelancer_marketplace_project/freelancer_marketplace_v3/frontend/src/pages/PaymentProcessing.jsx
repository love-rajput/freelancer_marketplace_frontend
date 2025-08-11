import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../utils/api";

const PaymentProcessing = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Processing");
  const navigate = useNavigate();
  const hasOrdered = useRef(false);

  useEffect(() => {
    async function handleOrder() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await API.post("/orders/create-order", {
          userId: user.id,
          stripeSessionId: sessionId,
          gigId: localStorage.getItem("gigId"),
          freelancerId: localStorage.getItem("freelancerId"),
          price: localStorage.getItem("price"),
          gigTitle: localStorage.getItem("gigTitle"),
          freelancerName: localStorage.getItem("freelancerName"),
        });

        if (res.status === 201) {
          setStatus("success");
        } else {
          setStatus("failure");
        }
      } catch (error) {
        setStatus("failure");
        console.error("Error processing order:", error);
      }
    }

    if (sessionId && !hasOrdered.current) {
      hasOrdered.current = true;
      handleOrder();
    } else if (!sessionId) {
      setStatus("failure");
    }
  }, [sessionId]);
  useEffect(() => {
    if (status === "success") {
      navigate("/success");
    }
    if (status == "failure") {
      navigate("/cancelpayment");
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex flex-col items-center justify-center rounded-2xl max-h-screen bg-gray-100">
          <h2 className="text-center text-2xl font-bold mt-10">
            Processing Payment...
          </h2>
          <p className="text-gray-600 mt-4">
            Please wait while we process your payment.
          </p>
          <section className=" py-20 dark:bg-dark">
            <div className="container">
              <div className="flex flex-wrap items-center gap-4">
                <button className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white">
                  <span>
                    <svg
                      className="animate-spin"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.5"
                        cx="10"
                        cy="10"
                        r="9"
                        stroke="white"
                        stroke-width="2"
                      />
                      <mask id="path-2-inside-1_2527_20936" fill="white">
                        <path d="M18.4713 13.0345C18.9921 13.221 19.5707 12.9508 19.7043 12.414C20.0052 11.2042 20.078 9.94582 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6285 0.597723 12.4262 0.219019 11.1884 0.0708647C10.6392 0.00512742 10.1811 0.450137 10.1706 1.00319C10.1601 1.55625 10.6018 2.00666 11.1492 2.08616C12.0689 2.21971 12.9609 2.51295 13.7841 2.95511C14.9023 3.55575 15.8615 4.41394 16.5823 5.45872C17.3031 6.50351 17.7649 7.70487 17.9294 8.96348C18.0505 9.89002 18.008 10.828 17.8063 11.7352C17.6863 12.2751 17.9506 12.848 18.4713 13.0345Z" />
                      </mask>
                      <path
                        d="M18.4713 13.0345C18.9921 13.221 19.5707 12.9508 19.7043 12.414C20.0052 11.2042 20.078 9.94582 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6285 0.597723 12.4262 0.219019 11.1884 0.0708647C10.6392 0.00512742 10.1811 0.450137 10.1706 1.00319C10.1601 1.55625 10.6018 2.00666 11.1492 2.08616C12.0689 2.21971 12.9609 2.51295 13.7841 2.95511C14.9023 3.55575 15.8615 4.41394 16.5823 5.45872C17.3031 6.50351 17.7649 7.70487 17.9294 8.96348C18.0505 9.89002 18.008 10.828 17.8063 11.7352C17.6863 12.2751 17.9506 12.848 18.4713 13.0345Z"
                        stroke="white"
                        stroke-width="4"
                        mask="url(#path-2-inside-1_2527_20936)"
                      />
                    </svg>
                  </span>
                  Processing...
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
