import { motion } from 'framer-motion';
import { Shield, Gavel, Scale, FileCheck, AlertTriangle, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    icon: Shield,
    title: 'Споры со страховщиками',
    description: 'Занижение выплат, отказы в КАСКО/ОСАГО, затягивание сроков ремонта.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Gavel,
    title: 'Споры с ГИБДД',
    description: 'Возврат прав, оспаривание штрафов, защита при обвинении в нетрезвом вождении.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Scale,
    title: 'Помощь виновникам ДТП',
    description: 'Защита от суброгации (регресса), снижение суммы исков, защита в суде.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
];

const features = [
  { icon: FileCheck, text: 'Проверка документов' },
  { icon: AlertTriangle, text: 'Выявление рисков' },
  { icon: Users, text: 'Индивидуальный подход' },
];

export function Services() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });

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
            Специализированная помощь
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Чем мы помогаем</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              className="group relative bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}>
                <service.icon className={`h-6 w-6 ${service.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {features.map((feature) => (
            <div key={feature.text} className="flex items-center gap-2 text-muted-foreground">
              <feature.icon className="h-5 w-5 text-primary" />
              <span>{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
