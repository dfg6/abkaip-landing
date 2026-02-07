import { motion } from 'framer-motion';
import { CreditCard, Check, Star, Calculator, Gavel } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PenaltyCalculator } from '@/components/PenaltyCalculator';

const prices = [
  {
    title: 'Досудебная стадия',
    price: '3 000',
    description: 'Консультация и подготовка документов',
    icon: CreditCard,
    features: ['Анализ ситуации', 'Составление претензии', 'Рекомендации по действиям'],
  },
  {
    title: 'Комплекс "Экспертиза"',
    price: '25 000',
    description: 'Проведение независимой экспертизы',
    icon: Calculator,
    features: ['Независимая экспертиза', 'Оценка ущерба', 'Заключение для суда'],
    highlighted: false,
  },
  {
    title: 'Судебная защита',
    price: 'от 50 000',
    description: 'Полное ведение дела в суде',
    icon: Gavel,
    features: ['Подготовка иска', 'Представление в суде', 'Взыскание неустойки'],
  },
];

const workOptions = [
  {
    title: 'Вариант 1: "Общий иск"',
    price: 'Аванс 50 000 ₽ + % от выигрыша',
    features: [
      'Все требования в одном иске',
      'Быстрее (один процесс)',
      'Риск снижения неустойки судом',
    ],
    recommended: false,
  },
  {
    title: 'Вариант 2: "Раздельное"',
    price: 'Без аванса + 50% от доп. выгоды',
    features: [
      'Сначала ущерб, потом неустойка',
      'Минимизирует риск снижения сумм',
      'Оплата только по результату',
    ],
    recommended: false,
  },
];

export function Pricing() {
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
            <CreditCard className="inline h-4 w-4 mr-1" />
            Стоимость помощи
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Прозрачные цены</h2>
        </motion.div>

        {/* Price Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {prices.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              className={`relative bg-card border rounded-xl p-6 ${
                item.highlighted ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{item.price}</span>
                <span className="text-muted-foreground"> ₽</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

              <ul className="space-y-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Work Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-center mb-6">Варианты работы по страховым спорам</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {workOptions.map((option) => (
              <div
                key={option.title}
                className="relative bg-card border rounded-xl p-6"
              >
                <h4 className="font-semibold mb-2">{option.title}</h4>
                <p className="text-primary font-medium mb-4">{option.price}</p>

                <ul className="space-y-2">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Penalty Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <PenaltyCalculator />
        </motion.div>
      </div>
    </section>
  );
}
