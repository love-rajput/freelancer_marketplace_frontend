import React from "react";

const team = [
  {
    name: "Jay Thakor",
    role: "Founder & CEO",
    desc: "Passionate about connecting talent with opportunity.",
    img: "Jay_PIc.jpg",
  },
  {
    name: "Ankita Shukla",
    role: "Lead Designer",
    desc: "Designing seamless experiences for all users.",
    img: "Ankita.png",
  },
  {
    name: "Himanshi Singh",
    role: "Full Stack Developer",
    desc: "Building scalable and robust platforms.",
    img: "Himanshi.png",
  },
  {
    name: "Sakshi Sharma",
    role: "Marketing Head",
    desc: "Spreading the word and growing our community.",
    img: "Shakshi.png",
  },
];

const Aboutus = () => {
  return (
    <div className=" p-6">
      <div className="relative rounded-2xl w-full flex flex-col items-center overflow-hidden min-h-screen bg-gradient-to-b from-green-100 via-white to-white">
        <div className="w-full flex flex-col items-center z-10 mt-16">
          <h1 className="text-green-700 text-4xl md:text-6xl font-bold drop-shadow-lg text-center mb-4">
            About <span className="text-green-500">Gigly</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-2xl text-center max-w-2xl mb-8 drop-shadow">
            Gigly is dedicated to connecting talented freelancers with clients
            worldwide. Our mission is to empower creativity, innovation, and
            growth for everyone.
          </p>
        </div>
        <div className="w-full flex flex-col items-center z-20">
          <h2 className="text-green-500 text-2xl md:text-4xl font-semibold mb-6 mt-12">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center w-64 hover:scale-105 transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-green-500"
                />
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {member.name}
                </h3>
                <p className="text-green-500 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-center">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
