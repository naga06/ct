import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Instantiated inside the handler so it only runs at request time (not build time)
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, organisation, sector } = body;

    if (!email || !name || !organisation) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: `CyberTwinX Briefings <${process.env.BRIEFING_FROM_EMAIL}>`,
      to: [process.env.BRIEFING_TO_EMAIL!],
      replyTo: email,
      subject: `[Briefing Request] ${name} — ${organisation}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Briefing Request</title>
        </head>
        <body style="margin:0;padding:0;background:#0a0f1a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#0f1623;border:1px solid #1e2d40;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0d2137 0%,#0a1525 100%);padding:32px 40px;border-bottom:1px solid #1e2d40;">
                      <p style="margin:0 0 8px;font-size:11px;font-family:monospace;letter-spacing:0.15em;text-transform:uppercase;color:#2dd4bf;">
                        CyberTwinX — Executive Briefing Program
                      </p>
                      <h1 style="margin:0;font-size:24px;font-weight:700;color:#f0f6ff;line-height:1.2;">
                        New Briefing Request
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:32px 40px;">
                      <p style="margin:0 0 24px;font-size:14px;color:#8899aa;line-height:1.6;">
                        A new executive briefing request has been submitted. Details below:
                      </p>

                      <!-- Details Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;border:1px solid #1e2d40;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                        <tr>
                          <td style="padding:20px 24px;border-bottom:1px solid #1e2d40;">
                            <p style="margin:0 0 4px;font-size:10px;font-family:monospace;letter-spacing:0.14em;text-transform:uppercase;color:#5a7a99;">Full Name</p>
                            <p style="margin:0;font-size:15px;font-weight:600;color:#f0f6ff;">${name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px 24px;border-bottom:1px solid #1e2d40;">
                            <p style="margin:0 0 4px;font-size:10px;font-family:monospace;letter-spacing:0.14em;text-transform:uppercase;color:#5a7a99;">Work Email</p>
                            <p style="margin:0;font-size:15px;color:#2dd4bf;">
                              <a href="mailto:${email}" style="color:#2dd4bf;text-decoration:none;">${email}</a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px 24px;border-bottom:1px solid #1e2d40;">
                            <p style="margin:0 0 4px;font-size:10px;font-family:monospace;letter-spacing:0.14em;text-transform:uppercase;color:#5a7a99;">Organisation</p>
                            <p style="margin:0;font-size:15px;font-weight:600;color:#f0f6ff;">${organisation}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px 24px;">
                            <p style="margin:0 0 4px;font-size:10px;font-family:monospace;letter-spacing:0.14em;text-transform:uppercase;color:#5a7a99;">Sector</p>
                            <p style="margin:0;font-size:14px;color:#f0f6ff;">
                              <span style="display:inline-block;background:#2dd4bf18;color:#2dd4bf;border:1px solid #2dd4bf40;border-radius:4px;padding:2px 10px;font-family:monospace;font-size:12px;">
                                ${sector}
                              </span>
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}?subject=Re: CyberTwinX Executive Briefing Request"
                               style="display:inline-block;background:#2dd4bf;color:#03090f;font-size:13px;font-weight:700;padding:12px 28px;border-radius:6px;text-decoration:none;letter-spacing:0.04em;">
                              Reply to ${name}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 40px;border-top:1px solid #1e2d40;">
                      <p style="margin:0;font-size:11px;color:#3a5060;font-family:monospace;text-align:center;">
                        CyberTwinX · Briefing requests are confidential · Under NDA
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("[Briefing API] Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Briefing API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
