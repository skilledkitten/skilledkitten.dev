"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectsProps {
  isActive: boolean;
  onExpand: (content: { title: string; content: React.ReactNode }) => void;
}

export function Projects({ isActive, onExpand }: ProjectsProps) {
  const projects = [
    {
      title: "Project Alpha",
      description: "A modern web application built with Next.js and TypeScript",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Project Beta",
      description: "Real-time collaboration platform for remote teams",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      tags: ["React", "Node.js", "WebSocket"],
    },
  ];

  return (
    <motion.section
      className={`absolute inset-0 ${isActive ? "pointer-events-auto" : "pointer-events-none opacity-0"}`}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ zIndex: 1 }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
            onClick={() => onExpand({
              title: project.title,
              content: (
                <div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full rounded-lg mb-4"
                  />
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ),
            })}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <ExternalLink className="w-5 h-5 mx-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}