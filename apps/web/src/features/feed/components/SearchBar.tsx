"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components";
import { useDebouncedValue } from "@/shared/hooks";

export interface SearchBarProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export default function SearchBar({
  onSearchChange,
  placeholder = "ค้นหาโพสต์...",
  debounceMs = 350,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value, debounceMs);

  useEffect(() => {
    onSearchChange(debouncedValue.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-fire when the debounced value itself changes, not when the caller passes a new onSearchChange reference each render
  }, [debouncedValue]);

  return (
    <Input
      type="search"
      icon={<Search />}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      aria-label="ค้นหาโพสต์"
      className={className}
    />
  );
}
