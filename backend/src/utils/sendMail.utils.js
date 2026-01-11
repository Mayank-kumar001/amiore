import nodemailer from "nodemailer"
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);  

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Wrap in an async IIFE so we can use await.
// const sendMail = async (data) => {
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
//     to: "bar@example.com, baz@example.com",
//     subject: "Hello ✔",
//     text: `${data}`, // plain‑text body
//     html: `<b>${data}</b>`, // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// };


const sendMail = async (otp, email) => {
  console.log(email)
  try {
    const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: 'mayankiit01aasmaa@gmail.com',
    subject: 'Amiore verification OTP',
    html: `<strong>${otp}</strong>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
  } catch (error) {
    console.log(error)
  }
}


export default sendMail
