import React, { useEffect, useRef, useState } from "react";

const EnquiryModal = ({ open, onClose, product }) =>{
    const dialogRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        CompanyWebsite: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose?.();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
		try {
			const API_BASE = import.meta.env.VITE_API_BASE_URL || `${window.location.origin}/api`;
            const response = await fetch(`${API_BASE}/send-mail-smtp.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    companyName: formData.companyName,
                    companyWebsite: formData.CompanyWebsite,
                    message: formData.message,
                    product: product?.name || ""
                }),
            });
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.message || "Submission failed");
            }
            setSent(true);
            setFormData({ name: "", email: "", phone: "", companyName: "", CompanyWebsite: "", message: "" });
            setTimeout(() => { setSent(false); onClose?.(); }, 1500);
        } catch (err) {
            setError("Failed to send. Please try again or email us.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <div
            ref={dialogRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
        >
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#ededed]">
                    <h3 className="text-lg md:text-xl font-semibold text-primary">Enquire About {product?.name}</h3>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-primary"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                            placeholder="Your full name"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                placeholder="Optional"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input 
                                type="text"
                                name="companyName"
                                required
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                placeholder="company name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                            <input 
                                type="text"
                                name="CompanyWebsite"
                                required
                                value={formData.CompanyWebsite}
                                onChange={handleChange}
                                className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                placeholder="Company Website"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            name="message"
                            rows="4"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                            placeholder="Tell us a bit about your requirement"
                        />
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2 rounded-full bg-[var(--secondary-color)] text-[var(--primary-color)] font-semibold hover:brightness-95 disabled:opacity-60"
                        >
                            {submitting ? "Sending..." : "Send Enquiry"}
                        </button>
                    </div>
                    {error ? <p className="text-red-600 text-sm text-center">{error}</p> : null}
                    {sent ? <p className="text-green-600 text-sm text-center">Enquiry sent successfully.</p> : null}
                </form>
            </div>
        </div>
    )
};

export default EnquiryModal;