import React, { useState } from 'react';

const policies = [
  { title: "Password Management Policy", description: "Guidelines for creating, storing, and managing passwords securely." },
  { title: "Data Encryption Policy", description: "Rules on how data should be encrypted to protect sensitive information." },
  { title: "Incident Response Policy", description: "Procedures for responding to security incidents effectively." },
  { title: "Access Control Policy", description: "Defines how access to systems and data is granted and managed." },
  { title: "Network Security Policy", description: "Measures to protect the integrity, confidentiality, and availability of network resources." },
  { title: "Acceptable Use Policy", description: "Rules for proper use of company systems and networks." },
  { title: "Remote Access Policy", description: "Guidelines for securely accessing company resources remotely." },
  { title: "Physical Security Policy", description: "Controls and procedures to protect physical assets and resources." },
  { title: "Mobile Device Policy", description: "Guidelines for securing mobile devices used for company purposes." },
  { title: "Third-Party Access Policy", description: "Regulations governing third-party access to company systems and data." },
  { title: "Email Security Policy", description: "Best practices for using company email to prevent security breaches." },
  { title: "Data Backup Policy", description: "Procedures for regularly backing up important company data." },
  { title: "User Account Management Policy", description: "Standards for creating, maintaining, and deactivating user accounts." },
  { title: "Patch Management Policy", description: "Procedures for applying updates and patches to systems and software." },
  { title: "Anti-Malware Policy", description: "Guidelines for protecting systems from malware threats." },
  { title: "Monitoring and Logging Policy", description: "Defines how monitoring and logging activities are conducted to ensure security." },
  { title: "Vulnerability Management Policy", description: "Procedures for identifying, assessing, and mitigating security vulnerabilities." },
  { title: "Social Media Use Policy", description: "Guidelines for employees using social media in a professional context." },
  { title: "BYOD (Bring Your Own Device) Policy", description: "Rules for employees using their own devices for work purposes." },
  { title: "Cloud Security Policy", description: "Standards for securing data and applications hosted in the cloud." }
];

const PolicyPage = () => {
  const [selectedPolicy, setSelectedPolicy] = useState({ policy: null, index: null });

  const handlePolicyClick = (policy , index) => {
    setSelectedPolicy({policy, index});
  };
  
  

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="bg-darkBlue text-white py-4 shadow">
        <h1 className="text-center text-3xl font-semibold">Learn About Policies</h1>
      </header>
      
      <main className="flex-grow p-8">
        <div  className="max-w-4xl mx-auto bg-black p-6 rounded-lg shadow-md" >
          <h2 className="text-2xl font-bold text-white mb-6">Security Policies</h2>
          <ul className="list-disc pl-5 space-y-6"><br></br>
          
          
            {policies.map((policy, index) => (
              <li 
                key={index} 
                className="text-lg text-white hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                onMouseOver={() => handlePolicyClick(policy , index)}
                onMouseOut={() => handlePolicyClick(policy , null)}
              >
                
                {(selectedPolicy.index === index ? <div className="mt-6 p-4 bg-serenity rounded-lg shadow"><h3 class="fixed ..." className="text-xl font-semibold text-gray-800">{policy.title}</h3>
                    <p class="fixed ..." className="text-gray-700 mt-2">{policy.description}</p></div> :policy.title)}
                
              </li>
            ))}
          </ul>
          
        </div>
      </main>

    
      
      <footer className="bg-darkBlue text-white py-4 shadow">
        <p className="text-center text-sm">© 2024 InfoSec Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PolicyPage;
