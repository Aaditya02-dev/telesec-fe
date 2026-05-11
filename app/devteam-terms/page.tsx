import Link from "next/link";
import {
  CheckCircle2,
  Code2,
  GitBranch,
  Lock,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

const sections = [
  {
    icon: Users,
    title: "1. Eligibility And Application Review",
    points: [
      "The Dev-Team Program is open to developers, designers, operators, researchers, and technical contributors who want to support Teleroot's open-source infrastructure work.",
      "You agree to provide accurate details about your identity, skills, portfolio, GitHub profile, and past technical work.",
      "Teleroot may approve, reject, pause, or defer an application based on project needs, contribution fit, conduct history, and available maintainer capacity.",
    ],
  },
  {
    icon: Code2,
    title: "2. Contribution Quality",
    points: [
      "Contributions should be original, relevant, maintainable, and aligned with the technical direction of the project.",
      "You are expected to follow repository guidelines, review feedback, security guidance, and reasonable testing practices.",
      "Submitting an issue, pull request, design, document, or idea does not guarantee acceptance, merge, release, or public promotion.",
    ],
  },
  {
    icon: GitBranch,
    title: "3. Open-Source Rights",
    points: [
      "By submitting code, documentation, designs, or ideas, you confirm that you have the right to share that work.",
      "Accepted contributions may be used, modified, distributed, and maintained under the license of the relevant Teleroot repository.",
      "You retain ownership of your original work, while granting Teleroot and the community the rights required to use it within the project license.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "4. Security And Confidentiality",
    points: [
      "Do not submit secrets, access tokens, customer information, confidential employer materials, or unauthorized third-party code.",
      "If you discover a security concern, report it responsibly instead of posting exploit details publicly.",
      "Program access, private discussions, roadmaps, or review notes may not be shared outside approved Teleroot channels.",
    ],
  },
  {
    icon: CheckCircle2,
    title: "5. Conduct And Collaboration",
    points: [
      "Members must communicate respectfully with maintainers, contributors, applicants, and users.",
      "Harassment, abuse, spam, impersonation, disruptive behavior, or misuse of access may result in removal from the program.",
      "Teleroot may moderate discussions, close submissions, or limit access to keep the program productive and safe.",
    ],
  },
  {
    icon: Lock,
    title: "6. Data Use And Program Changes",
    points: [
      "Application information is used to review eligibility, contact applicants, and manage Dev-Team participation.",
      "Teleroot may update requirements, benefits, project access, review criteria, or these terms as the program evolves.",
      "Continued participation after updates means you accept the latest Dev-Team Terms & Conditions.",
    ],
  },
];

export default function DevTeamTermsPage() {
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
              Terms & Conditions
            </h1>
            <p className="mt-2 max-w-2xl text-[11px] leading-5 text-slate-200 sm:text-xs">
              These terms are written specifically for Teleroot Dev-Team applicants and contributors. They define how applications, contributions, conduct, security, and open-source rights are handled.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-[10px] border border-white/10 bg-white/[0.03] p-5 lg:sticky lg:top-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#24ff75]">Overview</p>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <p>
              This page applies only to the Dev-Team Program. Product subscriptions, payments, and general website terms should be handled separately.
            </p>
            <div className="rounded-[8px] border border-[#24ff75]/20 bg-[#24ff75]/5 p-4">
              <p className="font-semibold text-white">Before applying</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Make sure your submitted work is yours to share and does not include private data or secrets.
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
            <h2 className="text-xl font-black">Questions About Dev-Team Terms?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Contact the Teleroot team before submitting sensitive material, private code, or security-related information.
            </p>
          </div>
          <Link
            href="mailto:devteam@teleroot.com"
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
