import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GlassWater,
  Gift,
  TicketPercent,
  Newspaper,
  Instagram,
  MessageCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    birthdate: '',
    workplace: '',
    location: '',
    role: ''
  });

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }
    setFormData({ ...formData, birthdate: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar os dados para o servidor.');
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Houve um erro ao enviar seu cadastro. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--color-mixing-light)] text-[var(--color-mixing-dark)]">
      {/* Header */}
      <header className="w-full py-5 sm:py-8 px-4 sm:px-8 flex justify-center items-center">
        <img
          src="/logo.png"
          alt="Mixing Originals"
          className="h-16 sm:h-24 md:h-28 w-auto object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
            target.nextElementSibling?.classList.add('flex');
          }}
        />
        <div className="hidden flex-col items-center gap-1 text-center">
          <span className="font-display text-xl tracking-wider font-semibold uppercase text-[var(--color-mixing-dark)]">
            Mixing Originals
          </span>
          <span className="text-xs text-[var(--color-mixing-gold)] font-medium">
            (Faça o upload da logo como "logo.png" na pasta public)
          </span>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-5 sm:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] text-[var(--color-mixing-dark)]">
                    <span className="font-bold block mb-2 sm:mb-4">Você é Bartender?</span>
                    Entre para a comunidade exclusiva da Mixing.
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-[var(--color-mixing-dark)]/80 leading-relaxed max-w-xl font-light">
                    Uma comunidade de whatsapp exclusiva para profissionais da coquetelaria.<br />
                    Participe de sorteios semanais e receba novidades em primeira mão.
                  </p>

                  <div className="pt-4">
                    <a href="#cadastro" className="inline-flex items-center justify-center gap-2 bg-[var(--color-mixing-gold)] hover:bg-[var(--color-mixing-gold-hover)] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg shadow-[var(--color-mixing-gold)]/20 hover:shadow-[var(--color-mixing-gold)]/40 hover:-translate-y-0.5">
                      Quero participar!
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="relative h-[260px] sm:h-[380px] md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
                  <img
                    src="/drink.jpg"
                    alt="Bartender preparando um drink sofisticado"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </section>

              {/* Benefits Section */}
              <section className="bg-white py-12 sm:py-20 px-4 sm:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-display text-[var(--color-mixing-dark)] mb-4">Sua dose de exclusividade</h2>
                    <div className="w-24 h-1 bg-[var(--color-mixing-gold)] mx-auto rounded-full opacity-50"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-4 p-6 rounded-2xl bg-[var(--color-mixing-light)] hover:bg-[var(--color-mixing-gold)]/5 transition-colors border border-transparent hover:border-[var(--color-mixing-gold)]/20">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-mixing-gold)]/10 flex items-center justify-center text-[var(--color-mixing-gold)]">
                        <GlassWater className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Acesso Antecipado</h3>
                        <p className="text-[var(--color-mixing-dark)]/70 text-sm leading-relaxed">Seja o primeiro a conhecer e testar os novos sabores e lançamentos da Mixing.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-6 rounded-2xl bg-[var(--color-mixing-light)] hover:bg-[var(--color-mixing-gold)]/5 transition-colors border border-transparent hover:border-[var(--color-mixing-gold)]/20">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-mixing-gold)]/10 flex items-center justify-center text-[var(--color-mixing-gold)]">
                        <Gift className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Sorteios Semanais</h3>
                        <p className="text-[var(--color-mixing-dark)]/70 text-sm leading-relaxed">Concorra a produtos exclusivos e kits especiais toda semana, apenas para membros.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-6 rounded-2xl bg-[var(--color-mixing-light)] hover:bg-[var(--color-mixing-gold)]/5 transition-colors border border-transparent hover:border-[var(--color-mixing-gold)]/20">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-mixing-gold)]/10 flex items-center justify-center text-[var(--color-mixing-gold)]">
                        <TicketPercent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Promoções Exclusivas</h3>
                        <p className="text-[var(--color-mixing-dark)]/70 text-sm leading-relaxed">Acesse condições e descontos especiais pensados para você e para o seu bar.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-6 rounded-2xl bg-[var(--color-mixing-light)] hover:bg-[var(--color-mixing-gold)]/5 transition-colors border border-transparent hover:border-[var(--color-mixing-gold)]/20">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-mixing-gold)]/10 flex items-center justify-center text-[var(--color-mixing-gold)]">
                        <Newspaper className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Informação Direta</h3>
                        <p className="text-[var(--color-mixing-dark)]/70 text-sm leading-relaxed">Receba novidades, convites para eventos e tendências do mundo da coquetelaria direto da fonte.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Form Section */}
              <section id="cadastro" className="py-12 sm:py-20 px-4 sm:px-8 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                  <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-mixing-gold)]/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-mixing-gold)]/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-2xl mx-auto bg-white p-5 sm:p-8 md:p-12 rounded-[2rem] shadow-xl border border-black/5 relative z-10">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-display text-[var(--color-mixing-dark)] mb-3">Garanta seu Acesso!</h2>
                    <p className="text-[var(--color-mixing-dark)]/70">
                      Preencha rapidamente para receber seu convite para o grupo.<br />
                      <span className="font-bold">Solicitamos estas informações apenas para auxiliar nos sorteios, na entrega de prêmios e para manter a comunidade focada em profissionais da área.</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-[var(--color-mixing-dark)]/80">Como prefere ser chamado *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-mixing-gold)] focus:ring-2 focus:ring-[var(--color-mixing-gold)]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="Ex: João Silva"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-[var(--color-mixing-dark)]/80">WhatsApp / Celular *</label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-mixing-gold)] focus:ring-2 focus:ring-[var(--color-mixing-gold)]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="birthdate" className="block text-sm font-medium text-[var(--color-mixing-dark)]/80">Data de Nascimento *</label>
                      <input
                        type="text"
                        id="birthdate"
                        name="birthdate"
                        required
                        value={formData.birthdate}
                        onChange={handleBirthdateChange}
                        maxLength={10}
                        pattern="\d{2}/\d{2}/\d{4}"
                        title="Digite uma data no formato DD/MM/AAAA"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-mixing-gold)] focus:ring-2 focus:ring-[var(--color-mixing-gold)]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="DD/MM/AAAA"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="workplace" className="block text-sm font-medium text-[var(--color-mixing-dark)]/80">Onde você trabalha atualmente (a gente sabe que essa info pode mudar)? *</label>
                      <input
                        type="text"
                        id="workplace"
                        name="workplace"
                        required
                        value={formData.workplace}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-mixing-gold)] focus:ring-2 focus:ring-[var(--color-mixing-gold)]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="Nome do Bar ou Restaurante"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="role" className="block text-sm font-medium text-[var(--color-mixing-dark)]/80">Qual das opções melhor descreve sua função no bar?</label>
                      <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-mixing-gold)] focus:ring-2 focus:ring-[var(--color-mixing-gold)]/20 outline-none transition-all bg-gray-50 focus:bg-white appearance-none"
                      >
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="bartender">Bartender</option>
                        <option value="chefe_bar">Chefe de Bar</option>
                        <option value="auxiliar">Auxiliar de Bar</option>
                        <option value="consultor">Consultor de coquetelaria</option>
                        <option value="gerente">Gerente</option>
                        <option value="comprador">Comprador</option>
                        <option value="proprietario">Proprietário</option>
                        <option value="freela">Faço freelas</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="location" className="block text-sm font-medium text-[var(--color-mixing-dark)]/80">Cidade / Estado *</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-mixing-gold)] focus:ring-2 focus:ring-[var(--color-mixing-gold)]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="Ex: São Paulo / SP"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--color-mixing-gold)] hover:bg-[var(--color-mixing-gold-hover)] text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[var(--color-mixing-gold)]/20 hover:shadow-[var(--color-mixing-gold)]/40 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        "Quero participar"
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4 flex items-start justify-center gap-1.5 text-left sm:text-center">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>Seus dados estão seguros e não faremos spam. Respeitamos sua privacidade.</span>
                    </p>
                  </form>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-[80vh] flex items-center justify-center px-4 py-20"
            >
              <div className="max-w-xl mx-auto text-center space-y-8">
                <div className="w-20 h-20 bg-[var(--color-mixing-gold)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-[var(--color-mixing-gold)]" />
                </div>

                <h1 className="text-4xl sm:text-5xl font-display text-[var(--color-mixing-dark)]">
                  Cadastro concluído, <br /><span className="italic">{formData.name.split(' ')[0] || 'Bartender'}</span>!
                </h1>

                <p className="text-xl text-[var(--color-mixing-dark)]/80 font-light">
                  Seu acesso está liberado.
                </p>

                <div className="h-px w-16 bg-gray-200 mx-auto my-8"></div>

                <p className="text-lg text-[var(--color-mixing-dark)]/70 mb-8 max-w-md mx-auto">
                  Clique no botão abaixo ou leia o QR Code para entrar agora mesmo no nosso grupo fechado do WhatsApp. É por lá que toda a mágica vai acontecer.
                </p>

                <div className="bg-white p-6 rounded-3xl shadow-lg inline-block mb-8 border border-black/5">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-[#EAD8C8] rounded-full flex items-center justify-center -mt-10 border-4 border-white shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#8B5A2B]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-xl text-gray-900">Grupo Mixing</h3>
                      <p className="text-gray-500 text-sm">Grupo do WhatsApp</p>
                    </div>
                    <img
                      src="/qrcode.png"
                      alt="QR Code do Grupo WhatsApp"
                      className="w-64 h-64 sm:w-80 sm:h-80 aspect-square object-cover rounded-xl mx-auto shadow-sm"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                        target.nextElementSibling?.classList.add('flex');
                      }}
                    />
                    <div className="hidden w-64 h-64 sm:w-80 sm:h-80 aspect-square bg-gray-100 rounded-xl flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-300 mx-auto">
                      <span className="text-xs text-gray-500 font-medium">
                        (Faça o upload do QR Code como "qrcode.png" na pasta public)
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://chat.whatsapp.com/GXOylGogqaeHKDT9osHSVK?mode=gi_t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp-hover)] text-white px-8 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl shadow-[var(--color-whatsapp)]/20 hover:shadow-[var(--color-whatsapp)]/40 hover:-translate-y-1 w-full sm:w-auto"
                >
                  <MessageCircle className="w-6 h-6" />
                  Entrar no Grupo do WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-mixing-dark)] text-white pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full border border-[var(--color-mixing-gold)] flex items-center justify-center">
                <div className="w-0.5 h-3 bg-[var(--color-mixing-gold)] rounded-full rotate-45"></div>
              </div>
              <span className="font-display text-lg tracking-wider font-semibold uppercase text-[var(--color-mixing-gold)]">
                Mixing Originals
              </span>
            </div>
            <p className="text-white/70 text-sm max-w-xs leading-relaxed">
              Descubra o mundo da coquetelaria com a Mixing.<br />
              Conheça mais sobre nossos mixers, espumas e ingredientes para coquetéis. <a href="https://bit.ly/Guia_de_drinks_Mixing_Originals" target="_blank" rel="noopener noreferrer" className="text-[var(--color-mixing-gold)] hover:underline font-medium">Baixe o guia de drinks aqui.</a>
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--color-mixing-gold)] uppercase tracking-wider text-sm mb-4">Atendimento</h4>
            <a href="https://wa.me/5531982589483" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm">
              <MessageCircle className="w-4 h-4" />
              +55 (31) 98258-9483
            </a>
            <p className="text-white/60 text-sm">
              Segunda a sexta, das 8:00 às 17:40
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--color-mixing-gold)] uppercase tracking-wider text-sm mb-4">Redes Sociais</h4>
            <a href="https://instagram.com/MixingOriginals" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm w-fit">
              <Instagram className="w-4 h-4" />
              @MixingOriginals
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col gap-6">
          <p className="text-white/50 text-xs text-center max-w-4xl mx-auto leading-relaxed">
            Ao enviar este formulário, você consente com a coleta dos seus dados para fins de relacionamento e concorda em receber comunicações oficiais da Mixing. Você também aceita receber o link de convite para ingressar voluntariamente em nosso grupo exclusivo no WhatsApp, tendo a liberdade de sair da comunidade ou cancelar o recebimento de mensagens a qualquer momento.
          </p>
          <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} Mixing Originals. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-xs max-w-md text-center md:text-right">
              Nossos produtos são não alcoólicos, mas quando usados em drinks alcoólicos, aprecie sempre com moderação.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
