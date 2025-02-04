'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/navbar';
import { About } from '@/components/about';
import { Projects } from '@/components/projects';
import { ColorGenerator } from '@/components/tools/color-generator';
import { Modal } from '@/components/modal';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);

  const router = useRouter();

  function handleNavigate(section: string) {
    router.push(`/${section}`);
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-background relative">
      <NavBar activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="w-full h-full pt-24 px-4 md:px-8 relative z-0">
        <About
          isActive={activeSection === 'about'}
          onExpand={setModalContent}
        />
        <Projects
          isActive={activeSection === 'projects'}
          onExpand={setModalContent}
        />
        <ColorGenerator
          isActive={activeSection === 'colors'}
          onExpand={setModalContent}
        />
      </div>

      <div className="fixed bottom-4 right-4 text-xs text-muted-foreground">
        skilledkitten
      </div>

      {modalContent && (
        <Modal title={modalContent.title} onClose={() => setModalContent(null)}>
          {modalContent.content}
        </Modal>
      )}
    </main>
  );
}
