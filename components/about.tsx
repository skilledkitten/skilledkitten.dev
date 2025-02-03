"use client";

import { motion } from "framer-motion";
import { Github, AtSign, Laptop2 } from "lucide-react";

interface AboutProps {
  isActive: boolean;
  onExpand: (content: { title: string; content: React.ReactNode }) => void;
}

export function About({ isActive, onExpand }: AboutProps) {
  const socialLinks = [
    { icon: Github, href: "https://github.com/skilledkitten", label: "GitHub" },
    { icon: AtSign, href: "https://bsky.app", label: "Bluesky" },
    { icon: Laptop2, href: "https://guns.lol/devcat", label: "guns.lol" },
  ];

  const skills = [
    { name: "Rust", level: "Advanced" },
    { name: "TypeScript", level: "Expert" },
    { name: "JavaScript", level: "Expert" },
    { name: "Python", level: "Advanced" },
    { name: "Next.js", level: "Expert" },
  ];

  return (
    <motion.section
      className={`absolute inset-0 ${isActive ? "pointer-events-auto" : "pointer-events-none opacity-0"}`}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto h-full flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">skilledkitten</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Full Stack Developer & Backend Specialist
        </p>
        <div className="mb-8 space-y-4">
          <p>
            Crafting robust backend solutions and scalable web applications.
            Specialized in systems programming and modern web technologies.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1 bg-accent rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}