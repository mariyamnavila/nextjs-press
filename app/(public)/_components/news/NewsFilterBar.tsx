"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { SparklesIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AVAILABLE_TAGS = [
  "nextjs",
  "react",
  "typescript",
  "tailwind",
  "css",
  "nodejs",
  "prisma",
  "graphql",
];

export function NewsFilterBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedTags: string[] = (() => {
    try {
      const raw = searchParams.get("tags");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const isFeatured = searchParams.get("isFeatured") === "true";

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const toggleTag = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    if (next.length === 0) {
      updateParams("tags", null);
    } else {
      updateParams("tags", JSON.stringify(next));
    }
  };

  const toggleFeatured = () => {
    updateParams("isFeatured", isFeatured ? null : "true");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {AVAILABLE_TAGS.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors"
              data-selected={selected || undefined}
            >
              {selected && <XIcon className="size-3" />}
              {tag}
            </button>
          );
        })}
      </div>

      <div className="h-4 w-px bg-border" />

      <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
        <Checkbox
          checked={isFeatured}
          onCheckedChange={toggleFeatured}
        />
        <SparklesIcon className="size-3.5" />
        Featured
      </label>
    </div>
  );
}
