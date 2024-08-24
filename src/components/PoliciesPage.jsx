import React from 'react';

const policies = [
  "1. Password Management Policy",
  "2. Data Encryption Policy",
  "3. Incident Response Policy",
  "4. Access Control Policy",
  "5. Network Security Policy",
  "6. Acceptable Use Policy",
  "7. Remote Access Policy",
  "8. Physical Security Policy",
  "9. Mobile Device Policy",
  "10. Third-Party Access Policy",
  "11. Email Security Policy",
  "12. Data Backup Policy",
  "13. User Account Management Policy",
  "14. Patch Management Policy",
  "15. Anti-Malware Policy",
  "16. Monitoring and Logging Policy",
  "17. Vulnerability Management Policy",
  "18. Social Media Use Policy",
  "19. BYOD (Bring Your Own Device) Policy",
  "20. Cloud Security Policy"
];

const PolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow p-8">
        <h2 className="text-2xl font-bold mb-6">Security Policies</h2>
        <ul className="list-disc pl-5 space-y-2">
          {policies.map(policy => (
            <li key={policy} className="text-lg">{policy}</li>
          ))}
        </ul>
      </main>
      
    </div>
  );
};

export default PolicyPage;
