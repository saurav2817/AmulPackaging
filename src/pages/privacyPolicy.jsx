import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { getSEOConfig } from "../config/seoConfig";
import {
  IoHomeOutline,
  IoChevronForward,
  IoStar,
  IoListCircle,
  IoCheckmarkCircle,
  IoApps,
  IoArrowBack,
  IoClose,
  IoChevronBack,
  IoChevronForward as IoChevronForwardIcon,
} from "react-icons/io5";

const PrivacyPolicy = () => {
  const seoConfig = getSEOConfig('privacy');
  
  return (
    <>
      <SEO {...seoConfig} />
      <main className="">
        <section className="text-center py-14 bg-gray-200 bg-center">
          <h1 className="text-3xl font-bold text-blue-900 ">Privacy Policy</h1>
          <div className="flex justify-center mt-3">
            <nav aria-label="Breadcrumb" className="">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                  <IoHomeOutline />
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </span>

                <IoChevronForward className="opacity-60" />
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1f4fb] text-[var(--primary-color)] font-medium">
                  Privacy Policy
                </span>
              </div>
            </nav>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-12 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              1. Introduction
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                Welcome to Amul Packaging. We are committed to protecting your
                personal information and your right to privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website
                amulpackaging.futurefacetech.in (the “Site”), use our services,
                or interact with us in other ways.
              </p>
              <p className="text-gray-600">
                By accessing or using our Site or services, you consent to the
                practices described herein. If you disagree with any part of
                this policy, please do not use our Site or services.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              2. Information We Collect
            </h2>
            <div className="px-4 py-2">
              <p className="text-pink-500 font-medium">
                We may collect and process the following kinds of personal data
                about you:
              </p>
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  Personal identification information: name, email address,
                  postal address, phone number, company name, designation, etc.
                </li>
                <li>
                  Usage data: information about how you use our website (pages
                  visited, URLs, time spent, clicks, referring/exit pages,
                  device/browser type, IP address, etc.).
                </li>
                <li>
                  Cookies and tracking technologies: we may use cookies, web
                  beacons, logs, and similar technologies to collect information
                  and enhance your experience.
                </li>
              </ul>
            </div>
            <div className="px-4 py-2">
              <p className="text-pink-500 font-medium">
                We collect this information:
              </p>
              <ul className="text-gray-600 px-4 list-decimal">
                <li>
                  Directly from you (when you fill forms, contact us, subscribe,
                  request services)
                </li>
                <li>
                  Automatically, via your use of our Site (through cookies,
                  analytics)
                </li>
                <li>
                  From third parties (e.g. analytics providers, advertising
                  networks, public sources)
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              3. Use of Your Information
            </h2>
            <div className="px-4 py-2">
              <p className="text-pink-500 font-medium">
                We use the collected information for purposes including, but not
                limited to:
              </p>
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  To provide, operate, and maintain our services and website
                </li>
                <li>
                  To manage accounts, respond to inquiries, and communicate with
                  you
                </li>
                <li>
                  To process transactions, send invoices, and fulfill service
                  requests
                </li>
                <li>
                  To improve and personalize our services, content, and user
                  experience
                </li>
                <li>To analyze usage, trends, and site performance</li>
                <li>
                  To comply with legal obligations, enforce our policies, or
                  protect our rights
                </li>
                <li>
                  To send marketing or promotional materials (where permitted
                  and with your consent)
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              4. Disclosure of Your Information
            </h2>
            <div className="px-4 py-2">
              <p className="text-pink-500 font-medium">
                We may share your personal data:
              </p>
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  With service providers, vendors, contractors, or agents who
                  perform functions on our behalf (e.g. IT/hosting providers,
                  payment processors)
                </li>
                <li>
                  With affiliates or business partners, for purposes consistent
                  with this policy
                </li>
                <li>
                  If required by law, legal process, or governmental authorities
                </li>
                <li>
                  To enforce our terms, protect rights, property, safety, or the
                  rights of others
                </li>
                <li>
                  In connection with a merger, acquisition, reorganization, or
                  sale of assets
                </li>
              </ul>
              <p className="text-gray-600 font-medium mt-2">
                We will not sell your personal data to third parties for their
                independent use.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              5. Cookies & Tracking Technologies
            </h2>
            <div className="px-4 py-2">
              <p className="text-pink-500 font-medium">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="text-gray-600 px-4 list-disc">
                <li>Remember your preferences</li>
                <li>Improve site usability</li>
                <li>Analyze site traffic and performance</li>
                <li>Deliver targeted advertising (if applicable)</li>
              </ul>
              <p className="text-gray-600 font-medium mt-2">
                You can opt out or manage cookies via your browser settings.
                However, disabling some cookies may affect your ability to use
                certain features of our Site.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              6. Data Retention
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                We retain your personal data only as long as necessary for the
                purposes laid out in this policy, or as required by law. When no
                longer needed, we securely delete or anonymize your data.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              7. Security of Your Information
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                We implement administrative, technical, and physical safeguards
                to protect your personal data from unauthorized access, misuse,
                alteration, or destruction. However, no method of transmission
                over the Internet or electronic storage is 100% secure — we
                cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              8. Your Rights
            </h2>
            <div className="px-4 py-2">
              <p className="text-pink-500 font-medium">
                Depending on your jurisdiction, you may have rights such as:
              </p>
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  To access, correct, update, or delete your personal data
                </li>
                <li>To restrict or object to processing of your data</li>
                <li>
                  To withdraw consent (for processing that relies on consent)
                </li>
                <li>To receive a copy of your data in a portable format</li>
                <li>To lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="text-gray-600 font-medium mt-2">
                To exercise any of these rights, please contact us using the
                contact information below.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              9. Children’s Privacy
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                Our Site and services are not directed to individuals under 18
                years. We do not knowingly collect or maintain personal data
                from minors. If you believe we have collected information from a
                child, please contact us and we will delete it.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              10. Third-Party Links
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                Our Site may include links to third-party websites, services, or
                content. We are not responsible for the privacy practices or
                content of those external sites. We encourage you to review
                their privacy policies before interacting with them.
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              11. Changes to This Policy
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                We reserve the right to update or modify this Privacy Policy at
                any time. When we make changes, we will post the revised policy
                on this page with a revised “Last updated” date. Your continued
                use of our Site and services after changes indicate your
                acceptance.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 mb-12 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              12. Contact Us
            </h2>
            <div className="px-4 py-2">
              <p className="text-pink-500 font-medium">
                If you have any questions, requests, or concerns about this
                Privacy Policy, you may contact:
              </p>
              <ul>
                <li className="text-gray-600">
                  <b className="text-blue-900">Address :</b> 2, Pramod Prasad Building, Plot No.232. Next to Brij Albela, Wadala (W), Mumbai 400 031.
                </li>
                <li className="text-gray-600">
                  <b className="text-blue-900">Email :</b>{" "}
                  Sales@amulpackaging.in
                </li>
                <li className="text-gray-600">
                  <b className="text-blue-900">Phone :</b>+91 9004382696
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default PrivacyPolicy;
