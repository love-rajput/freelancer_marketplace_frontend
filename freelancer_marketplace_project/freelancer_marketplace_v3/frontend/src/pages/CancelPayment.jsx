import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";

const CancelPayment = () => {
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger animation on mount
    const timer = setTimeout(() => setShowSuccessCard(true), 4000);
    return () => clearTimeout(timer);
  }, []);
  const handleGotoHome = () => {
    // after 4 seconds, navigate to home page
    const user = JSON.parse(localStorage.getItem("user"));
    setTimeout(() => {
      if (user.role === "freelancer")
        window.location.href = "/freelancerdashboard";
      else if (user.role === "client") {
        window.location.href = "/clientdashboard";
      }
    }, 4000);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-center text-2xl font-bold mt-10"></h2>
        {!showSuccessCard ? (
          <StyledWrapper animate={animate}>
            <div className={`container${animate ? " animated" : ""} `}>
              <div className="left-side">
                <div className="card">
                  <div className="card-line" />
                  <div className="buttons" />
                </div>
                <div className="post">
                  <div className="post-line" />
                  <div className="screen">
                    <div className="icon">!</div>
                  </div>
                  <div className="numbers" />
                  <div className="numbers-line2" />
                </div>
              </div>
              <div className="right-side">
                <div className="new">Something went wrong!</div>
                <svg
                  className="arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width={512}
                  height={512}
                  viewBox="0 0 451.846 451.847"
                >
                  <path
                    d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
                    className="active-path"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </div>
          </StyledWrapper>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full animate-fade-in">
            <h1 className="text-2xl font-bold text-center mb-4">
              Payment Cancelled
            </h1>
            <p className="text-gray-700 text-center mb-6">
              Your payment has been cancelled.
              <br />
              Please try again later.
            </p>
            <button
              onClick={() => handleGotoHome()}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const StyledWrapper = styled.div`
  .container {
    background-color: #fff7e6;
    display: flex;
    width: 250px;
    height: 75px;
    position: relative;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .container:hover {
    transform: scale(1.03);
    width: 150px;
  }

  .container:hover .left-side {
    width: 100%;
  }

  .left-side {
    background: linear-gradient(135deg, #ff8c00, #ff4d4d);
    width: 85px;
    height: 75px;
    border-radius: 4px 0 0 4px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
    flex-shrink: 0;
    overflow: hidden;
  }

  .right-side {
    width: calc(100% - 85px);
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    justify-content: space-between;
    white-space: nowrap;
    transition: 0.3s;
  }

  .right-side:hover {
    background-color: #ffecd1;
  }

  .arrow {
    width: 14px;
    height: 14px;
    margin-right: 12px;
  }

  .new {
    font-size: 15px;
    font-family: "Inter", sans-serif;
    margin-left: 12px;
    color: #333;
  }

  .card {
    width: 48px;
    height: 30px;
    background-color: #ffb366;
    border-radius: 4px;
    position: absolute;
    display: flex;
    z-index: 10;
    flex-direction: column;
    align-items: center;
    box-shadow: 5px 5px 5px -2px rgba(255, 77, 77, 0.4);
  }

  .card-line {
    width: 42px;
    height: 8px;
    background-color: #ffcc99;
    border-radius: 1px;
    margin-top: 4px;
  }

  @media only screen and (max-width: 480px) {
    .container {
      transform: scale(0.6);
    }

    .container:hover {
      transform: scale(0.63);
    }

    .new {
      font-size: 13px;
    }
  }

  .buttons {
    width: 5px;
    height: 5px;
    background-color: #cc4b00;
    box-shadow: 0 -6px 0 0 #992d00, 0 6px 0 0 #ff6a1a;
    border-radius: 50%;
    margin-top: 3px;
    transform: rotate(90deg);
    margin: 6px 0 0 -18px;
  }

  .container.animated .card {
    animation: slide-top 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
  }
  .container.animated .post {
    animation: slide-post 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
  }
  .container.animated .icon {
    animation: fade-in-fwd 0.3s 0.7s backwards;
  }

  @keyframes slide-top {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-45px) rotate(90deg);
    }
    60% {
      transform: translateY(-45px) rotate(90deg);
    }
    100% {
      transform: translateY(-5px) rotate(90deg);
    }
  }

  .post {
    width: 42px;
    height: 50px;
    background-color: #f5f5f5;
    position: absolute;
    z-index: 11;
    bottom: 6px;
    top: 75px;
    border-radius: 4px;
    overflow: hidden;
  }

  .post-line {
    width: 32px;
    height: 5px;
    background-color: #666;
    position: absolute;
    border-radius: 0 0 2px 2px;
    right: 5px;
    top: 5px;
  }

  .post-line:before {
    content: "";
    position: absolute;
    width: 32px;
    height: 5px;
    background-color: #888;
    top: -5px;
  }

  .screen {
    width: 32px;
    height: 15px;
    background-color: #ffffff;
    position: absolute;
    top: 14px;
    right: 5px;
    border-radius: 2px;
  }

  .numbers {
    width: 7px;
    height: 7px;
    background-color: #999;
    box-shadow: 0 -11px 0 0 #999, 0 11px 0 0 #999;
    border-radius: 1px;
    position: absolute;
    transform: rotate(90deg);
    left: 17px;
    top: 34px;
  }

  .numbers-line2 {
    width: 7px;
    height: 7px;
    background-color: #bbb;
    box-shadow: 0 -11px 0 0 #bbb, 0 11px 0 0 #bbb;
    border-radius: 1px;
    position: absolute;
    transform: rotate(90deg);
    left: 17px;
    top: 45px;
  }

  @keyframes slide-post {
    50% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-45px);
    }
  }

  .icon {
    position: absolute;
    font-size: 11px;
    font-family: "Inter", sans-serif;
    width: 100%;
    left: 0;
    top: 0;
    color: #d32f2f;
    text-align: center;
  }

  .container:hover .icon {
    animation: fade-in-fwd 0.3s 0.7s backwards;
  }

  @keyframes fade-in-fwd {
    0% {
      opacity: 0;
      transform: translateY(-3px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
export default CancelPayment;
