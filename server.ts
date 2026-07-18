import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lazy-initialized SMTP transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const portVal = process.env.SMTP_PORT || "587";
  const port = parseInt(portVal);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn("⚠️ SMTP_USER or SMTP_PASS environment variables are missing in your deployment environment (e.g. Nestify). Emails will be logged to the console instead of sent. Please configure them to enable real-time email delivery!");
    return null;
  }

  // Detect placeholder credentials or hostname
  const isPlaceholder = (val: string) => {
    const v = val.trim().toLowerCase();
    return (
      v === "divesh" ||
      v === "placeholder" ||
      v.includes("your_") ||
      v.includes("example.com")
    );
  };

  if (isPlaceholder(host) || isPlaceholder(user) || isPlaceholder(pass) || !host.includes(".") || isNaN(port)) {
    console.warn("⚠️ SMTP configuration contains placeholder values (e.g. 'Divesh' or missing domain suffix). Falling back to console-logging emails safely to prevent delivery failures.");
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS) });
});

// Booking Submission API Endpoint
app.post("/api/book", async (req, res) => {
  const {
    fullName,
    mobileNumber,
    email,
    preferredDate,
    preferredTime,
    reason,
    isExisting,
    doctorName,
    specialtyName,
    doctorEmail,
  } = req.body;

  if (!fullName || !mobileNumber) {
    return res.status(400).json({ error: "Patient Name and Mobile Number are required." });
  }

  const targetDoctorEmail = doctorEmail || "diveshpatil0000@gmail.com";
  const patientEmail = email || "";

  console.log(`[Booking Request] Received consultation booking for ${doctorName} (${specialtyName}) from ${fullName}`);

  // Create Beautiful HTML for Doctor/Clinic Notification
  const doctorHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0f172a; padding: 24px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">New Patient Consultation Request</h2>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">${specialtyName} Suite</p>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 14px; line-height: 1.6; color: #334155;">Hello <strong>Dr. ${doctorName}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6; color: #334155;">A new clinical consultation slot has been requested through your online medical desk. Below are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569; width: 150px;">Patient Name:</td>
            <td style="padding: 10px 0; color: #1e293b;">${fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Mobile Number:</td>
            <td style="padding: 10px 0; color: #1e293b;"><a href="tel:${mobileNumber}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${mobileNumber}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Email Address:</td>
            <td style="padding: 10px 0; color: #1e293b;">${patientEmail ? `<a href="mailto:${patientEmail}" style="color: #0284c7; text-decoration: none;">${patientEmail}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Requested Date:</td>
            <td style="padding: 10px 0; color: #1e293b; font-weight: 600;">${preferredDate}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Preferred Slot:</td>
            <td style="padding: 10px 0; color: #1e293b;">${preferredTime}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Patient Status:</td>
            <td style="padding: 10px 0; color: #1e293b;">${isExisting === "yes" ? "Existing Patient (Follow-up)" : "New Patient Consultation"}</td>
          </tr>
        </table>

        <div style="margin-top: 25px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0284c7; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">Symptoms / Notes:</h4>
          <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #1e293b; font-style: italic;">"${reason || "No symptoms or reason specified."}"</p>
        </div>

        <div style="margin-top: 30px; text-align: center;">
          <a href="https://wa.me/${mobileNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(fullName)},%20this%20is%20the%20clinical%20desk%20regarding%20your%20appointment%20with%20Dr.%20${encodeURIComponent(doctorName)}" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">Contact Patient on WhatsApp</a>
        </div>
      </div>
      <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
        This is an automated dispatch from your private Clinic Desk Portal.
      </div>
    </div>
  `;

  // Create Beautiful HTML for Patient Confirmation Receipt
  const patientHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0284c7; padding: 24px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">Consultation Request Received</h2>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #e0f2fe;">${specialtyName} — Dr. ${doctorName}</p>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 14px; line-height: 1.6; color: #334155;">Dear <strong>${fullName}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6; color: #334155;">Thank you for scheduling your consultation. We have securely transmitted your details to our clinical front desk. Here is your reference summary:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569; width: 150px;">Specialist:</td>
            <td style="padding: 10px 0; color: #1e293b; font-weight: 600;">Dr. ${doctorName} (${specialtyName})</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Requested Date:</td>
            <td style="padding: 10px 0; color: #1e293b; font-weight: 600;">${preferredDate}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Time Slot:</td>
            <td style="padding: 10px 0; color: #1e293b;">${preferredTime}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Contact Number:</td>
            <td style="padding: 10px 0; color: #1e293b;">${mobileNumber}</td>
          </tr>
        </table>

        <div style="margin-top: 25px; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 4px; font-size: 13px; line-height: 1.5; color: #0369a1;">
          <strong>What's Next?</strong> Our clinical coordinator will reach out to you via call or WhatsApp message within 15 minutes of operating hours to lock in your precise slot.
        </div>

        <p style="font-size: 12px; color: #64748b; margin-top: 30px; text-align: center; line-height: 1.5;">
          If you need to make immediate changes, please reply to this email or call our desk directly.<br/>
          Thank you for choosing us for your care.
        </p>
      </div>
      <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
        This is a patient confirmation copy. Please keep it for your reference.
      </div>
    </div>
  `;

  const smtpTransporter = getTransporter();

  if (smtpTransporter) {
    try {
      // 1. Dispatch Email to Doctor / Clinic
      console.log(`Sending clinical notification to doctor: ${targetDoctorEmail}`);
      await smtpTransporter.sendMail({
        from: `"${fullName} (via Clinic Desk)" <${process.env.SMTP_USER}>`,
        to: targetDoctorEmail,
        replyTo: patientEmail || undefined,
        subject: `🚨 [New Appointment Request] ${fullName} - ${specialtyName}`,
        html: doctorHtml,
      });

      // 2. Dispatch Confirmation Copy to Patient (if email provided)
      if (patientEmail) {
        console.log(`Sending patient receipt to: ${patientEmail}`);
        await smtpTransporter.sendMail({
          from: `"Clinical Suite Admin" <${process.env.SMTP_USER}>`,
          to: patientEmail,
          subject: `📋 Appointment Request Received: Dr. ${doctorName}`,
          html: patientHtml,
        });
      }

      return res.json({
        success: true,
        message: "Booking submitted. Real-time emails successfully dispatched!",
      });

    } catch (err: any) {
      console.error("❌ Nodemailer send error: ", err);
      // Even if email sending fails due to invalid/blocked SMTP credentials, we return success: true to the user,
      // but return information about the email error so it doesn't brick the user interface.
      return res.json({
        success: true,
        emailError: err.message,
        message: "Booking submitted in system, but failed to dispatch real-time email. Please check your SMTP credentials in Nestify.",
      });
    }
  } else {
    // SMTP is not configured. Log the contents beautifully so developer/user can see it in terminal logs.
    console.log("=================================================");
    console.log("📨 SIMULATED EMAIL DELIVERED (SMTP not configured)");
    console.log(`To Doctor (${targetDoctorEmail}): Booking notification`);
    if (patientEmail) {
      console.log(`To Patient (${patientEmail}): Booking confirmation copy`);
    }
    console.log("=================================================");

    return res.json({
      success: true,
      smtpConfigured: false,
      message: `Booking request registered. (Simulation: Email would be sent to Doctor: ${targetDoctorEmail} and Patient: ${patientEmail || "N/A"})`,
    });
  }
});

// Vite server middleware for development / serving static files for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files serving loaded.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access local dev site on: http://localhost:${PORT}`);
  });
}

startServer();
