import Link from "next/link";
import {
  CheckCircle2,
  ClipboardList,
  Database,
  Eye,
  Lock,
  Mail,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";

const sections = [
  {
    icon: ClipboardList,
    title: "1. Information We Collect",
    points: [
      "We collect the details you submit in the Dev-Team application, including your name, email address, selected role, GitHub profile, portfolio link, past work, and contribution interests.",
      "We may review public technical profiles, repositories, project links, or portfolio pages that you provide to understand your experience.",
      "We do not ask for passwords, private access tokens, financial details, government IDs, or confidential employer information for Dev-Team applications.",
    ],
  },
  {
    icon: Eye,
    title: "2. How We Use Your Information",
    points: [
      "We use application information to review your Dev-Team fit, evaluate relevant skills, and contact you about your application.",
      "We may use your contribution interests to match you with suitable open-source tasks, maintainers, repositories, or review areas.",
      "We may use aggregated, non-identifying information to understand program demand, skill distribution, and contributor onboarding needs.",
    ],
  },
  {
    icon: Users,
    title: "3. Who Can Access It",
    points: [
      "Application details may be reviewed by Teleroot maintainers, program reviewers, and team members responsible for Dev-Team coordination.",
      "We do not sell Dev-Team applicant data or share it with advertisers.",
      "If a project requires collaboration with trusted maintainers, only the information reasonably needed for review or onboarding may be shared.",
    ],
  },
  {
    icon: Database,
    title: "4. Storage And Retention",
    points: [
      "We keep application information only for as long as needed to review applications, manage participation, improve onboarding, or satisfy reasonable operational requirements.",
      "If your application is not accepted, we may retain limited information to avoid duplicate reviews and improve future program decisions.",
      "You may request deletion of your Dev-Team application information by contacting Teleroot.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "5. Security Practices",
    points: [
      "We use reasonable administrative and technical safeguards to protect Dev-Team application information.",
      "No online system is perfectly secure, so applicants should avoid submitting secrets, private customer data, confidential code, or sensitive employer material.",
      "Security-related reports should be shared through approved Teleroot channels rather than public comments or application fields.",
    ],
  },
  {
    icon: Trash2,
    title: "6. Your Choices",
    points: [
      "You can choose not to submit optional portfolio, GitHub, or project links, although doing so may limit our ability to evaluate your application.",
      "You can request correction or deletion of Dev-Team application information where reasonably possible.",
      "If you no longer want to participate in the Dev-Team Program, you can contact Teleroot to request removal from active program communications.",
    ],
  },
];

export default function DevTeamPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#030813] text-white">
      <section className="sticky top-0 z-50 min-h-[150px] overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#030813_0%,#08111b_54%,#062214_100%)] shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(36,255,117,0.12),transparent_38%)]" />

        <div className="relative mx-auto flex min-h-[150px] max-w-6xl flex-col px-6 py-4 sm:px-8">
          <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center text-center">
            <span className="mb-2 inline-flex rounded-[8px] bg-[#10202a]/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#24ff75]">
              Dev-Team Program
            </span>
            <h1 className="text-xl font-black leading-tight tracking-tight sm:text-2xl lg:text-3xl">
              Privacy Policy
            </h1>
            <p className="mt-2 max-w-2xl text-[11px] leading-5 text-slate-200 sm:text-xs">
              This policy explains how Teleroot handles information submitted by Dev-Team applicants and contributors during application review, onboarding, and program participation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-[10px] border border-white/10 bg-white/[0.03] p-5 lg:sticky lg:top-[174px]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#24ff75]">Privacy Overview</p>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <p>
              This page applies only to Dev-Team applications and participation. It does not replace product, billing, or general website privacy terms.
            </p>
            <div className="rounded-[8px] border border-[#24ff75]/20 bg-[#24ff75]/5 p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                <Lock className="h-4 w-4 text-[#24ff75]" />
                Applicant Safety
              </div>
              <p className="text-xs leading-5 text-slate-400">
                Do not submit secrets, private customer data, or confidential employer material in the Dev-Team form.
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[10px] border border-white/10 bg-[#08111b] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#24ff75]/10 text-[#24ff75]">
                  <section.icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-black text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#24ff75]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 sm:px-8">
        <div className="grid gap-4 rounded-[10px] border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-xl font-black">Privacy Questions?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Contact Teleroot if you need to update, correct, or delete Dev-Team application information.
            </p>
          </div>
          <Link
            href="mailto:privacy@teleroot.com"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#16b957] px-5 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#24c862]"
          >
            <Mail className="h-4 w-4" />
            Contact
          </Link>
        </div>
      </section>
    </main>
  );
}
