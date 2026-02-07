import { motion } from 'framer-motion';
import { FolderOpen, ArrowRight, FileCheck, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { BeforeAfter } from '@/components/BeforeAfter';

const stats = [
  { value: 1064, label: 'Завершённых дел', suffix: '' },
  { value: 98, label: 'Успешных исходов', suffix: '%' },
];

export function CaseRegistry() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 md:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Before/After */}
        <div className="mb-16">
          <BeforeAfter />
        </div>

        {/* Case Registry CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-card border rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Реестр завершенных дел</h3>
              <p className="text-muted-foreground">
                Изучите нашу практику: реальные решения судов, суммы выплат и сроки.
              </p>
            </div>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-shrink-0"
              onClick={() => window.open('https://abkaip.ru/dtp/case', '_blank')}
            >
              Смотреть дела
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-8 border-t">
            <div className="flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-success" />
              <span className="text-sm">Решения судов</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm">Фактические сроки</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="text-sm">Суммы выплат</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
