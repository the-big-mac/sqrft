import assert from "assert";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendMail = async (to: string, subject: string, html: string) => {
  const {
    EMAIL_HOST: host,
    EMAIL_PORT: port,
    EMAIL_USER: user,
    EMAIL_PASSWORD: pass,
  } = process.env;

  assert(host, "host is required");
  assert(port, "port is required");
  assert(user, "user is required");
  assert(pass, "pass is required");

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port),
    auth: { user, pass },
  } as SMTPTransport.Options);

  const senderName = '"Sqrft" <contact.sqrft@gmail.com>';

  assert(to, "to is required");
  assert(subject, "subject is required");
  assert(html, "html is required");

  await transporter.sendMail({
    from: senderName,
    to,
    subject: subject,
    html: html,
  });

  return;
};

export default sendMail;
