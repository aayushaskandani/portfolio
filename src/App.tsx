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
import { CommandPalette } from './components/modern/CommandPalette';
import { ProjectLightbox } from './components/modern/ProjectLightbox';
import { CanvasCraftProvider, useCanvasCraft } from './components/modern/CanvasCraftTour';
import { StarkHudProvider, useStarkHud } from './components/modern/StarkJarvisHUD';
import { soundFX } from './utils/audio';

// Inner Modern Layout that uses both Canvas Craft and Stark HUD contexts
const ModernPortfolioView: React.FC<{
  onSwitchToOS: (openAppId?: string) => void;
  onOpenCommandPalette: () => void;
  onOpenLightbox: (project: Project) => void;
  isCommandPaletteOpen: boolean;
  onCloseCommandPalette: () => void;
  onSwitchOSTheme: (theme: OSTheme) => void;
  selectedLightboxProject: Project | null;
  onCloseLightbox: () => void;
}> = ({
  onSwitchToOS,
  onOpenCommandPalette,
  onOpenLightbox,
  isCommandPaletteOpen,
  onCloseCommandPalette,
  onSwitchOSTheme,
  selectedLightboxProject,
  onCloseLightbox
}) => {
  const { rebuildCanvas } = useCanvasCraft();
  const { toggleStarkHud } = useStarkHud();

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col selection:bg-brand-red selection:text-white relative overflow-x-hidden">
      {/* Background blueprint grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />
      {/* Ambient Radial Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#e11d48]/10 via-[#b91c1c]/5 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[1200px] right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#3b82f6]/10 to-transparent blur-[150px] pointer-events-none z-0" />

      {/* Modern Navigation */}
      <Navbar
        onSwitchToOS={() => onSwitchToOS()}
        onOpenCommandPalette={onOpenCommandPalette}
        onRebuildCanvas={() => rebuildCanvas(1)}
      />

      {/* Main Sections */}
      <main className="flex-1 relative z-10">
        <Hero onSwitchToOS={onSwitchToOS} />
        <WorkSection
          onOpenDossier={() => onSwitchToOS('builder')}
          onOpenLightbox={onOpenLightbox}
        />
        <WireframeSlider />
        <CraftSection />
        <StorySection onOpenStoryApp={() => onSwitchToOS('story')} />
        <JourneySection onOpenProofGallery={() => onSwitchToOS('proof')} />
        <ContactSection />
      </main>

      {/* Modern Footer */}
      <Footer onSwitchToOS={() => onSwitchToOS()} />

      {/* Architecture Lightbox Modal */}
      <ProjectLightbox
        project={selectedLightboxProject}
        onClose={onCloseLightbox}
      />

      {/* Universal Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={onCloseCommandPalette}
        onOpenOSApp={(appId) => onSwitchToOS(appId)}
        onSwitchOSTheme={onSwitchOSTheme}
        onToggleMusic={() => soundFX.toggleAmbientMusic()}
        onToggleStarkHud={toggleStarkHud}
      />
    </div>
  );
};

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('modern');
  const [initialApp, setInitialApp] = useState<string | undefined>(undefined);
  const [osTheme, setOSTheme] = useState<OSTheme>('win98');
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
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenOSApp={(appId) => switchToOS(appId)}
          onSwitchOSTheme={(th) => setOSTheme(th)}
          onToggleMusic={() => soundFX.toggleAmbientMusic()}
        />
      </>
    );
  }

  return (
    <StarkHudProvider>
      <CanvasCraftProvider>
        <ModernPortfolioView
          onSwitchToOS={switchToOS}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenLightbox={(project) => setSelectedLightboxProject(project)}
          isCommandPaletteOpen={isCommandPaletteOpen}
          onCloseCommandPalette={() => setIsCommandPaletteOpen(false)}
          onSwitchOSTheme={(th) => {
            setOSTheme(th);
            switchToOS();
          }}
          selectedLightboxProject={selectedLightboxProject}
          onCloseLightbox={() => setSelectedLightboxProject(null)}
        />
      </CanvasCraftProvider>
    </StarkHudProvider>
  );
};

export default App;