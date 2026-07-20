const ATTIO_API = 'https://api.attio.com/v2';

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.es',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'mail.com',
  'gmx.com',
  'yandex.com',
]);

export interface AssessmentProspect {
  name: string;
  company: string;
  email: string;
  locale?: string;
}

interface AttioRecord {
  id?: { record_id?: string };
}

function attioKey(): string | undefined {
  const key = import.meta.env.ATTIO_API_KEY;
  return typeof key === 'string' && key.trim() ? key.trim() : undefined;
}

export function attioConfigured(): boolean {
  return Boolean(attioKey());
}

function splitName(fullName: string): { first_name: string; last_name: string; full_name: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first_name = parts[0] ?? fullName;
  const last_name = parts.length > 1 ? parts.slice(1).join(' ') : '';
  return { first_name, last_name, full_name: fullName.trim() };
}

function emailDomain(email: string): string | null {
  const domain = email.split('@')[1]?.trim().toLowerCase();
  if (!domain || FREE_EMAIL_DOMAINS.has(domain)) return null;
  return domain;
}

async function attioFetch(path: string, init: RequestInit): Promise<Response> {
  const key = attioKey();
  if (!key) throw new Error('ATTIO_API_KEY is not configured');

  return fetch(`${ATTIO_API}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${key}`,
      accept: 'application/json',
      'content-type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

async function upsertCompany(companyName: string, domain: string | null): Promise<string | null> {
  if (domain) {
    const res = await attioFetch('/objects/companies/records?matching_attribute=domains', {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          values: {
            domains: [{ domain }],
            name: [{ value: companyName }],
            description: [{ value: 'Prospect from cybercon-solutions.com free assessment' }],
          },
        },
      }),
    });
    if (!res.ok) {
      console.error('[attio] company upsert failed', res.status, await res.text());
      return null;
    }
    const json = (await res.json()) as { data?: AttioRecord };
    return json.data?.id?.record_id ?? null;
  }

  // No reliable unique match without a work domain — create a named company record.
  const res = await attioFetch('/objects/companies/records', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        values: {
          name: [{ value: companyName }],
          description: [{ value: 'Prospect from cybercon-solutions.com free assessment' }],
        },
      },
    }),
  });
  if (!res.ok) {
    console.error('[attio] company create failed', res.status, await res.text());
    return null;
  }
  const json = (await res.json()) as { data?: AttioRecord };
  return json.data?.id?.record_id ?? null;
}

async function upsertPerson(
  prospect: AssessmentProspect,
  companyRecordId: string | null,
): Promise<string | null> {
  const name = splitName(prospect.name);
  const locale = prospect.locale === 'es' ? 'es' : 'en';
  const values: Record<string, unknown> = {
    email_addresses: [prospect.email],
    name: [name],
    description: [
      {
        value: `Website prospect — free assessment (${locale}). Company submitted: ${prospect.company}.`,
      },
    ],
  };

  if (companyRecordId) {
    values.company = [
      {
        target_object: 'companies',
        target_record_id: companyRecordId,
      },
    ];
  }

  const res = await attioFetch('/objects/people/records?matching_attribute=email_addresses', {
    method: 'PUT',
    body: JSON.stringify({ data: { values } }),
  });

  if (!res.ok) {
    console.error('[attio] person upsert failed', res.status, await res.text());
    return null;
  }

  const json = (await res.json()) as { data?: AttioRecord };
  return json.data?.id?.record_id ?? null;
}

async function addPersonToProspectsList(personRecordId: string): Promise<void> {
  const listId = import.meta.env.ATTIO_PROSPECTS_LIST_ID;
  if (typeof listId !== 'string' || !listId.trim()) return;

  const res = await attioFetch(`/lists/${encodeURIComponent(listId.trim())}/entries`, {
    method: 'PUT',
    body: JSON.stringify({
      data: {
        parent_record_id: personRecordId,
        parent_object: 'people',
        entry_values: {},
      },
    }),
  });

  if (!res.ok) {
    console.error('[attio] list entry upsert failed', res.status, await res.text());
  }
}

async function createAssessmentNote(
  personRecordId: string,
  prospect: AssessmentProspect,
): Promise<void> {
  const locale = prospect.locale === 'es' ? 'es' : 'en';
  const res = await attioFetch('/notes', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        parent_object: 'people',
        parent_record_id: personRecordId,
        title: 'Website free assessment request',
        format: 'plaintext',
        content: [
          `Name: ${prospect.name}`,
          `Company: ${prospect.company}`,
          `Email: ${prospect.email}`,
          `Locale: ${locale}`,
          'Source: cybercon-solutions.com assessment form',
        ].join('\n'),
      },
    }),
  });

  if (!res.ok) {
    console.error('[attio] note create failed', res.status, await res.text());
  }
}

/** Upsert the form submitter as an Attio person (prospect) linked to a company. */
export async function createAssessmentProspect(prospect: AssessmentProspect): Promise<boolean> {
  if (!attioConfigured()) return false;

  const domain = emailDomain(prospect.email);
  const companyRecordId = await upsertCompany(prospect.company, domain);
  const personRecordId = await upsertPerson(prospect, companyRecordId);

  if (!personRecordId) return false;

  await Promise.all([
    addPersonToProspectsList(personRecordId),
    createAssessmentNote(personRecordId, prospect),
  ]);

  return true;
}
