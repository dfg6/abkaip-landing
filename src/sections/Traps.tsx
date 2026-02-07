import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, FileX, Microscope } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const traps = [
  {
    number: '01',
    title: '«Легкие деньги»',
    critical: true,
    situation: 'Представитель страховщика уговаривает дать реквизиты и подписать соглашение о выплате сразу после ДТП. Обещают деньги быстро.',
    catchText: 'Подписание соглашения — это юридическая точка невозврата. Вы соглашаетесь с суммой и теряете право требовать доплату через суд.',
    principle: 'Мы категорически не рекомендуем подписывать соглашения без его профессионального анализа.',
    icon: XCircle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/20',
  },
  {
    number: '02',
    title: 'Бюрократический фильтр',
    critical: false,
    situation: 'Претензия и обращение к Финансовому уполномоченному.',
    catchText: 'Ошибка в форме или отсутствие обязательного реквизита = отказ в рассмотрении.',
    principle: 'Мы составляем документы так, что их принимают с первого раза.',
    icon: FileX,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    number: '03',
    title: 'Битва экспертиз',
    critical: false,
    situation: 'Страховщик приносит свою экспертизу, где «повреждения не от этого ДТП».',
    catchText: 'Судья не эксперт-техник. Если не обосновать нарушения и не задать правильные вопросы судебному эксперту, вы проиграете.',
    principle: 'Мы знаем научные методики и умеем допрашивать экспертов, выявляя их ошибки.',
    icon: Microscope,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
];

export function Traps() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive text-sm font-medium rounded-full mb-4">
            <AlertTriangle className="inline h-4 w-4 mr-1" />
            Карта ловушек
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Почему сложно пройти одному?
          </h2>
          <p className="text-muted-foreground text-lg">
            Страховые компании используют проверенные схемы. Знайте их заранее.
          </p>
        </motion.div>

        <div className="space-y-6">
          {traps.map((trap, index) => (
            <motion.div
              key={trap.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
              className={`relative bg-card border-2 ${trap.borderColor} rounded-xl overflow-hidden`}
            >
              {trap.critical && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-bl-lg">
                  Критично
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-lg ${trap.bgColor} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${trap.color}`}>{trap.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{trap.title}</h3>
                    
                    <div className="space-y-4 mt-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Ситуация:</p>
                        <p className="text-foreground">{trap.situation}</p>
                      </div>

                      <div className={`p-4 ${trap.bgColor} rounded-lg`}>
                        <p className="text-sm font-medium mb-1 flex items-center gap-2">
                          <trap.icon className={`h-4 w-4 ${trap.color}`} />
                          В чём подвох:
                        </p>
                        <p className={`${trap.color}`}>{trap.catchText}</p>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm">
                          <span className="font-medium">Наш принцип:</span>{' '}
                          {trap.principle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
