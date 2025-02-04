'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Projects } from '@/components/projects';
import { NavBar } from '@/components/navbar';

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState('projects');
  const router = useRouter();

  function handleNavigate(section: string) {
    router.push(`/${section}`);
  }

  return (
    <>
      <NavBar activeSection={activeSection} onNavigate={handleNavigate} />
      <Projects isActive={true} onExpand={() => {}} />
    </>
  );
}
