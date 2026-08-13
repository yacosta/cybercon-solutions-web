/**
 * Homepage CRO experiment registry (Aug 2026 conversion audit).
 *
 * Arms: Control (C), Variant 1 (V1), Variant 2 (V2).
 * Default bandit weights: C 25% / V1 30% / V2 45%.
 * Assignment is sticky in localStorage; QA override via `?cro-00N=V1`.
 */

export type CroArm = 'C' | 'V1' | 'V2';

export type CroExperimentId =
  | 'cro-001'
  | 'cro-002'
  | 'cro-003'
  | 'cro-004'
  | 'cro-005'
  | 'cro-006'
  | 'cro-007'
  | 'cro-008'
  | 'cro-009';

export type CroExperiment = {
  id: CroExperimentId;
  name: string;
  components: string[];
  active: boolean;
  weights: Record<CroArm, number>;
};

export const CRO_STORAGE_PREFIX = 'cybercon-cro-arm:';

export const CRO_DEFAULT_WEIGHTS: Record<CroArm, number> = {
  C: 0.25,
  V1: 0.3,
  V2: 0.45,
};

export const CRO_EXPERIMENTS: CroExperiment[] = [
  {
    id: 'cro-001',
    name: 'Homepage Hero — Industry Persona Tabs',
    components: ['hero-personas'],
    active: true,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
  {
    id: 'cro-002',
    name: 'Homepage — Sticky Mobile CTA Bar',
    components: ['sticky-mobile-cta'],
    active: true,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
  {
    id: 'cro-003',
    name: "Homepage — What's Your Biggest IT Problem?",
    components: ['problem-selector'],
    active: true,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
  {
    id: 'cro-004',
    name: 'Homepage — Case Study Proof Bar',
    components: ['case-study-proof'],
    active: true,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
  {
    id: 'cro-005',
    name: "Homepage Nav — Services Mega-Menu Start Here",
    components: ['services-mega-start'],
    active: false,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
  {
    id: 'cro-006',
    name: 'Homepage — IT Risk Self-Assessment Quiz',
    components: ['it-risk-quiz'],
    active: false,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
  {
    id: 'cro-007',
    name: 'Homepage Hero — Dual CTA Buttons',
    components: ['hero-dual-cta'],
    active: false,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
  {
    id: 'cro-008',
    name: 'Homepage — MSP vs In-House vs Break-Fix Table',
    components: ['services-comparison'],
    active: false,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
  {
    id: 'cro-009',
    name: 'Homepage — ROI Savings Calculator',
    components: ['roi-calculator'],
    active: false,
    weights: { ...CRO_DEFAULT_WEIGHTS },
  },
];

export function getCroExperiment(id: string): CroExperiment | undefined {
  return CRO_EXPERIMENTS.find((experiment) => experiment.id === id);
}

export function activeCroExperiments(): CroExperiment[] {
  return CRO_EXPERIMENTS.filter((experiment) => experiment.active);
}

export function parseCroArm(value: string | null | undefined): CroArm | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  if (normalized === 'C' || normalized === 'CONTROL') return 'C';
  if (normalized === 'V1' || normalized === '1') return 'V1';
  if (normalized === 'V2' || normalized === '2') return 'V2';
  return null;
}

export function drawCroArm(
  weights: Record<CroArm, number>,
  random: () => number = Math.random,
): CroArm {
  const entries = (Object.entries(weights) as [CroArm, number][]).filter(
    ([, weight]) => weight > 0,
  );
  if (entries.length === 0) return 'C';
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let ticket = random() * total;
  for (const [arm, weight] of entries) {
    ticket -= weight;
    if (ticket <= 0) return arm;
  }
  return entries[entries.length - 1][0];
}
