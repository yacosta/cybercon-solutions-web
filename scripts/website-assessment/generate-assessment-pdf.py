#!/usr/bin/env python3
"""Render a Cybercon Solutions–branded website deep assessment PDF.

Usage:
  python3 scripts/website-assessment/generate-assessment-pdf.py \\
    --findings path/to/findings.json \\
    --out path/to/report.pdf

Requires: fpdf2 (`pip install fpdf2`)
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

try:
    from fpdf import FPDF
except ImportError:  # pragma: no cover
    sys.stderr.write(
        "Missing dependency: fpdf2\n"
        "Install with: pip install fpdf2\n"
    )
    raise SystemExit(1) from None

# Brand tokens (match src/styles/tokens.css — coral must stay AA on cream/white)
NAVY = (15, 44, 76)  # #0f2c4c
CORAL = (192, 57, 43)  # #c0392b
MUTED = (90, 107, 123)  # #5a6b7b
BODY = (45, 55, 72)
RULE = (210, 218, 226)
CREAM = (247, 244, 241)  # #f7f4f1
LIGHT = (247, 249, 251)
WHITE = (255, 255, 255)

# Horizontal lockup (dark wordmark + coral mark) — for light backgrounds only.
REPO_ROOT = Path(__file__).resolve().parents[2]
LOGO_CANDIDATES = (
    REPO_ROOT / "public" / "cybercon-solutions-logo-email-2x.png",
    REPO_ROOT / "public" / "brand" / "cybercon-solutions-logo-email-2x.png",
    REPO_ROOT / "public" / "cybercon-solutions-logo.png",
    REPO_ROOT / "public" / "brand" / "cybercon-solutions-logo.png",
)


def _logo_path() -> Path | None:
    for path in LOGO_CANDIDATES:
        if path.is_file():
            return path
    return None

GRADE_FILL = {
    "A": (46, 125, 90),
    "B": (56, 112, 92),
    "C": (180, 120, 40),
    "D": (192, 57, 43),
    "F": (140, 30, 30),
    "N": (90, 107, 123),
}

SEVERITY_LABEL = {
    "high": "HIGH",
    "medium": "MEDIUM",
    "low": "LOW",
    "info": "INFO",
}


def _safe(text: object) -> str:
    if text is None:
        return ""
    # Helvetica core fonts are Latin-1; normalize common punctuation.
    s = str(text)
    replacements = {
        "\u2014": "-",
        "\u2013": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2022": "-",
        "\u00a0": " ",
        "\u2192": "->",
    }
    for src, dst in replacements.items():
        s = s.replace(src, dst)
    return s.encode("latin-1", "replace").decode("latin-1")


def _slug(domain: str) -> str:
    return re.sub(r"[^a-z0-9.-]+", "-", domain.lower()).strip("-") or "site"


class AssessmentPdf(FPDF):
    def __init__(self, meta: dict):
        super().__init__(format="Letter")
        self.meta = meta
        self.client_label = _safe(
            meta.get("clientName") or meta.get("domain") or "Website assessment"
        )
        self.domain = _safe(meta.get("domain") or "")

    def header(self):
        if self.page_no() == 1:
            return
        logo = _logo_path()
        y0 = self.get_y()
        text_x = self.l_margin
        if logo is not None:
            # Compact lockup in running headers (dark logo on white page).
            self.image(str(logo), x=self.l_margin, y=y0, h=6)
            text_x = self.l_margin + 32
        self.set_xy(text_x, y0 + 0.5)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        conf = "Confidential  |  " if self.meta.get("confidential", True) else ""
        self.cell(
            0,
            6,
            f"Website deep assessment  |  {conf}{self.client_label}",
            align="L",
        )
        self.set_y(y0 + 8)
        self.set_draw_color(*RULE)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(4)

    def footer(self):
        self.set_y(-14)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.cell(
            0,
            8,
            f"Page {self.page_no()}/{{nb}}  |  cybercon-solutions.com  |  Technology, handled.",
            align="C",
        )

    def h2(self, text: str):
        self.ln(3)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 7, _safe(text), new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*CORAL)
        self.set_line_width(0.5)
        y = self.get_y()
        self.line(self.l_margin, y, self.l_margin + 28, y)
        self.ln(3)

    def h3(self, text: str):
        self.ln(1)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 10.5)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 6, _safe(text), new_x="LMARGIN", new_y="NEXT")
        self.ln(0.5)

    def body(self, text: str):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*BODY)
        self.multi_cell(0, 5.2, _safe(text), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def bullet(self, text: str, indent: float = 0):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*BODY)
        x = self.l_margin + indent
        self.set_x(x)
        w = self.w - self.r_margin - x
        self.multi_cell(w, 5.2, f"-  {_safe(text)}", new_x="LMARGIN", new_y="NEXT")

    def ensure_space(self, needed: float = 40):
        if self.get_y() > self.h - self.b_margin - needed:
            self.add_page()


def draw_cover(pdf: AssessmentPdf, data: dict):
    meta = data["meta"]
    # Light strip for the full-color lockup (logo is dark-on-light).
    pdf.set_fill_color(*WHITE)
    pdf.rect(0, 0, 216, 28, "F")
    logo = _logo_path()
    if logo is not None:
        # ~1520x320 lockup → keep ~18mm tall, width scales (~85mm).
        pdf.image(str(logo), x=18, y=5, h=18)
    else:
        pdf.set_xy(18, 10)
        pdf.set_font("Helvetica", "B", 14)
        pdf.set_text_color(*NAVY)
        pdf.cell(0, 8, "CYBERCON SOLUTIONS")

    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 28, 216, 42, "F")
    pdf.set_fill_color(*CORAL)
    pdf.rect(0, 70, 216, 3, "F")

    pdf.set_xy(18, 34)
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 8, "Website Deep Assessment")

    pdf.set_xy(18, 46)
    pdf.set_font("Helvetica", "", 11)
    client = _safe(meta.get("clientName") or meta.get("domain"))
    domain = _safe(meta.get("domain") or "")
    date = _safe(meta.get("assessmentDate") or "")
    pdf.cell(0, 6, f"{client}  |  {domain}  |  {date}")

    pdf.set_xy(18, 56)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(220, 226, 232)
    pdf.cell(0, 5, "Prepared for the customer  |  Evidence-based review  |  Not a certification")

    pdf.set_y(82)
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    url = _safe(meta.get("url") or f"https://{meta.get('domain', '')}")
    locales = meta.get("locales") or []
    locale_s = ", ".join(str(x) for x in locales) if locales else "n/a"
    assessor = _safe(meta.get("assessor") or "Cybercon Solutions")
    pdf.multi_cell(
        0,
        5,
        f"Site: {url}\nLocales reviewed: {locale_s}\nAssessor: {assessor}\n"
        "Scope: SEO, speed, privacy policy, cookie consent, accessibility (WCAG), "
        "security, GDPR, CCPA, ADA / Section 508.",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.ln(2)


def draw_summary(pdf: AssessmentPdf, data: dict):
    pdf.h2("1. Executive summary")
    pdf.body(data.get("executiveSummary") or "")


def draw_scores(pdf: AssessmentPdf, data: dict):
    pdf.h2("2. Scorecard")
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        4.5,
        "Grades A-F reflect evidence gathered in this pass. N = not assessable yet "
        "(missing surface, market scope, or measurement).",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.ln(2)

    col_area = 48
    col_grade = 14
    col_note = pdf.w - pdf.l_margin - pdf.r_margin - col_area - col_grade - 4

    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_x(pdf.l_margin)
    pdf.cell(col_area, 7, " Area", fill=True)
    pdf.cell(col_grade, 7, "Grade", fill=True, align="C")
    pdf.cell(col_note, 7, " Note", fill=True, new_x="LMARGIN", new_y="NEXT")

    for i, row in enumerate(data.get("scores") or []):
        pdf.ensure_space(16)
        area = _safe(row.get("area", ""))
        grade = _safe(str(row.get("grade", "N")).upper()[:1] or "N")
        note = _safe(row.get("note", ""))
        fill = CREAM if i % 2 == 0 else WHITE
        pdf.set_fill_color(*fill)
        pdf.set_text_color(*BODY)
        pdf.set_font("Helvetica", "", 9.5)
        y0 = pdf.get_y()
        pdf.set_x(pdf.l_margin)
        # Estimate note height
        pdf.set_font("Helvetica", "", 9)
        note_h = max(7, pdf.get_string_width(note) / col_note * 5 + 6) if note else 7
        pdf.set_fill_color(*fill)
        pdf.rect(pdf.l_margin, y0, col_area + col_grade + col_note, note_h, "F")
        pdf.set_xy(pdf.l_margin, y0 + 1)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*BODY)
        pdf.cell(col_area, 5, f" {area}")
        gfill = GRADE_FILL.get(grade, MUTED)
        pdf.set_fill_color(*gfill)
        pdf.set_text_color(*WHITE)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_xy(pdf.l_margin + col_area + 1, y0 + 1.2)
        pdf.cell(col_grade - 2, 5, grade, fill=True, align="C")
        pdf.set_xy(pdf.l_margin + col_area + col_grade, y0 + 1)
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(*BODY)
        pdf.multi_cell(col_note, 4.5, note, new_x="LMARGIN", new_y="NEXT")
        if pdf.get_y() < y0 + note_h:
            pdf.set_y(y0 + note_h)
    pdf.ln(2)


def draw_priorities(pdf: AssessmentPdf, data: dict):
    pdf.h2("3. Priority fixes")
    fixes = data.get("priorityFixes") or []
    if not fixes:
        pdf.body("No priority fixes recorded.")
        return
    for i, fix in enumerate(fixes, start=1):
        pdf.ensure_space(28)
        sev = SEVERITY_LABEL.get(str(fix.get("severity", "")).lower(), "INFO")
        title = _safe(fix.get("title", ""))
        detail = _safe(fix.get("detail", ""))
        pdf.set_fill_color(*LIGHT)
        pdf.set_draw_color(*RULE)
        pdf.set_x(pdf.l_margin)
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(
            0,
            5.5,
            f"{i}. [{sev}] {title}",
            fill=True,
            new_x="LMARGIN",
            new_y="NEXT",
        )
        if detail:
            pdf.set_font("Helvetica", "", 9.5)
            pdf.set_text_color(*BODY)
            pdf.multi_cell(0, 5, detail, fill=True, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(2)


def draw_sections(pdf: AssessmentPdf, data: dict):
    pdf.h2("4. Evidence by area")
    for section in data.get("sections") or []:
        pdf.ensure_space(36)
        title = _safe(section.get("title", "Area"))
        grade = _safe(str(section.get("grade", "")).upper())
        heading = f"{title}" + (f"  ({grade})" if grade else "")
        pdf.h3(heading)
        if section.get("summary"):
            pdf.body(section["summary"])
        for finding in section.get("findings") or []:
            pdf.ensure_space(32)
            sev = SEVERITY_LABEL.get(str(finding.get("severity", "info")).lower(), "INFO")
            pdf.set_font("Helvetica", "B", 9.5)
            pdf.set_text_color(*CORAL if sev == "HIGH" else NAVY)
            pdf.set_x(pdf.l_margin)
            pdf.multi_cell(
                0,
                5,
                f"[{sev}] {_safe(finding.get('title', ''))}",
                new_x="LMARGIN",
                new_y="NEXT",
            )
            if finding.get("evidence"):
                pdf.set_font("Helvetica", "", 9)
                pdf.set_text_color(*BODY)
                pdf.multi_cell(
                    0,
                    4.8,
                    f"Evidence: {_safe(finding['evidence'])}",
                    new_x="LMARGIN",
                    new_y="NEXT",
                )
            if finding.get("recommendation"):
                pdf.set_font("Helvetica", "", 9)
                pdf.set_text_color(*BODY)
                pdf.multi_cell(
                    0,
                    4.8,
                    f"Recommendation: {_safe(finding['recommendation'])}",
                    new_x="LMARGIN",
                    new_y="NEXT",
                )
            pdf.ln(1.5)


def draw_next(pdf: AssessmentPdf, data: dict):
    pdf.ensure_space(50)
    pdf.h2("5. Recommended next step")
    next_step = data.get("nextStep") or (
        "Book a Cybercon free assessment follow-up to sequence remediation under "
        "Web Design & Development: https://cybercon-solutions.com/assessment/"
    )
    pdf.body(next_step)
    pdf.ln(2)
    pdf.set_draw_color(*CORAL)
    pdf.set_line_width(0.6)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
    pdf.ln(3)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(0, 6, "Cybercon Solutions", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(*BODY)
    pdf.multi_cell(
        0,
        5,
        "Managed IT, cybersecurity, cloud, AI, and web for South Florida businesses.\n"
        "cybercon-solutions.com  |  info@cybercon-solutions.com  |  (305) 320-5335\n"
        "Tagline: Technology, handled.",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.ln(2)
    pdf.set_font("Helvetica", "I", 8)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        4.2,
        "Disclaimer: This assessment summarizes observations from available public surfaces "
        "and agreed test methods at the time of review. It is not a legal opinion, "
        "compliance certification, or guarantee of courtroom or regulator outcomes. "
        "Grades marked N mean evidence was insufficient to score.",
        new_x="LMARGIN",
        new_y="NEXT",
    )


def build(data: dict, out: Path) -> Path:
    meta = data.get("meta") or {}
    if not meta.get("domain"):
        raise SystemExit("findings.meta.domain is required")

    pdf = AssessmentPdf(meta)
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_margins(18, 16, 18)
    pdf.add_page()

    draw_cover(pdf, data)
    draw_summary(pdf, data)
    draw_scores(pdf, data)
    draw_priorities(pdf, data)
    draw_sections(pdf, data)
    draw_next(pdf, data)

    out.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(out)
    return out


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Generate a Cybercon-branded website deep assessment PDF"
    )
    parser.add_argument(
        "--findings",
        required=True,
        type=Path,
        help="Path to findings JSON (see findings.schema.json)",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Output PDF path (default: artifacts/website-assessment-<domain>.pdf)",
    )
    args = parser.parse_args(argv)

    findings_path = args.findings
    if not findings_path.is_file():
        raise SystemExit(f"Findings file not found: {findings_path}")

    data = json.loads(findings_path.read_text(encoding="utf-8"))
    domain = (data.get("meta") or {}).get("domain") or "site"
    out = args.out or Path("tmp") / f"website-assessment-{_slug(domain)}.pdf"
    written = build(data, out)
    print(f"Wrote {written} ({written.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
