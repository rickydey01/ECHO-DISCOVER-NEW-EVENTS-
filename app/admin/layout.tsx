import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECHO Studio — Owner Admin & Business Analytics",
  description: "Executive management, live ticket inventory, sales analytics, and full-site CMS control center.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="echo-admin-wrapper">{children}</div>;
}
