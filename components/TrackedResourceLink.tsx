"use client";

import { trackResourceEvent, type TrackEventType } from "@/lib/track";

export default function TrackedResourceLink({
  href,
  resourceId,
  slug,
  eventType,
  children,
  className = "",
}: {
  href: string;
  resourceId?: string;
  slug: string;
  eventType: TrackEventType;
  children: React.ReactNode;
  className?: string;
}) {
  async function handleClick() {
    await trackResourceEvent({
      resourceId,
      slug,
      eventType,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
