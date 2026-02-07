import { motion } from 'framer-motion';
import { Users, Phone, ExternalLink, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const lawyers = [
  {
    name: 'Антонов Алексей Анатольевич',
    title: 'Адвокат / АБ КАИП',
    image: '/lawyer-1.jpg',
    description: 'Автор многочисленных публикаций. Прочитал почти все книги по автотехнической экспертизе. 20 лет помогает получить то, что не хотят отдавать.',
    phone: '+7 (988) 668-69-84',
    achievements: ['20+ лет практики', 'Автор публикаций'],
    link: 'https://abkaip.ru/antonov',
  },
  {
    name: 'Королев Олег Вячеславович',
    title: 'Адвокат / АБ КАИП',
    image: '/lawyer-2.jpg',
    description: 'Специалист по сложным судебным спорам и защите прав при ДТП. Более 15 лет успешной практики.',
    phone: '+7 (918) 015-50-66',
    achievements: ['15+ лет практики', 'Сложные споры'],
    link: 'https://abkaip.ru/korolev',
  },
];

export function Team() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            <Users className="inline h-4 w-4 mr-1" />
            Профессионалы
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Команда адвокатов</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
              className="bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-2/5 h-64 sm:h-auto">
                  <a href={lawyer.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
                <div className="sm:w-3/5 p-6 flex flex-col">
                  <div>
                    <a href={lawyer.link} target="_blank" rel="noopener noreferrer">
                      <h3 className="text-xl font-bold mb-1 hover:text-primary transition-colors">{lawyer.name}</h3>
                    </a>
                    <p className="text-primary text-sm font-medium mb-4">{lawyer.title}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lawyer.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          <Award className="h-3 w-3" />
                          {achievement}
                        </span>
                      ))}
                    </div>

                    <p className="text-muted-foreground text-sm mb-6">{lawyer.description}</p>
                  </div>

                  <div className="mt-auto space-y-3">
                    <Button variant="outline" className="w-full" asChild>
                      <a href={`tel:${lawyer.phone.replace(/\s/g, '')}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Позвонить: {lawyer.phone}
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full" asChild>
                      <a href={lawyer.link} target="_blank" rel="noopener noreferrer">
                        Подробнее о юристе
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Publication Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.advgazeta.ru/avtory/antonov-aleksey/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <BookOpen className="h-5 w-5" />
            Читайте наши публикации в «Адвокатской газете»
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
