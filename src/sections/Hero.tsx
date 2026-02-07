import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronRight, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeroProps {
  onOpenQuest: () => void;
}

export function Hero({ onOpenQuest }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); 
  
    // Обработчик клика
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };  

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cyberpunk-car.jpg"
          alt="Cyberpunk Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">АБ КАИП</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium"
            >
              <Shield className="h-4 w-4" />
              Автоюрист
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              >
                ОСАГО — это квест
                <br />
                <span className="text-primary">на высокой сложности</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl"
              >
                Без проводника здесь не найти пути. Страховая играет по своим правилам, 
                но мы знаем, как пройти эту игру до полной выплаты.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-destructive font-medium"
              >
                Не дайте ввести себя в заблуждение.
              </motion.p>
            </div>

            {/* Audio Player */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="flex items-center gap-4"
>
  <audio
    ref={audioRef}
    src="https://abkaip.ru/dtp/dtp.mp3"
    onEnded={() => setIsPlaying(false)}
  />
  <Button
    variant="outline"
    size="icon"
    className="h-12 w-12 rounded-full"
    onClick={toggleAudio}  // ИЗМЕНИТЬ функцию
  >
    {isPlaying ? (
      <Pause className="h-5 w-5" />
    ) : (
      <Play className="h-5 w-5 ml-0.5" />
    )}
  </Button>
  <div>
    <p className="font-medium">Слушать наш манифест</p>
    <p className="text-sm text-muted-foreground">2:34</p>
  </div>
</motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="animate-pulse-glow"
                onClick={onOpenQuest}
              >
                Начать игру на вашей стороне
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('https://upload.abkaip.ru/', '_blank')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Направить документы
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 pb-8 text-center"
      >
        <div className="animate-bounce">
          <ChevronRight className="h-6 w-6 mx-auto rotate-90 text-muted-foreground" />
        </div>
      </motion.div>
    </section>
  );
}
