const normalizeBaseUrl = (value: string | undefined): string => {
  if (value && value.trim().length > 0) {
    return value.endsWith("/") ? value.slice(0, -1) : value;
  }

  if (import.meta.env.DEV) {
    return "http://localhost:8080";
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return "http://localhost:8080";
};

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (data?.message) {
      return data.message;
    }
  } catch {
    // ignore JSON parse errors and fallback below
  }
  return `Erro ${response.status} ao acessar ${response.url}`;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      "Accept": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export { API_BASE_URL };


