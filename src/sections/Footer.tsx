import { motion } from 'framer-motion';
import { Shield, Globe, Mail, Phone, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Footer() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer id="contacts" ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-t">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">АБ КАИП</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Адвокатское бюро, специализирующееся на защите прав автовладельцев 
              в спорах со страховыми компаниями и ГИБДД.
            </p>
            <p className="text-sm text-muted-foreground">
              Внесено в реестр адвокатских образований КК за № 2314170134
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+79886686984"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +7 (988) 668-69-84
                </a>
              </li>
              <li>
                <a
                  href="tel:+79180155066"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +7 (918) 015-50-66
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@abkaip.ru"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@abkaip.ru
                </a>
              </li>
            </ul>
          </div>

          {/* Websites */}
          <div>
            <h4 className="font-semibold mb-4">Сайты</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://abkaip.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  abkaip.ru
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://каип.рф"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  каип.рф
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t text-center"
        >
          <p className="text-sm text-muted-foreground">
            © 2025 Адвокатское бюро «КАИП». Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Информация на сайте не является публичной офертой.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
