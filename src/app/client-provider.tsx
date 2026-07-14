'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SessionProvider } from "next-auth/react";
import AnalyticsProvider from '@/context/AnalyticsProvider';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SidebarProvider>
          <AnalyticsProvider />
          <SessionProvider>{children}</SessionProvider>          
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
