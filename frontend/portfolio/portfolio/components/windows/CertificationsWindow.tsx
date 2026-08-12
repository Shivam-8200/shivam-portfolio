"use client";

import { Award } from "lucide-react";

export default function CertificationsWindow() {
  const certifications = [
    {
      name: "AWS Academy Cloud Developer Virtual Internship",
      issuer: "AWS Academy / EduSkills Foundation",
    },
    {
      name: "AICTE Virtual Internship",
      issuer: "AICTE",
    },
  ];

  return (
    <div className="h-full">
      <div className="mb-5">
        <div
          className="display text-xl font-semibold"
          style={{ color: "var(--text)" }}
        >
          Certifications
        </div>

        <p
          className="text-xs mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          Courses and professional certifications.
        </p>
      </div>

      <div className="space-y-3">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(125,211,252,0.18), rgba(167,139,250,0.16))",
                  color: "var(--accent)",
                }}
              >
                <Award size={20} />
              </div>

              <div>
                <h2
                  className="display text-base font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {cert.name}
                </h2>

                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {cert.issuer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}