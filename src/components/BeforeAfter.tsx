import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Case {
  before: string;
  after: number;
  description: string;
  label: string;
}

const cases: Case[] = [
  {
    before: 'Страховая отказала',
    after: 190000,
    description: 'Суд отказал → Мы обжаловали → Повторная экспертиза → Полная выплата',
    label: 'Оспаривание отказа',
  },
  {
    before: 'Выплатили 45 000 ₽',
    after: 280000,
    description: 'Независимая экспертиза + неустойка = справедливая компенсация',
    label: 'Дозаявление ущерба',
  },
  {
    before: 'Суброгация 350 000 ₽',
    after: 0,
    description: 'Защита виновника → Снижение исковых требований → Полное освобождение',
    label: 'Защита виновника',
  },
];

export function BeforeAfter() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div ref={ref} className="space-y-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">Реальные результаты</span>
        </div>
        <h3 className="text-2xl font-bold">До и после нашей помощи</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cases.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="bg-card border rounded-xl p-6 space-y-4"
          >
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {item.label}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 p-3 bg-destructive/10 rounded-lg">
                  <p className="text-xs text-destructive mb-1">До</p>
                  <p className="font-medium text-destructive">{item.before}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 p-3 bg-success/10 rounded-lg">
                  <p className="text-xs text-success mb-1">После</p>
                  <p className="text-2xl font-bold text-success">
                    {item.after === 0 ? '0 ₽' : (
                      <AnimatedNumber value={item.after} suffix=" ₽" />
                    )}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
