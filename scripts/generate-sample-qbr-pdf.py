#!/usr/bin/env python3
"""Generate the anonymized Cybercon sample QBR PDF for public download."""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "public" / "downloads" / "cybercon-sample-qbr-anonymized.pdf"

NAVY = (15, 44, 76)
CORAL = (232, 93, 79)
MUTED = (74, 96, 117)
BODY = (45, 55, 72)
RULE = (210, 218, 226)
LIGHT = (247, 249, 251)


class QBRPdf(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 6, "Cybercon Solutions  |  Sample QBR (Anonymized)  |  Confidential sample", align="L")
        self.ln(8)
        self.set_draw_color(*RULE)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(4)

    def footer(self):
        self.set_y(-14)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 8, f"Page {self.page_no()}/{{nb}}  |  Not a real client record  |  cybercon-solutions.com", align="C")

    def h1(self, text):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 18)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def h2(self, text):
        self.ln(3)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def h3(self, text):
        self.ln(1)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(0.5)

    def body(self, text):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*BODY)
        self.multi_cell(0, 5.2, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def bullet(self, text, indent=0):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*BODY)
        x = self.l_margin + indent
        self.set_x(x)
        w = self.w - self.r_margin - x
        self.multi_cell(w, 5.2, f"-  {text}", new_x="LMARGIN", new_y="NEXT")

    def decision_box(self, title, decision, owner, due, status):
        self.ln(1)
        if self.get_y() > 250:
            self.add_page()
        self.set_fill_color(*LIGHT)
        self.set_draw_color(*RULE)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 5.5, title, fill=True, new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*BODY)
        self.multi_cell(0, 5, f"Decision: {decision}", fill=True, new_x="LMARGIN", new_y="NEXT")
        self.multi_cell(
            0,
            5,
            f"Owner: {owner}    Due: {due}    Status: {status}",
            fill=True,
            new_x="LMARGIN",
            new_y="NEXT",
        )
        self.ln(2)

    def kpi_row(self, label, value, note):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*BODY)
        self.multi_cell(0, 5.2, f"{label}:  {value}  -  {note}", new_x="LMARGIN", new_y="NEXT")


def build():
    pdf = QBRPdf(format="Letter")
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_margins(18, 16, 18)
    pdf.add_page()

    # Cover band
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, 216, 42, "F")
    pdf.set_xy(18, 12)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 6, "CYBERCON SOLUTIONS")
    pdf.set_xy(18, 20)
    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(0, 8, "Sample Quarterly Business Review")
    pdf.set_xy(18, 30)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 6, "Anonymized mid-market example  |  Managed IT + vCIO cadence")

    pdf.set_y(50)
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "This document is a realistic sample packet Cybercon would use in a managed IT QBR. "
        "Client name, locations, and figures are fictionalized/anonymized composites drawn from "
        "typical mid-market engagements. It is provided so buyers can see what decision-oriented "
        "reporting looks like - not dashboard tourism.",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.ln(3)

    pdf.h2("1. Engagement snapshot")
    pdf.body("Client (anonymized): Harborline Services Group - multi-site professional services operator, ~145 users across 4 South Florida locations.")
    pdf.body("Period: Q2 2026 (Apr 1 - Jun 30)    Review date: Jul 15, 2026    Prepared by: Cybercon Solutions (Managed IT lead + vCIO)")
    pdf.body("Attendees (typical): Owner / COO, Finance manager, Office operations lead, Cybercon service lead")

    pdf.h2("2. What changed in the business")
    pdf.bullet("Opened a 5th site in Plantation (12 users) - network and identity onboarding completed May 12.")
    pdf.bullet("Finance migrating AP approvals to a new SaaS workflow in Q3 - needs SSO + conditional access.")
    pdf.bullet("Cyber insurance renewal due Aug 31 - carrier questionnaire requires MFA evidence for all remote access and a documented restore test within 12 months.")
    pdf.bullet("Seasonal volume spike expected August-September; warehouse scanners must stay online during receiving hours.")

    pdf.h2("3. Operating performance (SLA / KPI)")
    pdf.h3("Service levels")
    pdf.kpi_row("P1 response (15 min)", "Met 100%", "2 P1s this quarter")
    pdf.kpi_row("P1 restore (4 hr)", "Met 1 / Missed 1", "See incident brief below")
    pdf.kpi_row("P2 response (1 hr)", "Met 97%", "Below 98% target by 1 ticket")
    pdf.kpi_row("P3/P4 resolve (3-5 bd)", "Met 94%", "Aging driven by vendor hold")
    pdf.ln(2)
    pdf.h3("Business-facing KPIs")
    pdf.kpi_row("Major incidents", "2", "Email auth outage (42 min); scanner VLAN issue (3.5 hr)")
    pdf.kpi_row("Recurring themes", "3", "VPN flakiness; printer mappings; mailbox permissions")
    pdf.kpi_row("Patch compliance", "96%", "Target 98% - 7 laptops offline >14 days")
    pdf.kpi_row("EDR healthy coverage", "99%", "1 loaner laptop missing agent - fixed Jul 8")
    pdf.kpi_row("MFA (email + remote)", "93%", "Vendor accounts still password-only - decision #1")
    pdf.kpi_row("Backup job success", "99.1%", "1 failed job on FILE-02 - remediated")
    pdf.kpi_row("Last restore test", "May 28, 2026", "FILE-02 sample restore - success (47 min)")
    pdf.kpi_row("New-hire ready (std)", "1.2 days avg", "Target <= 1 business day - process tweak")
    pdf.kpi_row("Access revoke (term)", "Same day", "4 terminations; all SaaS/VPN revoked < 4 hours")

    pdf.h2("4. Major incident briefs")
    pdf.h3("INC-2461 - Microsoft 365 auth degradation (May 3)")
    pdf.body("Impact: ~80 users unable to sign in for 42 minutes during morning peak. Root cause: tenant conditional access change conflicted with legacy mail client on warehouse floor shared PC. Fix: updated CA policy + replaced legacy client. Prevention: change window + pilot group for identity changes.")
    pdf.h3("INC-2510 - Plantation scanner VLAN mis-route (Jun 18)")
    pdf.body("Impact: receiving delayed 3.5 hours at new site. Root cause: switch port profile copied from guest VLAN during rushed open. Fix: corrected VLAN + documented port standards. Prevention: site-open checklist item added; dual-tech verification on go-live day.")

    pdf.h2("5. Risk & resilience (ranked)")
    pdf.bullet("HIGH - 11 vendor/contractor accounts still reach VPN without MFA. Insurance renewal will flag this.")
    pdf.bullet("HIGH - Firewall pair at HQ is end-of-support in November 2026; spare parts scarce.")
    pdf.bullet("MEDIUM - FILE-02 is single point of failure for shared department drives; cloud migration scoped but not funded.")
    pdf.bullet("MEDIUM - 7 endpoints offline >14 days (patch/EDR drift). Likely stored/loaner devices.")
    pdf.bullet("LOW - Guest Wi-Fi SSID naming inconsistent across sites; cleanup scheduled in retainer.")

    pdf.add_page()
    pdf.h2("6. Roadmap status")
    pdf.h3("Funded / in progress")
    pdf.bullet("Plantation site stabilization - complete")
    pdf.bullet("Identity cleanup (shared admin retirement) - 80% complete; finish by Jul 31")
    pdf.bullet("Backup immutability options review - proposal ready for decision #3")

    pdf.h3("Recommended next (Q3)")
    pdf.bullet("Enforce MFA on all VPN/vendor access before insurance questionnaire (Aug)")
    pdf.bullet("Replace HQ firewall pair (quote attached in appendix for real engagements)")
    pdf.bullet("SSO + conditional access for new AP SaaS")

    pdf.h3("Parked with revisit date")
    pdf.bullet("Full file-server to SharePoint migration - revisit Oct 2026 after AP project settles")
    pdf.bullet("Warehouse handheld refresh - revisit Jan 2027 unless failure rate rises")

    pdf.h2("7. Decisions needed this QBR")
    pdf.body("These are the point of the meeting. Sample outcomes below show how a real QBR should end - with named owners and dates, not 'we'll look into it.'")

    pdf.decision_box(
        "Decision A - Vendor / contractor MFA on VPN",
        "APPROVED - Enforce MFA for all non-employee VPN accounts by Aug 15. Temporary break-glass accounts limited to 2, reviewed monthly.",
        "Cybercon (impl) / COO (exception approval)",
        "Aug 15, 2026",
        "Approved in-meeting",
    )
    pdf.decision_box(
        "Decision B - HQ firewall replacement window",
        "APPROVED IN CONCEPT - Fund replacement in FY26 Q3 capital. Change window: Sat Sep 12, 01:00-05:00. Dual ISP failover test included.",
        "Finance (PO) / Cybercon (cutover)",
        "PO by Aug 20; cutover Sep 12",
        "Approved - pending PO",
    )
    pdf.decision_box(
        "Decision C - FILE-02 resilience spend",
        "DEFERRED - Keep quarterly restore tests; revisit cloud file migration in October after AP SaaS go-live. Accepted risk documented for insurance file.",
        "Owner / Cybercon vCIO",
        "Revisit Oct 14, 2026",
        "Deferred with date",
    )
    pdf.decision_box(
        "Decision D - After-hours onsite retainer for peak season",
        "APPROVED - Add Aug-Sep Saturday onsite window (4 hours) for scanner/network issues at Plantation + HQ. Review necessity in October QBR.",
        "Operations / Cybercon",
        "Coverage starts Aug 1",
        "Approved in-meeting",
    )
    pdf.decision_box(
        "Decision E - CRM platform replacement RFP",
        "DECLINED FOR NOW - Not a technology emergency; sales process ownership unclear. Revisit if sales leadership assigns a business owner.",
        "COO",
        "No date until owner named",
        "Declined / parked",
    )

    pdf.h2("8. Commercial snapshot")
    pdf.bullet("Users under management: 145 -> 157 after Plantation (billing adjusted June)")
    pdf.bullet("Retainer: per-user managed IT (help desk, monitoring, patching, onsite as scoped)")
    pdf.bullet("Outside-retainer this quarter: Plantation switch/cabling project (closed); firewall hardware quote pending PO")
    pdf.bullet("Renewals inside 180 days: cyber insurance (Aug 31); primary circuit HQ (Oct 15); Microsoft NCE anniversary (Nov 1)")

    pdf.h2("9. Next quarter focus (Q3 draft)")
    pdf.bullet("Close MFA gaps before insurance questionnaire submission")
    pdf.bullet("Execute firewall cutover with measured downtime")
    pdf.bullet("Support AP SaaS SSO without weakening conditional access")
    pdf.bullet("Drive patch compliance to >=98% by retiring/reimaging ghost endpoints")
    pdf.bullet("Keep QBR packet to one decision-ready narrative - continue excluding vanity charts")

    pdf.ln(4)
    pdf.set_draw_color(*CORAL)
    pdf.set_line_width(0.6)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
    pdf.ln(3)
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(0, 6, "Want this cadence for your organization?", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*BODY)
    pdf.multi_cell(
        0,
        5.2,
        "Cybercon Solutions provides managed IT and vCIO reporting for South Florida mid-market teams: "
        "SLAs tied to business impact, KPIs that expose risk, and quarterly reviews that end in decisions. "
        "Book a free assessment at https://cybercon-solutions.com/assessment/",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.ln(2)
    pdf.set_font("Helvetica", "I", 8.5)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        4.5,
        "Disclaimer: Figures and entity names are anonymized samples for illustration. "
        "They do not represent a specific named client engagement.",
        new_x="LMARGIN",
        new_y="NEXT",
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(OUT)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
