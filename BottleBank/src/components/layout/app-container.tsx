import type { ReactNode } from 'react';

export function AppContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md mx-auto bg-card min-h-dvh shadow-lg flex flex-col">
      {children}
    </div>
  );
}
