import { motion } from 'framer-motion';
import { Check, Target, Shield, FileText, Scale, Gavel, TrendingUp, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  { number: '01', title: 'Выбор стратегии', description: 'Ремонт или выплата?', icon: Target },
  { number: '02', title: 'Блок на соглашение', description: 'Защита прав.', icon: Shield },
  { number: '03', title: 'Идеальная претензия', description: 'Строго по закону.', icon: FileText },
  { number: '04', title: 'Финуполномоченный', description: 'Гарантия принятия.', icon: Scale },
  { number: '05', title: 'Иск в суд', description: 'Сильная позиция.', icon: Gavel },
  { number: '06', title: 'Максимум', description: 'Взыскание неустойки.', icon: TrendingUp },
];

export function Solution() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Наше решение
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            6 шагов к выплате
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Проверенная система защиты ваших прав в спорах со страховыми компаниями
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
              className="relative bg-card border rounded-xl p-5 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <step.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Шаг {step.number}</div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Method */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8"
        >
          <div className="absolute top-4 right-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">Особая методика: Неустойка</h3>
              <p className="text-muted-foreground mb-4">
                Мы обладаем методикой взыскания максимального размера неустойки, которую обычно суды снижают. 
                Мы знаем, как получить полную сумму.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Check className="h-4 w-4" />
                <span>Проверено на сотнях дел</span>
              </div>
            </div>

            <div className="flex-shrink-0 text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-1">Потенциал</p>
              <p className="text-4xl font-bold text-primary">до 400 000 ₽</p>
            </div>
          </div>
        </motion.div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            При доверии нам разрешения нашего спора сразу после ДТП организуем проведение независимой экспертизы.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
