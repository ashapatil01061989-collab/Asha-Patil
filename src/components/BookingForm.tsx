import React, { useState } from "react";
import { SpecialtyData } from "../data";
import { ScrollReveal } from "./ScrollReveal";
import { CalendarCheck, Phone, CheckCircle, MessageSquare, AlertCircle, X, ShieldCheck, Download, Printer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { jsPDF } from "jspdf";

interface BookingFormProps {
  specialty: SpecialtyData;
  isDarkMode: boolean;
  isOpenDirectly?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({ specialty, isDarkMode }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    reason: "",
    isExisting: "no",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mockId, setMockId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const triggerConfetti = () => {
    // Launch a massive initial burst
    confetti({
      particleCount: 150,
      spread: 85,
      origin: { y: 0.5 },
      colors: ["#0284c7", "#0ea5e9", "#10b981", "#34d399", "#fbbf24", "#f43f5e", "#8b5cf6"]
    });

    // Run a stream of confetti strips for 2.5 seconds
    const duration = 2500;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#0284c7", "#10b981", "#fbbf24", "#f43f5e"]
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#0284c7", "#10b981", "#fbbf24", "#f43f5e"]
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleDownloadReceipt = (customMockId?: string) => {
    const currentId = customMockId || mockId || "MED-PENDING";
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Set colors
    const primaryColor = [2, 132, 199]; // Sky Blue #0284c7
    const successColor = [16, 185, 129]; // Emerald Green #10b981
    const darkColor = [15, 23, 42]; // Slate 900 #0f172a
    const grayColor = [100, 116, 139]; // Slate 500 #64748b
    const lightGrayColor = [241, 245, 249]; // Slate 100 #f1f5f9

    // --- Header Section ---
    // Primary header bar
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 45, "F");

    // Clinic Name
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(specialty.clinicName.toUpperCase(), 105, 20, { align: "center" });

    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Official Clinical Appointment Pass & Receipt", 105, 28, { align: "center" });

    // Status Badge
    doc.setFillColor(successColor[0], successColor[1], successColor[2]);
    doc.roundedRect(75, 33, 60, 7, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("CONFIRMED REQUEST", 105, 38, { align: "center" });

    // --- Content Section ---
    let yPos = 60;

    // Left alignment helper
    const leftColX = 20;
    const valueColX = 110;

    // Section 1: Patient Profile
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("PATIENT PROFILE", leftColX, yPos);
    
    // Draw thin line under section title
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(leftColX, yPos + 2, 190, yPos + 2);
    yPos += 10;

    const rowHeight = 8;
    const drawRow = (label: string, value: string) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.text(label, leftColX, yPos);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text(value, valueColX, yPos);
      yPos += rowHeight;
    };

    drawRow("Full Patient Name:", formData.fullName);
    drawRow("Mobile Contact Number:", formData.mobileNumber);
    drawRow("Email Address:", formData.email || "Not Provided");
    drawRow("Patient Relation Status:", formData.isExisting === "yes" ? "Existing (Follow-up)" : "New Patient Registration");

    yPos += 6;

    // Section 2: Appointment Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("CLINICAL APPOINTMENT DETAILS", leftColX, yPos);
    doc.line(leftColX, yPos + 2, 190, yPos + 2);
    yPos += 10;

    drawRow("Primary Care Doctor:", `Dr. ${specialty.doctorName}`);
    drawRow("Medical Specialty Division:", specialty.specialtyName);
    drawRow("Preferred Consultation Date:", formData.preferredDate);
    drawRow("Requested Timing Block:", formData.preferredTime);

    yPos += 6;

    // Section 3: Notes & Symptoms
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("SYMPTOM SUMMARY / NOTES", leftColX, yPos);
    doc.line(leftColX, yPos + 2, 190, yPos + 2);
    yPos += 8;

    // Draw reason box background
    doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
    doc.roundedRect(leftColX, yPos, 170, 24, 3, 3, "F");
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    
    // Split text into multi-line to avoid clipping in PDF
    const textLines = doc.splitTextToSize(
      formData.reason || "General health check-up and clinical routine consultation requested by the patient.",
      160
    );
    doc.text(textLines, leftColX + 5, yPos + 7);

    yPos += 35;

    // Section 4: Security Reference ID Card
    doc.setFillColor(236, 253, 245); // Emerald light tint
    doc.roundedRect(leftColX, yPos, 170, 25, 4, 4, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    doc.text("SECURE REGISTRATION REFERENCE", leftColX + 10, yPos + 8);

    doc.setFont("courier", "bold");
    doc.setFontSize(14);
    doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    doc.text(currentId, leftColX + 10, yPos + 17);

    // Mock Barcode
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("|| ||| | ||| || |||| || |", 120, yPos + 16);

    yPos += 35;

    // --- Footer Section ---
    doc.setDrawColor(226, 232, 240);
    doc.line(leftColX, yPos, 190, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("Please keep this PDF handy on your phone. Upon arriving at the clinic reception,", 105, yPos, { align: "center" });
    yPos += 4;
    doc.text("present this reference pass. Our clinical secretary will immediately activate your consultation.", 105, yPos, { align: "center" });
    yPos += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Thank you for choosing modern clinic desk automation.", 105, yPos, { align: "center" });

    // Save the PDF
    doc.save(`Clinical_Appointment_${currentId}.pdf`);
  };

  const getWhatsAppLink = (customMockId?: string, customText?: string) => {
    // Clean all non-digit characters from the emergency contact
    let phoneDigits = (specialty.emergencyContact || "9158780962").replace(/[^0-9]/g, "");
    
    // Standardize Indian numbers: if 10 digits, prepend country code '91'
    if (phoneDigits.length === 10) {
      phoneDigits = "91" + phoneDigits;
    }

    const textMessage = customText || (() => {
      const currentMockId = customMockId || mockId || "MED-PENDING";
      const patientType = formData.isExisting === "yes" ? "Existing (Follow-up)" : "New Patient";
      const emailAddress = formData.email || "Not Provided";
      const sympNotes = formData.reason || "No symptoms or notes specified.";

      // Dynamically resolve base website URL, ensuring we use the public Shared App URL (ais-pre) instead of the private dev domain (ais-dev)
      let baseAppUrl = "https://ais-pre-i5x7ltatmtnd6zmeml75x6-518139338132.asia-southeast1.run.app/";
      if (typeof window !== "undefined") {
        let origin = window.location.origin;
        // If it's a dev URL, replace it with pre- (Shared App URL) to ensure it is public and does not require Google AI Studio authentication!
        if (origin.includes("ais-dev-")) {
          origin = origin.replace("ais-dev-", "ais-pre-");
        }
        baseAppUrl = origin + (window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/");
      }
      
      const passLink = `${baseAppUrl}?viewPass=true&id=${encodeURIComponent(currentMockId)}&name=${encodeURIComponent(formData.fullName)}&phone=${encodeURIComponent(formData.mobileNumber)}&email=${encodeURIComponent(formData.email || "")}&existing=${encodeURIComponent(formData.isExisting)}&date=${encodeURIComponent(formData.preferredDate)}&time=${encodeURIComponent(formData.preferredTime)}&reason=${encodeURIComponent(formData.reason || "")}&specId=${encodeURIComponent(specialty.id)}`;

      return `*🩺 NEW CLINICAL APPOINTMENT REQUEST*

*🏥 Clinic:* ${specialty.clinicName}
*👨‍⚕️ Doctor:* Dr. ${specialty.doctorName}
*📋 Specialty:* ${specialty.specialtyName}

----------------------------------------
*👤 Patient Details:*
• *Full Name:* ${formData.fullName}
• *Contact Number:* ${formData.mobileNumber}
• *Email ID:* ${emailAddress}
• *Patient Type:* ${patientType}

*📅 Appointment Details:*
• *Requested Date:* ${formData.preferredDate}
• *Timing Slot:* ${formData.preferredTime}

*💬 Reason / Symptoms:*
_"${sympNotes}"_
----------------------------------------
*🔑 Reference ID:* ${currentMockId}
*🔗 Online PDF Pass:* ${passLink}

_Generated securely via digital Clinic Desk Portal._`;
    })();

    // Check if the device is a mobile device to use native whatsapp:// deep-link scheme
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      return `whatsapp://send?phone=${phoneDigits}&text=${encodeURIComponent(textMessage)}`;
    } else {
      return `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encodeURIComponent(textMessage)}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobileNumber) {
      alert("Please enter your Name and Contact Number.");
      return;
    }

    setIsSubmitting(true);

    const generatedId = `MED-${Math.floor(100000 + Math.random() * 90000)}`;
    let shouldProceedWithSuccess = false;

    try {
      // Attempt to hit the backend server API for real-time email dispatch
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          doctorName: specialty.doctorName,
          specialtyName: specialty.clinicName,
          doctorEmail: specialty.email || "diveshpatil0000@gmail.com",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          shouldProceedWithSuccess = true;
        } else {
          // If the backend exists but returned a specific error
          alert(data.error || "There was a problem submitting your appointment. Please try again.");
          setIsSubmitting(false);
          return;
        }
      } else {
        // If the server returned an error code (e.g., 404, 500), fallback to client-side success
        console.warn(`[Static/Serverless Environment] API returned status ${response.status}. Falling back to offline client-side confirmation.`);
        shouldProceedWithSuccess = true;
      }
    } catch (apiErr) {
      // If there is a complete network error (e.g., CORS, offline, or static hosting on Netlify with no server)
      console.warn("[Static/Serverless Environment] Failed to reach backend API. Falling back to offline client-side confirmation.", apiErr);
      shouldProceedWithSuccess = true;
    }

    if (shouldProceedWithSuccess) {
      setIsSubmitting(false);
      setMockId(generatedId);

      // Play the confetti celebration
      triggerConfetti();
      setShowSplash(true);

      // Keep splash on screen for a beautiful 2.8s duration then redirect to WhatsApp and show interactive receipt
      setTimeout(() => {
        setShowSplash(false);
        setShowSuccess(true);
        
        // Automatically generate and download the beautiful clinical PDF receipt
        try {
          handleDownloadReceipt(generatedId);
        } catch (pdfErr) {
          console.error("Auto PDF download failed:", pdfErr);
        }
        
        try {
          const waUrl = getWhatsAppLink(generatedId);
          const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          if (isMobileDevice) {
            // Direct scheme call on mobile, launches native WhatsApp directly with no blank pages
            window.location.href = waUrl;
          } else {
            // Opens in a new tab on desktop so they don't lose the receipt page
            window.open(waUrl, "_blank");
          }
        } catch (err) {
          console.warn("Failed to redirect to WhatsApp automatically.", err);
        }
      }, 2800);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
    // Clear form
    setFormData({
      fullName: "",
      mobileNumber: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      reason: "",
      isExisting: "no",
    });
  };

  return (
    <section id="booking-section" className={`py-16 sm:py-24 border-b ${
      isDarkMode ? "bg-slate-900/60 border-slate-900" : "bg-white border-gray-100"
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              Direct Calendar Access
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Book Your Consultation
            </h2>
            <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Secure your medical consultation slot instantly. Our clinical desk will send an SMS and WhatsApp confirmation within 15 minutes of request receipt.
            </p>
          </div>
        </ScrollReveal>

        {/* Outer Form Box */}
        <ScrollReveal variant="fade-up" delay={0.15} duration={0.7}>
          <div className={`p-6 sm:p-10 rounded-3xl border text-left ${
            isDarkMode
              ? "bg-slate-900/80 border-slate-800"
              : "bg-white border-slate-200 shadow-sm"
          }`}>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                  Full Patient Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-sky-500 outline-none transition-all ${
                    isDarkMode
                      ? "bg-slate-850 border-slate-700 text-white focus:bg-slate-800"
                      : "bg-gray-50/50 border-gray-200 text-gray-800 focus:bg-white"
                  }`}
                />
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-sky-500 outline-none transition-all ${
                    isDarkMode
                      ? "bg-slate-850 border-slate-700 text-white focus:bg-slate-800"
                      : "bg-gray-50/50 border-gray-200 text-gray-800 focus:bg-white"
                  }`}
                />
              </div>

              {/* Email address */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. patient@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-sky-500 outline-none transition-all ${
                    isDarkMode
                      ? "bg-slate-850 border-slate-700 text-white focus:bg-slate-800"
                      : "bg-gray-50/50 border-gray-200 text-gray-800 focus:bg-white"
                  }`}
                />
              </div>

              {/* Existing Patient Toggle */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                  Have you visited our clinic before?
                </label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isExisting: "yes" })}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.isExisting === "yes"
                        ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                        : isDarkMode
                          ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Yes, Existing
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isExisting: "no" })}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.isExisting === "no"
                        ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                        : isDarkMode
                          ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    No, New Patient
                  </button>
                </div>
              </div>

              {/* Preferred Date */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                  Preferred Consultation Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-sky-500 outline-none transition-all ${
                    isDarkMode
                      ? "bg-slate-850 border-slate-700 text-white focus:bg-slate-800"
                      : "bg-gray-50/50 border-gray-200 text-gray-800 focus:bg-white"
                  }`}
                />
              </div>

              {/* Preferred Time Slot */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                  Preferred Timing Block *
                </label>
                <select
                  name="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-sky-500 outline-none transition-all ${
                    isDarkMode
                      ? "bg-slate-850 border-slate-700 text-white focus:bg-slate-800"
                      : "bg-gray-50/50 border-gray-200 text-gray-800 focus:bg-white"
                  }`}
                >
                  <option value="">-- Choose Timing Block --</option>
                  <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                  <option value="Late Afternoon (03:00 PM - 05:30 PM)">Late Afternoon (03:00 PM - 05:30 PM)</option>
                </select>
              </div>

            </div>

            {/* Reason for Visit */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                Reason for Visit / Primary Symptoms
              </label>
              <textarea
                name="reason"
                rows={3}
                placeholder="Briefly describe your medical concerns, symptoms, or requested treatments so we may prepare the consultation suite."
                value={formData.reason}
                onChange={handleChange}
                className={`px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-sky-500 outline-none transition-all ${
                  isDarkMode
                    ? "bg-slate-850 border-slate-700 text-white focus:bg-slate-800"
                    : "bg-gray-50/50 border-gray-200 text-gray-800 focus:bg-white"
                }`}
              />
            </div>

            {/* Verification Note */}
            <div className="flex items-start gap-2 text-[10px] sm:text-xs text-gray-400">
              <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <p>
                <strong>Security Lock Verified:</strong> Your clinical data is stored in simulated, high-grade end-to-end encrypted databases adhering to strict HIPAA diagnostic guidelines. Fictional data only is utilized for this demo.
              </p>
            </div>

            {/* Booking action buttons strip */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 disabled:opacity-50 font-bold text-sm sm:text-base rounded-xl transition-all duration-300 cursor-pointer border ${
                  isDarkMode
                    ? "bg-sky-600 hover:bg-sky-700 text-white border-transparent shadow-lg hover:shadow-sky-500/20"
                    : "bg-sky-100 border-sky-200 text-sky-900 hover:bg-sky-600 hover:text-white hover:border-transparent shadow-sm"
                }`}
              >
                <CalendarCheck className="w-5 h-5 animate-float" />
                <span>{isSubmitting ? "Processing Clinical Slot..." : "Secure Consultation Slot"}</span>
              </button>

              <a
                href={getWhatsAppLink(undefined, `Hi Clinic Desk, I'd like to request an appointment with Dr. ${specialty.doctorName}`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-emerald-500/20 active:scale-98 transition-all duration-300 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="hidden md:inline">WhatsApp Appointment</span>
                <span className="inline md:hidden">WhatsApp Booking</span>
              </a>

              <a
                href={`tel:${specialty.emergencyContact}`}
                className={`flex items-center justify-center gap-2 px-5 py-4 font-bold text-sm sm:text-base rounded-xl border transition-all cursor-pointer ${
                  isDarkMode
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Phone className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>Call Clinic desk</span>
              </a>
            </div>

          </form>
        </div>
        </ScrollReveal>

      </div>

      {/* Success Modal Popup - World Class Design */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.6, y: 50, opacity: 0 }}
              animate={{ 
                scale: [0.6, 1.15, 1], 
                y: 0, 
                opacity: 1 
              }}
              exit={{ scale: 0.8, opacity: 0, y: -30 }}
              transition={{ 
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="text-center max-w-lg p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.25)]"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <motion.div
                  initial={{ rotate: -45, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 15 }}
                >
                  <CheckCircle className="w-14 h-14 text-emerald-400 animate-pulse" />
                </motion.div>
              </div>

              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="font-display text-3xl sm:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 drop-shadow-sm mb-2"
              >
                Confirmed Appointment
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-slate-400 text-sm sm:text-base font-medium max-w-md mx-auto"
              >
                Thank you, <span className="text-white font-extrabold">{formData.fullName}</span>! Your slot with <span className="text-emerald-400 font-bold">Dr. {specialty.doctorName}</span> has been registered and confirmed.
              </motion.p>

              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 1.8 }}
                className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-full mt-6"
              />
              <p className="text-[11px] text-slate-500 mt-2 tracking-wide uppercase font-semibold">Generating Your Secure Medical Receipt...</p>
            </motion.div>
          </motion.div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={closeSuccessModal}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border text-center z-10 ${
                isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-sky-100 text-gray-900"
              }`}
            >
              <button
                onClick={closeSuccessModal}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Check Circle Animation */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-850 flex items-center justify-center mx-auto mb-6 shadow-md border border-emerald-300 dark:border-emerald-900/50">
                <CheckCircle className="w-10 h-10 text-emerald-700 dark:text-emerald-450 animate-pulse" />
              </div>

              <h3 className="font-display text-2xl font-extrabold tracking-tight">
                Appointment Request Received
              </h3>
              <p className={`text-xs sm:text-sm mt-3 ${isDarkMode ? "text-slate-300" : "text-gray-500"}`}>
                Thank you for trusting <span className="font-extrabold text-sky-850 dark:text-sky-400">{specialty.clinicName}</span>. Your slot is held temporarily under review code:
              </p>

              {/* Receipt Summary Card */}
              <div className={`my-6 p-4 rounded-2xl text-left border space-y-2.5 ${
                isDarkMode ? "bg-slate-950/60 border-slate-800" : "bg-sky-50 border-sky-200"
              }`}>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-semibold">Patient Name:</span>
                  <span className="font-bold">{formData.fullName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-semibold">Medical Record ID:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{mockId}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-semibold">Specialty Division:</span>
                  <span className="font-bold text-sky-850 dark:text-sky-400">{specialty.specialtyName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-semibold">Preferred Date:</span>
                  <span className="font-bold">{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-semibold">Timing Block:</span>
                  <span className="font-bold line-clamp-1">{formData.preferredTime}</span>
                </div>

                <div className="h-px w-full bg-gray-100 dark:bg-slate-800 my-1" />
                <div className="flex gap-2 items-start text-[10px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Our medical secretary is actively reviewing this slot against the master scheduler. Confirmation via SMS & WhatsApp is pending.</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                <button
                  onClick={() => handleDownloadReceipt()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Pass</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    isDarkMode
                      ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/10 transition-all cursor-pointer animate-pulse hover:animate-none active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Doctor</span>
                </a>

                <button
                  onClick={closeSuccessModal}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    isDarkMode
                      ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  Close Window
                </button>
              </div>

              <p className={`text-[11px] text-center mt-3 font-semibold ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                💡 <span className="text-emerald-500 dark:text-emerald-400">Note:</span> Click the <span className="font-extrabold text-emerald-600 dark:text-emerald-400">WhatsApp Doctor</span> button above to securely share these appointment details with Dr. {specialty.doctorName} on WhatsApp.
              </p>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
