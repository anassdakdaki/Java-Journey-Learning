const CAT_FACT_URL = 'https://catfact.ninja/fact';

export async function fetchCatFact(): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(CAT_FACT_URL, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = (await response.json()) as { fact?: string };
    if (!data.fact) {
      throw new Error('Unexpected response shape from cat fact API');
    }
    return data.fact;
  } finally {
    clearTimeout(timeout);
  }
}
