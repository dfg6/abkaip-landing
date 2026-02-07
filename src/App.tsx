import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { QuestHelper } from '@/components/QuestHelper';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Traps } from '@/sections/Traps';
import { Solution } from '@/sections/Solution';
import { CaseRegistry } from '@/sections/CaseRegistry';
import { Tips } from '@/sections/Tips';
import { Team } from '@/sections/Team';
import { Pricing } from '@/sections/Pricing';
import { Footer } from '@/sections/Footer';

function App() {
  const [isQuestOpen, setIsQuestOpen] = useState(false);

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Hero onOpenQuest={() => setIsQuestOpen(true)} />
        <Services />
        <Traps />
        <Solution />
        <CaseRegistry />
        <Tips />
        <Team />
        <Pricing />
        <Footer />
        
        <QuestHelper isOpen={isQuestOpen} onClose={() => setIsQuestOpen(false)} />
      </main>
    </ThemeProvider>
  );
}

export default App;
