import { motion } from 'framer-motion';
import { Lightbulb, FileText, Phone, Scale } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const tips = [
  {
    id: 'insurance',
    icon: Phone,
    title: 'При обращении к страховщику',
    content: (
      <div className="space-y-3">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Указывайте в заявлении <strong>ремонт</strong>, а не выплату</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span><strong>Не сообщайте</strong> банковские реквизиты заранее</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
            <span className="text-destructive font-medium"><strong>НЕ подписывайте</strong> никаких соглашений на выплату вместо ремонта</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Фиксируйте все коммуникации (записывайте разговоры, сохраняйте переписку)</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'claim',
    icon: FileText,
    title: 'Образец заполнения претензии',
    content: (
      <div className="space-y-3">
        <p>Обязательные реквизиты претензии:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Наименование страховщика и его адрес</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Ваши ФИО, адрес и контакты</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Номер полиса ОСАГО и дата ДТП</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Чёткое изложение требований с указанием суммы</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Перечень приложений (копии документов)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Дата и подпись</span>
          </li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          Срок рассмотрения: 15 рабочих дней (электронно) или 30 дней (обычная)
        </p>
      </div>
    ),
  },
  {
    id: 'ombudsman',
    icon: Scale,
    title: 'Как заполнить обращение к Финомбудсмену',
    content: (
      <div className="space-y-3">
        <p>Финансовый уполномоченный — бесплатная досудебная защита:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Подача через личный кабинет на сайте finombudsman.ru</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Срок рассмотрения: 10 рабочих дней (+10 при назначении экспертизы)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Решение вступает в силу в течение 10 рабочих дней</span>
          </li>
        </ul>
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg mt-4">
          <p className="text-sm text-warning font-medium">
            Важно! Если решение ФУ не устраивает — обратитесь в суд в течение 30 дней!
          </p>
        </div>
      </div>
    ),
  },
];

export function Tips() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            <Lightbulb className="inline h-4 w-4 mr-1" />
            Практические советы
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Полезная информация</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {tips.map((tip) => (
              <AccordionItem
                key={tip.id}
                value={tip.id}
                className="bg-card border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <tip.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-semibold text-lg">{tip.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-14">
                  {tip.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
