export type TrackEventType = "view" | "read" | "listen" | "open_original";

export async function trackResourceEvent({
  resourceId,
  slug,
  eventType,
}: {
  resourceId?: string;
  slug: string;
  eventType: TrackEventType;
}) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resourceId: resourceId || "",
        slug,
        eventType,
        path: typeof window !== "undefined" ? window.location.pathname : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }),
    });
  } catch {
    // Không làm gián đoạn trải nghiệm người dùng nếu tracking lỗi.
  }
}
