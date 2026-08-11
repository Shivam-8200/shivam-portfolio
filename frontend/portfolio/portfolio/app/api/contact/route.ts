import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Shivam Portfolio <onboarding@resend.dev>",
      to: ["sp.shivamprasad@gmail.com"],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { error: "Failed to send message." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      { error: "Failed to send message. Try again shortly." },
      { status: 500 }
    );
  }
}