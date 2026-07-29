"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownAZIcon, ArrowUpAZIcon, CalendarIcon, EyeIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function NewsSortBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSortBy = searchParams.get("sortBy") ?? "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") ?? "desc";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const toggleSortOrder = () => {
    const next = currentSortOrder === "desc" ? "asc" : "desc";
    updateParam("sortOrder", next);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentSortBy}
        onValueChange={(value) => updateParam("sortBy", value)}
      >
        <SelectTrigger size="sm" className="w-auto gap-1.5">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">
            <CalendarIcon data-icon="inline-start" className="size-3.5 mr-1" />
            Date
          </SelectItem>
          <SelectItem value="views">
            <EyeIcon data-icon="inline-start" className="size-3.5 mr-1" />
            Views
          </SelectItem>
          <SelectItem value="title">
            <ArrowUpAZIcon data-icon="inline-start" className="size-3.5 mr-1" />
            Title
          </SelectItem>
        </SelectContent>
      </Select>

      <button
        onClick={toggleSortOrder}
        className="inline-flex size-8 items-center justify-center rounded-4xl border border-input bg-input/30 text-muted-foreground transition-colors hover:bg-input/50 hover:text-foreground"
        aria-label={`Sort ${currentSortOrder === "desc" ? "ascending" : "descending"}`}
      >
        {currentSortOrder === "desc" ? (
          <ArrowDownAZIcon className="size-4" />
        ) : (
          <ArrowUpAZIcon className="size-4" />
        )}
      </button>
    </div>
  );
}
