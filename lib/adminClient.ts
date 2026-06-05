export type AdminUser = {
  email: string;
  name: string;
  role: string;
};

export type AdminResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function getAdminToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("flytosky_admin_token") || "";
}

export function setAdminToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("flytosky_admin_token", token);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("flytosky_admin_token");
}

export async function adminRequest<T>(
  action: string,
  payload: Record<string, unknown> = {},
): Promise<T> {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      token: getAdminToken(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      ...payload,
    }),
  });

  const json = (await res.json()) as AdminResponse<T>;

  if (!json.success) {
    throw new Error(json.error || "Admin API lỗi.");
  }

  return json.data as T;
}
