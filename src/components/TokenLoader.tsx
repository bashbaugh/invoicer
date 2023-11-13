"use client";

import { useTogglData } from "@/hooks/useTogglData";
import { useEffect } from "react";

export default function TokenLoader() {
  const loadToken = useTogglData((s) => s.loadToken);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return null;
}
