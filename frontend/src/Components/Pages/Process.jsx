import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const AdoptionProcessSteps = () => {
  return (
    <div className="container my-4">
      <h3 className="text-center text-primary mb-4">🧭 Adoption Process in India</h3>
      
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. Online Registration</Accordion.Header>
          <Accordion.Body>
            Prospective Adoptive Parents (PAPs) must register on the official portal: 
            <a href="https://cara.nic.in" target="_blank" rel="noopener noreferrer"> cara.nic.in</a>.
            Upload basic details and required documents via the CARINGS system.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>2. Home Study Report (HSR)</Accordion.Header>
          <Accordion.Body>
            A social worker from a Specialised Adoption Agency (SAA) visits your home and prepares a comprehensive home study report assessing your background, motivation, finances, and parenting environment.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>3. Referral of a Child</Accordion.Header>
          <Accordion.Body>
            A legally free child is referred to you via the portal. You can accept or reject the referral within 48 hours after reviewing the child's details, photograph, and health reports.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>4. Child Acceptance</Accordion.Header>
          <Accordion.Body>
            Once accepted, you must give formal consent and sign the Child Study Report (CSR) and Medical Examination Report (MER) to proceed.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>5. Pre-Adoption Foster Care</Accordion.Header>
          <Accordion.Body>
            You take the child into temporary foster care by signing a foster care affidavit with the adoption agency while awaiting the court process.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>6. Legal Procedure</Accordion.Header>
          <Accordion.Body>
            The adoption agency files a petition in court on your behalf. The judge reviews and issues the final adoption order. This may take 2–4 months depending on the region.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>7. Post-Adoption Follow-Up</Accordion.Header>
          <Accordion.Body>
            For 2 years, quarterly home visits are conducted by the SAA to monitor the child’s adjustment and well-being.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <hr className="my-5" />

      <h4 className="text-primary">📝 Required Documents</h4>
      <ul>
        <li>Proof of identity (Aadhar, PAN)</li>
        <li>Proof of income (Salary slip/ITR)</li>
        <li>Marriage certificate (if married)</li>
        <li>Health certificate</li>
        <li>Spouse's consent (if applicable)</li>
        <li>Photographs</li>
      </ul>

      <h4 className="text-primary mt-4">⚖️ Eligibility Criteria</h4>
      <ul>
        <li>Stable marital/family life</li>
        <li>Physical, mental, and financial fitness</li>
        <li>Age limit (combined age):</li>
        <ul>
          <li>≤ 90 yrs for children under 4</li>
          <li>≤ 100 yrs for children 4–8</li>
          <li>≤ 110 yrs for children 8+</li>
        </ul>
      </ul>

      <h5 className="text-muted mt-4">👥 Key Agencies</h5>
      <ul>
        <li><strong>CARA</strong>: Central Adoption Resource Authority</li>
        <li><strong>SAA</strong>: Specialised Adoption Agency</li>
        <li><strong>DCPU</strong>: District Child Protection Unit</li>
      </ul>
    </div>
  );
};

export default AdoptionProcessSteps;
