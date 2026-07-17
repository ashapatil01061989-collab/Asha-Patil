import React, { useRef, useState, useEffect } from "react";
import { 
  Download, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Printer, 
  ShieldCheck, 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Sun, 
  Moon, 
  MapPin, 
  HeartPulse, 
  Users, 
  Check,
  Smartphone,
  ExternalLink,
  MessageSquare,
  ShieldAlert,
  ClipboardCheck,
  CheckCircle,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import { SPECIALTIES } from "../data";

interface SharedPassViewerProps {
  isOpen: boolean;
  onClose: () => void;
  passData: {
    id: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    isExisting: string;
    preferredDate: string;
    preferredTime: string;
    reason: string;
    specId: string;
  } | null;
  isDarkMode: boolean;
  onToggleDarkMode?: () => void;
}

export const SharedPassViewer: React.FC<SharedPassViewerProps> = ({
  isOpen,
  onClose,
  passData,
  isDarkMode,
  onToggleDarkMode
}) => {
  if (!isOpen || !passData) return null;

  const specialty = SPECIALTIES.find((s) => s.id === passData.specId) || SPECIALTIES[0];

  // Signature Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>("#1d4ed8"); // Default clinical royal blue ink
  const [brushWidth, setBrushWidth] = useState<number>(3.5);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [showSaveAlert, setShowSaveAlert] = useState<boolean>(false);

  // Initialize and adjust signature canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 180;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushWidth;
      }
    }
  }, [isOpen]);

  // Adjust signature ink changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushWidth;
      }
    }
  }, [brushColor, brushWidth]);

  // Translate touch/mouse events for signature canvas
  const getEventCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const coords = getEventCoords(e, canvas);
    if (coords) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (e.cancelable) {
      e.preventDefault(); // Stop page scrolling during signature
    }

    const coords = getEventCoords(e, canvas);
    if (coords) {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // High-fidelity PDF document compiler
  const handleDownloadReceipt = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Elegant Clinical Color Palette
    const primaryColor = [2, 132, 199];   // Sky Blue #0284c7
    const successColor = [16, 185, 129];   // Emerald Green #10b981
    const darkColor = [15, 23, 42];       // Slate 900 #0f172a
    const grayColor = [100, 116, 139];     // Slate 500 #64748b
    const lightGrayColor = [248, 250, 252]; // Slate 50 #f8fafc

    // 1. --- Royal Clinical Header Banner ---
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 50, "F");

    // Clinic Branding
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(specialty.clinicName.toUpperCase(), 105, 18, { align: "center" });

    // Clinic Tagline
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(224, 242, 254); // Light sky blue text
    doc.text("CareElite Outpatient Suites - Official Check-in E-Pass", 105, 26, { align: "center" });

    // Verified Stamp Badge
    doc.setFillColor(successColor[0], successColor[1], successColor[2]);
    doc.roundedRect(65, 33, 80, 8, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("VERIFIED CLINICAL REGISTRATION", 105, 38.5, { align: "center" });

    let yPos = 65;
    const leftColX = 20;
    const valueColX = 110;

    // 2. --- Section: Patient Demographics ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("PATIENT DEMOGRAPHICS", leftColX, yPos);
    
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(leftColX, yPos + 2.5, 190, yPos + 2.5);
    yPos += 11;

    const rowHeight = 9;
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

    drawRow("Full Patient Name:", passData.fullName);
    drawRow("Mobile Contact Number:", passData.mobileNumber);
    drawRow("Registered Email Address:", passData.email || "Not Provided");
    drawRow("Patient Admission Status:", passData.isExisting === "yes" ? "Existing Patient (Follow-up)" : "New Patient Registration");

    yPos += 5;

    // 3. --- Section: Consultation Schedule ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("APPOINTMENT SCHEDULING", leftColX, yPos);
    doc.line(leftColX, yPos + 2.5, 190, yPos + 2.5);
    yPos += 11;

    drawRow("Assigned Medical Specialist:", `Dr. ${specialty.doctorName}`);
    drawRow("Clinical Specialty Division:", specialty.specialtyName);
    drawRow("Consultation Date:", passData.preferredDate);
    drawRow("Requested Timing Slot:", passData.preferredTime);

    yPos += 5;

    // 4. --- Section: Symptoms Summary ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("CASE NOTES / REPORTED SYMPTOMS", leftColX, yPos);
    doc.line(leftColX, yPos + 2.5, 190, yPos + 2.5);
    yPos += 9;

    // Rounded Grey Container Box
    doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
    doc.roundedRect(leftColX, yPos, 170, 24, 3, 3, "F");
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    
    const textLines = doc.splitTextToSize(
      passData.reason || "General routine physical wellness check-up and clinical consultation requested by patient.",
      160
    );
    doc.text(textLines, leftColX + 5, yPos + 7);

    yPos += 36;

    // 5. --- Section: Security & Gate Check-in Barcode ---
    doc.setFillColor(236, 253, 245); // Emerald green very light tint
    doc.roundedRect(leftColX, yPos, 170, 25, 4, 4, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    doc.text("SECURITY REGISTRATION REFERENCE CODE", leftColX + 8, yPos + 8);

    doc.setFont("courier", "bold");
    doc.setFontSize(14);
    doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    doc.text(passData.id, leftColX + 8, yPos + 17);

    // Fictional Barcode Graphic
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("|| ||| | ||| || |||| || |", 125, yPos + 16);

    yPos += 34;

    // 6. --- Section: Signatures (Physician Stamp & Patient Approval) ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("Digitally Verified CareElite", leftColX + 15, yPos + 14, { align: "center" });
    doc.text("Patient Verified Signature", 155, yPos + 14, { align: "center" });

    // Drawing baseline for signatures
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.line(leftColX + 2, yPos + 10, leftColX + 42, yPos + 10);
    doc.line(135, yPos + 10, 175, yPos + 10);

    // Doctor signature stamp
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`Dr. ${specialty.doctorName.split(" ").slice(-1)[0]}`, leftColX + 22, yPos + 7, { align: "center" });

    // 7. --- Embed Patient Handdrawn Canvas Signature ---
    const canvas = canvasRef.current;
    if (canvas && hasDrawn) {
      try {
        const signatureImgData = canvas.toDataURL("image/png");
        // Place above the right baseline beautifully
        doc.addImage(signatureImgData, "PNG", 137, yPos - 1, 36, 10);
      } catch (canvasErr) {
        console.error("Failed to embed canvas signature in PDF:", canvasErr);
      }
    }

    yPos += 22;

    // 8. --- Footer Policy & Info ---
    doc.setDrawColor(226, 232, 240);
    doc.line(leftColX, yPos, 190, yPos);
    yPos += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("Please keep this official check-in pass on your device or printed out.", 105, yPos, { align: "center" });
    yPos += 4;
    doc.text("Present the barcode to the gateway scanner at Suite Entrance No. 4 for immediate triage check-in.", 105, yPos, { align: "center" });
    yPos += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Thank you for choosing CareElite Outpatient Suites.", 105, yPos, { align: "center" });

    // Save download
    doc.save(`CareElite_GatePass_${passData.fullName.replace(/\s+/g, "_")}.pdf`);

    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  // WhatsApp sharing helper
  const getWhatsAppShareLink = () => {
    const textMessage = `*🩺 CareElite Entry Gate E-Pass Verified*

*🏥 Clinic:* ${specialty.clinicName}
*👨‍⚕️ Doctor:* Dr. ${specialty.doctorName}
*📋 Suite division:* ${specialty.specialtyName}
----------------------------------------
*👤 Patient Details:*
• *Name:* ${passData.fullName}
• *Mobile:* ${passData.mobileNumber}
• *Appointment:* ${passData.preferredDate} (${passData.preferredTime})
*🔑 Ticket Reference:* ${passData.id}

_Check-in Gate Entry Approved. Signature Verified Online._`;
    
    const phoneDigits = (specialty.emergencyContact || "9158780962").replace(/[^0-9]/g, "");
    return `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encodeURIComponent(textMessage)}`;
  };

  return (
    <div id="shared-pass-root" className={`min-h-screen font-sans transition-colors duration-300 relative ${
      isDarkMode 
        ? "dark bg-[#090d16] text-slate-100" 
        : "bg-gradient-to-tr from-slate-50 via-sky-50/30 to-emerald-50/20 text-slate-850"
    }`}>
      
      {/* Dynamic Ambient Background Glowing Blobs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-sky-500/10 dark:bg-sky-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Floating Success Alert */}
      <AnimatePresence>
        {showSaveAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 bg-emerald-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-2xl border border-emerald-400/20"
          >
            <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
            <span>Pass PDF Downloaded Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP NAVBAR PORTAL HEADER */}
      <header className={`sticky top-0 z-40 h-16 shrink-0 border-b shadow-sm transition-colors duration-300 ${
        isDarkMode 
          ? "bg-slate-900/90 border-slate-800/80 backdrop-blur-md" 
          : "bg-white/80 border-slate-200/50 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          
          {/* Left Navigation Block */}
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className={`p-2.5 rounded-full transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                isDarkMode 
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white" 
                  : "bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 shadow-sm border border-slate-200/60"
              }`}
              title="Return to Clinic Home"
            >
              <ArrowLeft className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>
            
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest leading-none mb-1">
                CareElite Portal
              </span>
              <span className={`text-sm font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Outpatient Gatepass
              </span>
            </div>
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className={`p-2.5 rounded-full transition-all active:scale-90 cursor-pointer flex items-center justify-center border ${
                  isDarkMode 
                    ? "bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-amber-400" 
                    : "bg-white border-slate-200 hover:bg-slate-50 text-sky-600 shadow-sm"
                }`}
                title="Toggle UI Theme"
              >
                {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
            )}

            <button
              onClick={handlePrint}
              className={`p-2.5 rounded-full transition-all active:scale-90 cursor-pointer flex items-center justify-center border ${
                isDarkMode 
                  ? "bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-300" 
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
              }`}
              title="Print Pass Details"
            >
              <Printer className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. BENTO PORTAL CONTENT WRAPPER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        
        {/* Verification Status Banner */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100/90 dark:bg-emerald-950/40 border border-emerald-300/50 dark:border-emerald-900/40 px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Verified Clinical Entry Gatepass
          </span>
          <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Appointment E-Receipt & Gate Pass
          </h1>
          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-lg mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Sign your e-pass with the clinical digital pad below, then download the secure PDF receipt. Scan your barcode at the gateway scanner for rapid outpatient entry.
          </p>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= COLUMN 1: THE SMART CARD VIEW (span 5) ================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* The E-Pass Smart RFID Card Container */}
            <div className={`w-full max-w-md rounded-[2.2rem] border overflow-hidden transition-all duration-300 relative ${
              isDarkMode 
                ? "bg-slate-900 border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.5)]" 
                : "bg-white border-slate-200/80 shadow-[0_25px_60px_rgba(2,132,199,0.06)]"
            }`}>
              
              {/* Card Accent Top Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500" />

              {/* Faint Medical Crest Watermark background on Card */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] flex items-center justify-center pointer-events-none select-none">
                <HeartPulse className="w-80 h-80" />
              </div>

              {/* Card Top Branding Header */}
              <div className={`p-6 sm:p-7 pb-5 relative border-b ${isDarkMode ? "border-slate-800/60" : "border-slate-100"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
                      {specialty.clinicName}
                    </span>
                    <h2 className={`text-xl font-black tracking-tight leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      CareElite E-Pass
                    </h2>
                    
                    {/* Live Checkin status badge */}
                    <div className="inline-flex items-center gap-1.5 pt-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                        AUTHENTICATED SECURE PASS
                      </span>
                    </div>
                  </div>

                  {/* Medical Cross Icon Graphic */}
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-sky-500/15">
                    +
                  </div>
                </div>

                {/* Sub-Badges block */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider border ${
                    isDarkMode 
                      ? "bg-sky-950/40 text-sky-400 border-sky-900/30" 
                      : "bg-sky-50 text-sky-700 border-sky-100"
                  }`}>
                    Suite: {specialty.specialtyName}
                  </span>
                  <span className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-black border ${
                    isDarkMode 
                      ? "bg-slate-800 text-slate-300 border-slate-700" 
                      : "bg-slate-50 text-slate-600 border-slate-250/60"
                  }`}>
                    REF: {passData.id}
                  </span>
                </div>
              </div>

              {/* Card Middle: Scheduled Details */}
              <div className="p-6 sm:p-7 space-y-6 relative z-10">
                
                {/* 2-Column Schedule Blocks */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Date Block */}
                  <div className={`p-4 rounded-2xl border flex flex-col gap-1 transition-colors duration-300 ${
                    isDarkMode 
                      ? "bg-slate-950/40 border-slate-800 text-slate-200" 
                      : "bg-sky-50/60 border-sky-100 text-sky-950"
                  }`}>
                    <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Date</span>
                    </div>
                    <span className="text-sm font-black tracking-tight mt-0.5">
                      {passData.preferredDate}
                    </span>
                  </div>

                  {/* Time Block */}
                  <div className={`p-4 rounded-2xl border flex flex-col gap-1 transition-colors duration-300 ${
                    isDarkMode 
                      ? "bg-slate-950/40 border-slate-800 text-slate-200" 
                      : "bg-emerald-50/60 border-emerald-100 text-emerald-950"
                  }`}>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Time Slot</span>
                    </div>
                    <span className="text-sm font-black tracking-tight mt-0.5 line-clamp-1">
                      {passData.preferredTime.split(" ")[0]}
                    </span>
                  </div>

                </div>

                {/* Patient Profile Fields with icons & high-contrast coloring */}
                <div className="space-y-3.5 pt-1">
                  
                  <div className={`flex items-center justify-between text-xs pb-2 border-b ${isDarkMode ? "border-slate-800/60" : "border-slate-100"}`}>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold">
                      <User className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Patient Name</span>
                    </div>
                    <span className={`font-black text-sm ${isDarkMode ? "text-white" : "text-slate-900"} truncate max-w-[190px]`}>
                      {passData.fullName}
                    </span>
                  </div>

                  <div className={`flex items-center justify-between text-xs pb-2 border-b ${isDarkMode ? "border-slate-800/60" : "border-slate-100"}`}>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold">
                      <Phone className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Contact Mobile</span>
                    </div>
                    <span className={`font-black text-sm font-mono ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {passData.mobileNumber}
                    </span>
                  </div>

                  {passData.email && (
                    <div className={`flex items-center justify-between text-xs pb-2 border-b ${isDarkMode ? "border-slate-800/60" : "border-slate-100"}`}>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold">
                        <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                        <span>Email Address</span>
                      </div>
                      <span className={`font-black text-xs ${isDarkMode ? "text-white" : "text-slate-900"} truncate max-w-[190px]`} title={passData.email}>
                        {passData.email}
                      </span>
                    </div>
                  )}

                  <div className={`flex items-center justify-between text-xs pb-2 border-b ${isDarkMode ? "border-slate-800/60" : "border-slate-100"}`}>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold">
                      <Users className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Patient Status</span>
                    </div>
                    <span className={`font-black text-xs uppercase tracking-wide ${passData.isExisting === "yes" ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                      {passData.isExisting === "yes" ? "Existing Follow-up" : "New Patient Profile"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pb-1">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold">
                      <Activity className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Specialist Doctor</span>
                    </div>
                    <span className={`font-black text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      Dr. {specialty.doctorName.split(",")[0]}
                    </span>
                  </div>

                </div>

                {/* Symptoms Summary Bubble */}
                <div className={`p-4.5 rounded-2xl border text-xs leading-relaxed relative overflow-hidden transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-slate-950/40 border-slate-800/80 text-slate-300" 
                    : "bg-slate-50 border-slate-200/60 text-slate-800 shadow-inner"
                }`}>
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-sky-500 to-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Reported Symptoms / Consultation Notes
                  </span>
                  <p className="italic font-bold">
                    "{passData.reason || "Routine diagnostics and outpatient clinical suite visit."}"
                  </p>
                </div>

                {/* Card Footer: Live Laser Barcode */}
                <div className={`pt-4 border-t space-y-2.5 ${isDarkMode ? "border-slate-800/60" : "border-slate-100"}`}>
                  <div className={`relative overflow-hidden rounded-xl border p-2.5 h-14 flex items-center justify-center ${
                    isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-slate-50/60 border-slate-200/60 shadow-xs"
                  }`}>
                    
                    {/* Simulated Barcode Stripes */}
                    <div className="flex items-center justify-center gap-[2.5px] h-full w-full opacity-90">
                      {[1, 3, 4, 1, 2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 2, 1, 3, 2, 1, 4].map((w, idx) => (
                        <div 
                          key={idx} 
                          className={`h-full rounded-[1px] ${isDarkMode ? "bg-slate-300" : "bg-slate-900"}`} 
                          style={{ width: `${w}px` }} 
                        />
                      ))}
                    </div>

                    {/* Framer Motion Red Laser Animation line */}
                    <motion.div 
                      animate={{ y: [-15, 15, -15] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut" 
                      }}
                      className="absolute left-0 right-0 h-[3px] bg-red-500 shadow-[0_0_12px_#ef4444] opacity-90 pointer-events-none" 
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-black text-slate-500 dark:text-slate-400 tracking-wider uppercase font-mono">
                    <span>Gate No. 4 Security Scanner</span>
                    <span className="text-sky-600 dark:text-sky-400">{passData.id}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* ================= COLUMN 2: PORTAL ACTION HUB (span 7) ================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Dynamic Doctor Profile Card */}
            <div className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 flex items-center gap-4 ${
              isDarkMode 
                ? "bg-slate-900 border-slate-800" 
                : "bg-white border-slate-200/70 shadow-[0_8px_30px_rgb(2,132,199,0.02)]"
            }`}>
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-sky-100 dark:border-sky-950 shadow-inner">
                <img 
                  src={specialty.avatar} 
                  alt={specialty.doctorName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  Assigned Care Specialist
                </span>
                <h3 className={`text-base sm:text-lg font-black tracking-tight leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Dr. {specialty.doctorName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-none">
                  {specialty.qualifications.split(",")[0]}
                </p>
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                    Exp: {specialty.experience}
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-500">
                    Avg Wait: {specialty.timing.averageWait}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Interactive Digital Signature Pad */}
            <div className={`p-5 sm:p-6 rounded-[2.2rem] border transition-all duration-300 space-y-4 ${
              isDarkMode 
                ? "bg-slate-900 border-slate-800" 
                : "bg-white border-slate-200/80 shadow-md shadow-slate-100/50"
            }`}>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-black uppercase tracking-wider leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      Clinical Digital Signature
                    </h3>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold block mt-0.5">
                      SIGN TO EMBED SECURE BIOMETRIC INTO PDF RECEIPT
                    </span>
                  </div>
                </div>

                {hasDrawn && (
                  <button
                    onClick={clearCanvas}
                    className="flex items-center gap-1.5 text-[10px] font-extrabold text-rose-600 hover:text-rose-500 transition-colors active:scale-95 cursor-pointer bg-rose-50 dark:bg-rose-950/20 px-3 py-1.5 rounded-xl border border-rose-100 dark:border-transparent"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Sign</span>
                  </button>
                )}
              </div>

              {/* Pad Draw Arena with subtle clinical grid background */}
              <div className={`relative h-32 rounded-2xl border overflow-hidden transition-all duration-300 ${
                hasDrawn 
                  ? "border-sky-500 dark:border-sky-400/80 shadow-md shadow-sky-500/5 bg-slate-50/20 dark:bg-slate-950" 
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60"
              }`}>
                
                {/* Visual Grid Lines inside drawing area */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 pointer-events-none opacity-[0.03] dark:opacity-[0.02]">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className="border-r border-b border-slate-900 dark:border-white" />
                  ))}
                </div>

                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                />

                {!hasDrawn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none text-slate-400 dark:text-slate-500 select-none">
                    <span className="text-xs font-black uppercase tracking-widest text-sky-600/70 dark:text-sky-400/60">Draw Signature Here</span>
                    <span className="text-[9px] uppercase tracking-widest font-black opacity-50 text-slate-400">Click & Drag to sign</span>
                  </div>
                )}
              </div>

              {/* Ink Color selectors */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-800/40">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Clinical Pen Ink Color:
                </span>
                
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {[
                    { name: "Royal Blue", value: "#1d4ed8" },
                    { name: "Carbon Black", value: "#0f172a" },
                    { name: "Clinical Emerald", value: "#059669" }
                  ].map((ink) => (
                    <button
                      key={ink.value}
                      onClick={() => setBrushColor(ink.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-bold tracking-tight transition-all active:scale-95 cursor-pointer ${
                        brushColor === ink.value 
                          ? isDarkMode
                            ? "bg-slate-800 text-white border-sky-400"
                            : "bg-sky-50 text-sky-900 border-sky-300 shadow-sm"
                          : isDarkMode
                            ? "border-slate-800 text-slate-400 hover:bg-slate-800/50"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: ink.value }} />
                      <span>{ink.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. Primary Action Hub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Main Download Button */}
              <button
                onClick={handleDownloadReceipt}
                className="col-span-1 sm:col-span-2 w-full py-4.5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 hover:from-sky-500 hover:to-sky-400 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden"
              >
                <Download className="w-5 h-5 stroke-[2.5px]" />
                <span>Download Clinical A4 PDF Ticket</span>
              </button>

              {/* Secondary WhatsApp Share */}
              <a
                href={getWhatsAppShareLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4.5 h-4.5 text-white" />
                <span>Share pass to WhatsApp</span>
              </a>

              {/* Return back home */}
              <button
                onClick={onClose}
                className={`w-full py-3.5 rounded-2xl border font-bold text-xs tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isDarkMode 
                    ? "border-slate-800 hover:bg-slate-800 text-slate-300" 
                    : "border-slate-200 hover:bg-slate-50 text-slate-700 bg-white shadow-xs"
                }`}
              >
                <ExternalLink className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
                <span>Back to Clinic Site</span>
              </button>

            </div>

            {/* 4. Clinic Check-in Step-by-Step Instructions */}
            <div className={`p-5 sm:p-6 rounded-[2.2rem] border transition-all duration-300 space-y-4 ${
              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/80 shadow-xs"
            }`}>
              
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-wider leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Clinic Entry & Check-in Instructions
                  </h3>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold block mt-0.5">
                    RECEPTION GATE ACCESS PROTOCOLS
                  </span>
                </div>
              </div>

              {/* Grid Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
                
                {/* Step 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-5.5 h-5.5 rounded-full font-extrabold text-[10px] flex items-center justify-center shrink-0 border ${
                      isDarkMode 
                        ? "bg-slate-800 text-sky-400 border-slate-700" 
                        : "bg-sky-50 text-sky-700 border-sky-100 shadow-sm"
                    }`}>
                      1
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-300" : "text-slate-900"}`}>
                      Arrive early
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Kindly arrive <strong>10 minutes prior</strong> to your selected block. No paperwork required.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-5.5 h-5.5 rounded-full font-extrabold text-[10px] flex items-center justify-center shrink-0 border ${
                      isDarkMode 
                        ? "bg-slate-800 text-sky-400 border-slate-700" 
                        : "bg-sky-50 text-sky-700 border-sky-100 shadow-sm"
                    }`}>
                      2
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-300" : "text-slate-900"}`}>
                      Scan e-pass
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Present this digital barcode at <strong>Gateway Entrance No. 4</strong> for automated check-in.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-5.5 h-5.5 rounded-full font-extrabold text-[10px] flex items-center justify-center shrink-0 border ${
                      isDarkMode 
                        ? "bg-slate-800 text-sky-400 border-slate-700" 
                        : "bg-sky-50 text-sky-700 border-sky-100 shadow-sm"
                    }`}>
                      3
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-300" : "text-slate-900"}`}>
                      Zero Waiting
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Direct access to the sterile HEPA air-filtered outpatient suite with your specialist.
                  </p>
                </div>

              </div>

              {/* Map location helper */}
              <div className={`mt-2 p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-colors duration-300 ${
                isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200/60 shadow-inner"
              }`}>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <div className="space-y-0.5">
                    <span className={`font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>Suite 102 - Clinical Wing</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">CareElite Outpatient Towers, Tower B</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Ground Floor
                </span>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
