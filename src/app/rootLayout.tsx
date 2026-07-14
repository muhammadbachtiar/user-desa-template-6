"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Chatbot from "@/components/chatbot/chatbot";
import FloatingWeatherButton from "@/components/weather/FloatingWeatherButton";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import LayoutInner from "./layoutInner";

export default function RootLayoutClient({ 
  children, 
  gaId 
}: { 
  children: React.ReactNode; 
  gaId: string;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SidebarProvider>
          <LayoutInner>{children}</LayoutInner>
        </SidebarProvider>
      </ThemeProvider>
      <FloatingWeatherButton />
      <Chatbot />
      <GoogleAnalytics gaId={gaId} />
    </QueryClientProvider>
  );
}
