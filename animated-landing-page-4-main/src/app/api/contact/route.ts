import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function getEnv(name: string, fallback?: string): string | undefined {
  const value = process.env[name];
  return value ?? fallback;
}

async function createTransport() {
  const host = getEnv("SMTP_HOST");
  const portString = getEnv("SMTP_PORT");
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");

  // Use Ethereal in development if SMTP is not configured
  if (!host || !portString || !user || !pass) {
    if (process.env.NODE_ENV !== "production") {
      const testAccount = await nodemailer.createTestAccount();
      return {
        transport: nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: { user: testAccount.user, pass: testAccount.pass },
        }),
        dev: true as const,
      };
    }
    throw new Error(
      "SMTP credentials are not set. Configure SMTP_* environment variables."
    );
  }

  const port = Number(portString);
  return {
    transport: nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    }),
    dev: false as const,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fromAddress = getEnv("SMTP_FROM", email) as string;
    const toAddress = getEnv("CONTACT_TO_EMAIL", getEnv("SMTP_FROM", email));
    if (!toAddress) {
      return NextResponse.json(
        { ok: false, error: "Recipient email not configured" },
        { status: 500 }
      );
    }

    const { transport, dev } = await createTransport();

    const subject = `New contact from ${name}`;
    const text = `You have received a new contact form submission.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #111827;">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; background:#f9fafb; padding:12px; border-radius:8px;">${message}</pre>
      </div>
    `;

    const info = await transport.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject,
      text,
      html,
    });

    const previewUrl = dev ? nodemailer.getTestMessageUrl(info) ?? undefined : undefined;

    return NextResponse.json({ ok: true, dev, previewUrl });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}


