'use client';

import { Footer } from '@/components/template/simple/layout/Footer';
import { Header } from '@/components/template/simple/layout/Header';
import { useContent } from '@/hooks/useContent';

export default function LayoutInner({ children }: { children: React.ReactNode }) {
  const { footer, header } = useContent();

  return (
    <>
      <Header data={header} />
      <div className='min-h-screen w-full justify-center'>
        {children}
      </div>
      <Footer data={footer} />
    </>
  );
}
