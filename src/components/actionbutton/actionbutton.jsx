import React from "react";
import { MessageCircle, FileText, Plus } from "lucide-react";

export default function FloatingFab() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50 group">
      {/* Hidden Buttons (show on hover) */}
      <div className="flex flex-col items-end mb-3 space-y-3 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-in-out">
        {/* WhatsApp Button */}
        <a
          href="https://api.whatsapp.com/send?phone=+919004382696&text=Hi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white rounded-full shadow-lg px-4 py-2 hover:bg-green-600 transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">WhatsApp</span>
        </a>

        {/* Get a Quote Button */}
        <a
                  href="contact"
                  className="flex items-center gap-2 bg-pink-500 text-white rounded-full shadow-lg px-4 py-2 hover:bg-pink-600 transition-all duration-300"
                >
                  <FileText className="w-5 h-5" />
                  Get a Quote
        </a>
      </div>

      {/* Main Floating Button */}
      <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all duration-300 flex items-center justify-center">
        <Plus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
      </div>
    </div>
  );
}
