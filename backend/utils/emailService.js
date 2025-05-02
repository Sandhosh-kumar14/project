import nodemailer from 'nodemailer';

// Function to send a general email
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to send task update email
export const sendTaskUpdateEmail = async ({ to, taskTitle, updatedBy, status, dueDate, taskLink }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Sending email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: `🔄 Task Updated: ${taskTitle}`,
      html: `
        <h3>Task Updated</h3>
        <p><strong>Task:</strong> ${taskTitle}</p>
        <p><strong>Updated by:</strong> ${updatedBy}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Due:</strong> ${dueDate}</p>
        <a href="${taskLink}">Check Update</a>
      `,
    });

    console.log(`✅ Task update email sent to ${to}`);
  } catch (error) {
    console.error("❌ Update email failed:", error);
  }
};

export default sendEmail;
