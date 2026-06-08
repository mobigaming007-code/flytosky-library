"use client";

import { trackResourceEvent } from "@/lib/track";
import { useEffect } from "react";

export default function ResourceTracker({
  resourceId,
  slug,
}: {
  resourceId?: string;
  slug: string;
}) {
  useEffect(() => {
    trackResourceEvent({
      resourceId,
      slug,
      eventType: "view",
    });
  }, [resourceId, slug]);

  return null;
}
