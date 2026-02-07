import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AnimatedNumber } from './AnimatedNumber';

export function PenaltyCalculator() {
  const [amount, setAmount] = useState(100000);
  const [accidentDate, setAccidentDate] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculation = useMemo(() => {
    if (!accidentDate) return null;

    const accident = new Date(accidentDate);
    const today = new Date();
    const deadline = new Date(accident);
    deadline.setDate(deadline.getDate() + 21);

    // Calculate days overdue
    const diffTime = today.getTime() - deadline.getTime();
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Calculate penalty (1% per day)
    const dailyPenalty = amount * 0.01;
    const totalPenalty = Math.min(dailyPenalty * diffDays, amount); // Max penalty = amount

    return {
      days: diffDays,
      dailyPenalty,
      totalPenalty,
    };
  }, [amount, accidentDate]);

  const handleCalculate = () => {
    if (accidentDate) {
      setShowResult(true);
    }
  };

  return (
    <div className="bg-card border rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Калькулятор неустойки</h3>
          <p className="text-sm text-muted-foreground">Рассчитайте свою неустойку</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label htmlFor="amount">Размер недоплаты</Label>
            <span className="font-medium">{amount.toLocaleString('ru-RU')} ₽</span>
          </div>
          <Slider
            id="amount"
            min={0}
            max={400000}
            step={1000}
            value={[amount]}
            onValueChange={(value) => {
              setAmount(value[0]);
              setShowResult(false);
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 ₽</span>
            <span>400 000 ₽</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Дата ДТП</Label>
          <Input
            id="date"
            type="date"
            value={accidentDate}
            onChange={(e) => {
              setAccidentDate(e.target.value);
              setShowResult(false);
            }}
          />
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full"
          disabled={!accidentDate}
        >
          Рассчитать неустойку
        </Button>

        {showResult && calculation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-4 border-t"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Дней просрочки</p>
                <p className="text-2xl font-bold">{calculation.days}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Неустойка в день</p>
                <p className="text-2xl font-bold">{Math.round(calculation.dailyPenalty).toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Итого неустойка</p>
              <p className="text-3xl font-bold text-primary">
                <AnimatedNumber 
                  value={Math.round(calculation.totalPenalty)} 
                  suffix=" ₽"
                />
              </p>
            </div>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>Формула: 1% от суммы недоплаты за каждый день просрочки. Максимум — размер недоплаты.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
