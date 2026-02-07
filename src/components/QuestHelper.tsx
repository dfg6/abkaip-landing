import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, AlertTriangle, FileText, Phone, Scale, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface QuestHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepType = 'intro' | 'question' | 'result';

interface Step {
  id: number;
  type: StepType;
  question?: string;
  options?: { value: string; label: string }[];
  title?: string;
  content?: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 0,
    type: 'intro',
    title: 'Квест-Помощник',
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Ответьте на 3 простых вопроса о вашей ситуации, и мы составим персональный план действий.
        </p>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Check className="h-4 w-4" />
          <span>Быстро — всего 1 минута</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Check className="h-4 w-4" />
          <span>Персональные рекомендации</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Check className="h-4 w-4" />
          <span>Бесплатно и без обязательств</span>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    type: 'question',
    question: 'Что произошло?',
    options: [
      { value: 'dtp', label: 'Попал в ДТП' },
      { value: 'refusal', label: 'Отказ в выплате' },
      { value: 'gibdd', label: 'Штраф ГИБДД' },
      { value: 'other', label: 'Другое' },
    ],
  },
  {
    id: 2,
    type: 'question',
    question: 'Когда это произошло?',
    options: [
      { value: 'today', label: 'Сегодня' },
      { value: 'week', label: 'На этой неделе' },
      { value: 'month', label: 'В этом месяце' },
      { value: 'long', label: 'Более месяца назад' },
    ],
  },
  {
    id: 3,
    type: 'question',
    question: 'Обращались ли вы к страховой?',
    options: [
      { value: 'no', label: 'Ещё нет' },
      { value: 'yes-waiting', label: 'Да, жду ответа' },
      { value: 'yes-refused', label: 'Да, получил отказ' },
      { value: 'yes-paid', label: 'Да, выплатили, но мало' },
    ],
  },
];

interface ResultData {
  title: string;
  steps: { icon: React.ElementType; title: string; description: string }[];
  warning?: string;
  cta: string;
}

const getResult = (answers: Record<number, string>): ResultData => {
  const situation = answers[1];
  const insurance = answers[3];

  // DTP + Not contacted insurance
  if (situation === 'dtp' && insurance === 'no') {
    return {
      title: 'Ваш план действий после ДТП',
      steps: [
        { icon: FileText, title: 'Заявление страховщику', description: 'Укажите в заявлении ремонт. Не сообщайте банковские реквизиты и не подписывайте соглашения на выплату вместо ремонта.' },
        { icon: AlertTriangle, title: 'Осмотр автомобиля', description: 'Страховщик должен провести осмотр в течение 5 рабочих дней.' },
        { icon: Phone, title: 'Ожидание решения', description: 'Страховая должна принять решение в срок до 20 рабочих дней (ремонт) или 15 рабочих дней (выплата).' },
      ],
      warning: 'Важно: Не подписывайте никаких соглашений без консультации юриста!',
      cta: 'Получить консультацию',
    };
  }

  // Refusal
  if (situation === 'refusal' || insurance === 'yes-refused') {
    return {
      title: 'Действия при отказе страховой',
      steps: [
        { icon: FileText, title: 'Претензия страховщику', description: 'Направьте претензию в течение 15 рабочих дней (электронно) или 30 дней (обычная).' },
        { icon: Scale, title: 'Финансовый уполномоченный', description: 'Если претензия не помогла — обращение к ФУ (10 рабочих дней на рассмотрение).' },
        { icon: Gavel, title: 'Судебная защита', description: 'Если решение ФУ не устраивает — обратитесь в суд в течение 30 дней.' },
      ],
      cta: 'Начать защиту',
    };
  }

  // Low payment
  if (insurance === 'yes-paid') {
    return {
      title: 'Если выплатили меньше положенного',
      steps: [
        { icon: FileText, title: 'Независимая экспертиза', description: 'Проведём независимую экспертизу для определения реальной стоимости ущерба.' },
        { icon: Scale, title: 'Взыскание разницы', description: 'Взыщем недоплаченную сумму через суд с неустойкой 1% за каждый день просрочки.' },
        { icon: Gavel, title: 'Максимальная неустойка', description: 'Наша методика позволяет получить полную сумму неустойки без снижения судом.' },
      ],
      warning: 'Потенциал: до 400 000 ₽ дополнительно!',
      cta: 'Рассчитать неустойку',
    };
  }

  // Default
  return {
    title: 'Индивидуальная консультация',
    steps: [
      { icon: Phone, title: 'Бесплатная консультация', description: 'Позвоните нам или оставьте заявку — мы разберём вашу ситуацию.' },
      { icon: FileText, title: 'Анализ документов', description: 'Изучим все документы и определим перспективы дела.' },
      { icon: Scale, title: 'План действий', description: 'Разработаем стратегию защиты ваших прав.' },
    ],
    cta: 'Получить консультацию',
  };
};

export function QuestHelper({ isOpen, onClose }: QuestHelperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const progress = showResult 
    ? 100 
    : ((currentStep) / (steps.length - 1)) * 100;

  const result = showResult ? getResult(answers) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{showResult ? result?.title : steps[currentStep].title || 'Квест-Помощник'}</span>
          </DialogTitle>
        </DialogHeader>

        {!showResult && (
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Шаг {currentStep} из {steps.length - 1}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep].type === 'intro' ? (
                <div className="space-y-6">
                  {steps[currentStep].content}
                  <Button onClick={handleNext} className="w-full">
                    Начать
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-lg font-medium">{steps[currentStep].question}</p>
                  <div className="space-y-2">
                    {steps[currentStep].options?.map((option) => (
                      <Button
                        key={option.value}
                        variant={answers[currentStep] === option.value ? 'default' : 'outline'}
                        className="w-full justify-start text-left h-auto py-3 px-4"
                        onClick={() => handleAnswer(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {result?.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-muted rounded-lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {result?.warning && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-warning">{result.warning}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => window.location.href = '#contacts'}>
                  {result?.cta}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Заново
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
