'use client';

import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  // The wallet provider has been temporarily removed.
  // We can add a valid one back here later.
  return <>{children}</>;
}
