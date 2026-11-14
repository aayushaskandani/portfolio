import React, { useState, useEffect } from 'react';
import { ViewMode, OSTheme, Project } from './types';
import { Navbar } from './components/modern/Navbar';
import { Hero } from './components/modern/Hero';
import { WorkSection } from './components/modern/WorkSection';
import { WireframeSlider } from './components/modern/WireframeSlider';
import { CraftSection } from './components/modern/CraftSection';
import { StorySection } from './components/modern/StorySection';
import { JourneySection } from './components/modern/JourneySection';
import { ContactSection } from './components/modern/ContactSection';
import { Footer } from './components/modern/Footer';
import { WindowManager } from './components/os/WindowManager';
import { GhostCursors } from './components/modern/GhostCursors';
import { CommandPalette } from './components/modern/CommandPalette';
import { ProjectLightbox } from './components/modern/ProjectLightbox';
import { soundFX } from './utils/audio';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('modern');
  const [initialApp, setInitialApp] = useState<string | undefined>(undefined);
  const [osTheme, setOSTheme] = useState<OSTheme>('win98');
  const [ghostsEnabled, setGhostsEnabled] = useState<boolean>(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [selectedLightboxProject, setSelectedLightboxProject] = useState<Project | null>(null);

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const switchToOS = (openAppId?: string) => {
    setInitialApp(openAppId);
    setViewMode('os');
  };

  const switchToModern = () => {
    setViewMode('modern');
  };

  if (viewMode === 'os') {
    return (
      <>
        <WindowManager
          onExitToModern={switchToModern}
          initialOpenApp={initialApp}
          theme={osTheme}
          onThemeChange={setOSTheme}
        />
        {/* Command palette also accessible in OS mode */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenOSApp={(appId) => switchToOS(appId)}
          onSwitchOSTheme={(th) => setOSTheme(th)}
          onToggleMusic={() => soundFX.toggleAmbientMusic()}
          onToggleGhosts={() => setGhostsEnabled(prev => !prev)}
          ghostsEnabled={ghostsEnabled}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col selection:bg-brand-red selection:text-white relative">
      {/* Ghost Multi-Cursor Simulation */}
      <GhostCursors enabled={ghostsEnabled} />

      {/* Modern Navigation */}
      <Navbar
        onSwitchToOS={() => switchToOS()}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        ghostsEnabled={ghostsEnabled}
        onToggleGhosts={() => setGhostsEnabled(prev => !prev)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onSwitchToOS={switchToOS} />
        <WorkSection
          onOpenDossier={(projectId) => switchToOS('builder')}
          onOpenLightbox={(project) => setSelectedLightboxProject(project)}
        />
        <WireframeSlider />
        <CraftSection />
        <StorySection onOpenStoryApp={() => switchToOS('story')} />
        <JourneySection onOpenProofGallery={() => switchToOS('proof')} />
        <ContactSection />
      </main>

      {/* Modern Footer */}
      <Footer onSwitchToOS={() => switchToOS()} />

      {/* Architecture Lightbox Modal */}
      <ProjectLightbox
        project={selectedLightboxProject}
        onClose={() => setSelectedLightboxProject(null)}
      />

      {/* Universal Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenOSApp={(appId) => switchToOS(appId)}
        onSwitchOSTheme={(th) => {
          setOSTheme(th);
          switchToOS();
        }}
        onToggleMusic={() => soundFX.toggleAmbientMusic()}
        onToggleGhosts={() => setGhostsEnabled(prev => !prev)}
        ghostsEnabled={ghostsEnabled}
      />
    </div>
  );
};

export default App;
