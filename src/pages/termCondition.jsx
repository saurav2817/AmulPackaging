import React from "react";
import {  Link } from "react-router-dom";
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

const TermCondition = () => {
  const seoConfig = getSEOConfig('terms');
  
  return (
    <>
      <SEO {...seoConfig} />
      <main className="">
        <section className="text-center py-14 bg-gray-200 bg-center">
          <h1 className="text-3xl font-bold text-blue-900 ">
            Term & Condition
          </h1>
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
                  Term & Condition
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
                Welcome to Amul Packaging. By accessing or using our website
                amulpackaging.futurefacetech.in (“Site”), products, or services,
                you agree to comply with and be bound by these Terms &
                Conditions (“Terms”). Please read them carefully before using
                our Site or services.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              2. Acceptance of Terms
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                By visiting our Site or using our services, you agree to these
                Terms, as well as our Privacy Policy. If you do not agree,
                please discontinue use of our Site and services.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              3. Eligibility
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                You must be at least 18 years of age (or the legal age in your
                jurisdiction) to use our Site and services. By using the Site,
                you confirm that you meet this requirement.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              4. Use of Website
            </h2>
            <div className="px-4 py-2">
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  You agree to use this Site only for lawful purposes and in
                  accordance with applicable laws.
                </li>
                <li>
                  You must not:
                  <ul className="text-gray-600 px-4 list-disc">
                    <li>
                      Engage in fraudulent, harmful, or unlawful activity.
                    </li>
                    <li>
                      Attempt to gain unauthorized access to our systems or
                      data.
                    </li>
                    <li>
                      Upload or distribute viruses, malware, or harmful code.
                    </li>
                    <li>
                      Copy, reproduce, or misuse content without our written
                      permission.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              5. Products & Services
            </h2>
            <div className="px-4 py-2">
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  All descriptions, images, and details of products or services
                  on this Site are for informational purposes only.
                </li>
                <li>
                  We reserve the right to modify, update, or discontinue any
                  product, service, or feature without prior notice.
                </li>
                <li>
                  Prices, availability, and specifications are subject to
                  change.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              6. Intellectual Property
            </h2>
            <div className="px-4 py-2">
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  All content on this Site (including text, images, graphics,
                  logos, designs, packaging concepts, trademarks, and other
                  materials) is the property of Amul Packaging or its licensors.
                </li>
                <li>
                  You may not use, copy, reproduce, distribute, or modify any
                  content without prior written consent.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              7. Limitation of Liability
            </h2>
            <div className="px-4 py-2">
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  We strive to ensure accuracy of information but make no
                  guarantees regarding completeness, reliability, or error-free
                  content.
                </li>
                <li>
                  We are not liable for:
                  <ul className="text-gray-600 px-4 list-disc">
                    <li>
                      Any direct, indirect, incidental, or consequential damages
                      arising from use of our Site or services.
                    </li>
                    <li>Downtime, errors, or interruptions in access.</li>
                    <li>External third-party links or content.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              8. User Accounts (if applicable)
            </h2>
            <div className="px-4 py-2">
              <ul className="text-gray-600 px-4 list-disc">
                <li>
                  You are responsible for maintaining confidentiality of your
                  login credentials.
                </li>
                <li>Any activity under your account is your responsibility.</li>
                <li>
                  We reserve the right to suspend or terminate accounts that
                  violate these Terms.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              9. Third-Party Links
            </h2>
            <div className="px-4 py-2">
              <p lassName="text-gray-600 font-medium mt-2">
                Our Site may include links to third-party websites. We are not
                responsible for their content, services, or privacy practices.
                Accessing them is at your own risk.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              10. Indemnification
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                You agree to indemnify and hold harmless Amul Packaging, its
                affiliates, officers, employees, and partners from any claims,
                liabilities, damages, or expenses (including legal fees) arising
                from your violation of these Terms or misuse of our
                Site/services.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              11. Termination
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                We may suspend or terminate your access to the Site at our
                discretion, without notice, if you violate these Terms or engage
                in unlawful activity.
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              12. Governing Law & Jurisdiction
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                These Terms are governed by the laws of India. Any disputes
                arising shall be subject to the exclusive jurisdiction of the
                courts in [Insert City, e.g., Ahmedabad / Mumbai].
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-4 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              13. Changes to Terms
            </h2>
            <div className="px-4 py-2">
              <p className="text-gray-600">
                We reserve the right to modify or update these Terms at any
                time. Changes will be posted on this page with a revised “Last
                Updated” date. Continued use of the Site indicates acceptance of
                the revised Terms.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto  mt-4 mb-12 grid grid-cols-1  gap-10">
          <div>
            <h2 className="text-lg font-medium text-blue-900 bg-[#f1f4fb] py-2 pl-4">
              14. Contact Us
            </h2>
            <div className="px-4 py-2">
              <p className="text-pink-500 font-medium">
                If you have questions regarding these Terms, please contact:
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
                  <b className="text-blue-900">Phone :</b> +91 9004382696
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default TermCondition;
