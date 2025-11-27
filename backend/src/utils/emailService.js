import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    const data = await resend.emails.send({
      from: "<taskmanager@resend.dev>",
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error(err);
  }
}
