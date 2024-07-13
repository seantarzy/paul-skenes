import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.method", req.method);
  if (req.method === "POST") {
    const { subject, message, fromEmail } = req.body;

    // Validate the input
    if (!subject || !message || !fromEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: fromEmail,
      to: process.env.EMAIL, // Your email
      subject: `Contact Form: ${subject}`,
      text: message
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
};

export default handler;
