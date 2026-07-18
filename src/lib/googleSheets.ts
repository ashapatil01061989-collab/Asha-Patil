import { getAccessToken } from "./googleAuth";

const SPREADSHEET_ID_KEY = "clinical_appointments_spreadsheet_id";

export const getStoredSpreadsheetId = (): string | null => {
  return localStorage.getItem(SPREADSHEET_ID_KEY);
};

export const setStoredSpreadsheetId = (id: string) => {
  localStorage.setItem(SPREADSHEET_ID_KEY, id);
};

export const createAppointmentsSpreadsheet = async (accessToken: string): Promise<string> => {
  const res = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      properties: {
        title: "Clinical Appointment Records",
      },
      sheets: [
        {
          properties: {
            title: "Appointments",
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Failed to create spreadsheet");
  }

  const data = await res.json();
  const spreadsheetId = data.spreadsheetId;

  // Set headers
  const range = "Appointments!A1";
  const values = [
    [
      "Appointment ID",
      "Patient Name",
      "Mobile Number",
      "Email Address",
      "Preferred Date",
      "Preferred Time",
      "Doctor Name",
      "Specialty / Clinic",
      "Patient Type",
      "Symptoms / Notes",
      "Booking Timestamp"
    ]
  ];

  const headerRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ values }),
    }
  );

  if (!headerRes.ok) {
    const err = await headerRes.json();
    throw new Error(err.error?.message || "Failed to write headers to spreadsheet");
  }

  setStoredSpreadsheetId(spreadsheetId);
  return spreadsheetId;
};

export const appendAppointmentToSheet = async (
  booking: {
    id: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    preferredDate: string;
    preferredTime: string;
    doctorName: string;
    specialtyName: string;
    isExisting: string;
    reason: string;
  }
): Promise<{ success: boolean; spreadsheetId?: string; url?: string }> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("User is not authenticated with Google Sheets.");
  }

  let spreadsheetId = getStoredSpreadsheetId();
  if (!spreadsheetId) {
    spreadsheetId = await createAppointmentsSpreadsheet(token);
  }

  const range = "Appointments!A:K";
  const values = [
    [
      booking.id,
      booking.fullName,
      booking.mobileNumber,
      booking.email,
      booking.preferredDate,
      booking.preferredTime,
      booking.doctorName,
      booking.specialtyName,
      booking.isExisting === "yes" ? "Existing" : "New",
      booking.reason || "",
      new Date().toLocaleString()
    ]
  ];

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ values }),
    }
  );

  if (!appendRes.ok) {
    if (appendRes.status === 401 || appendRes.status === 403) {
      throw new Error("Authentication failed or token expired. Please reconnect your Google Account.");
    }
    
    if (appendRes.status === 404) {
      spreadsheetId = await createAppointmentsSpreadsheet(token);
      const retryRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ values }),
        }
      );
      if (!retryRes.ok) {
        const err = await retryRes.json();
        throw new Error(err.error?.message || "Failed to append record after recreation");
      }
    } else {
      const err = await appendRes.json();
      throw new Error(err.error?.message || "Failed to append record to spreadsheet");
    }
  }

  return {
    success: true,
    spreadsheetId,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
  };
};
