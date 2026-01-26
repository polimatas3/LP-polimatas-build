import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TechIcon } from './TechIcon';
import { Component as BackgroundSnippets } from '@/components/ui/background-snippets';

// Lista de tecnologias com seus IDs do sprite
const technologies = [
  // Automação e Infraestrutura
  { id: 'n8n', name: 'n8n', description: 'Plataforma de automação de workflows', size: 84 }, // +60%
  { id: 'python', name: 'Python', description: 'Linguagem de programação para IA', size: 36 },
  { id: 'docker', name: 'Docker', description: 'Containerização de aplicações', size: 44 },
  { id: 'postgresql', name: 'PostgreSQL', description: 'Banco de dados relacional', size: 40 },
  { id: 'supabase', name: 'Supabase', description: 'Backend as a Service', size: 40 },
  { id: 'rabbitmq', name: 'RabbitMQ', description: 'Message broker', size: 31 }, // -40%
  { id: 'portainer', name: 'Portainer', description: 'Gerenciamento de containers', size: 44 }, // +10%
  { id: 'backblaze', name: 'Backblaze', description: 'Armazenamento em nuvem', size: 44 },
  // Marketing e Comunicação
  { id: 'mautic', name: 'Mautic', description: 'Automação de marketing', size: 40 },
  { id: 'chatwoot', name: 'Chatwoot', description: 'Atendimento ao cliente', size: 40 },
  { id: 'vapi', name: 'Vapi', description: 'Agentes de voz com IA', size: 74 }, // +25%
  { id: 'slack', name: 'Slack', description: 'Comunicação empresarial', size: 78 }, // +40%
  // CRM e Gestão
  { id: 'kommo', name: 'Kommo', description: 'CRM de vendas', size: 57 }, // +10%
  { id: 'pipedrive', name: 'Pipedrive', description: 'CRM de vendas', size: 78 }, // +30%
  { id: 'rdstation', name: 'RD Station', description: 'Marketing e CRM', size: 36 }, // -10%
  { id: 'clickup', name: 'ClickUp', description: 'Gestão de projetos', size: 40 },
  // Plataformas de Infoprodutos
  { id: 'hotmart', name: 'Hotmart', description: 'Plataforma de infoprodutos', size: 86 }, // +25%
  { id: 'kiwify', name: 'Kiwify', description: 'Venda de produtos digitais', size: 79 }, // +15%
  // Nichos Específicos
  { id: 'clinicorp', name: 'Clinicorp', description: 'Gestão de clínicas', size: 84 },
  { id: 'asaas', name: 'Asaas', description: 'Gestão financeira', size: 58 },
  // Web
  { id: 'wordpress', name: 'WordPress', description: 'CMS e sites', size: 44 },
];

export default function TechnologiesSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      id="technologies"
      ref={containerRef}
      className="relative py-16 bg-black overflow-hidden w-full"
      style={{ opacity }}
    >

      {/* Background customizado ocupa toda a section */}
        {/* Background customizado ocupa toda a section */}
        {/* Removido: overlays antigos de gradiente e dotted pattern */}

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
            Conheça algumas tecnologias usadas pelos <span className="text-cyan-400 underline decoration-cyan-400">polímatas</span>
          </h2>
          <p className="text-gray-500 text-base font-light max-w-xl mx-auto">
            Tecnologias que transformam conhecimento em sistemas inteligentes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <div className="w-full h-px bg-neutral-800 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

          <div className="w-full overflow-hidden py-5">
            <div className="flex tech-carousel-animate rounded-xl bg-black/90 px-4 py-2" style={{ width: 'max-content' }}>
              {/* First set */}
              {technologies.map((tech, index) => (
                <div
                  key={`first-${index}`}
                  className="mx-12 flex flex-col items-center justify-center shrink-0"
                >
                  <div className="h-[60px] flex items-center justify-center">
                    <TechIcon
                      name={tech.name}
                      id={tech.id}
                      size={tech.size}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-white text-xs mt-2 font-light">
                    {tech.name}
                  </span>
                </div>
              ))}
              {/* Second set (duplicate for seamless loop) */}
              {technologies.map((tech, index) => (
                <div
                  key={`second-${index}`}
                  className="mx-12 flex flex-col items-center justify-center shrink-0"
                >
                  <div className="h-[60px] flex items-center justify-center">
                    <TechIcon
                      name={tech.name}
                      id={tech.id}
                      size={tech.size}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-white text-xs mt-2 font-light">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-neutral-800 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </motion.div>
      </div>
    </motion.section>
  );
}
