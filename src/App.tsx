import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Landmark, Languages, MessageSquare, Send, ChevronRight, Info } from 'lucide-react';
import { cn } from './lib/utils';
import { askAmbassador } from './services/geminiService';

const DISHES = [
  {
    id: 'sarayli',
    category: 'Tatlı',
    title: 'Muğla Saraylısı',
    description: 'Osmanlı’dan yadigar, Muğla düğünlerinin baş tacı. Adı üstünde, saraylara layık!',
    image: 'https://picsum.photos/seed/dessert/800/600',
    fullText: 'Muğla Saraylısı, incecik açılmış hamurların arasına bolca Muğla cevizi serpilerek gül şeklinde rulo yapılmasıyla hazırlanır. Üzerine kaynar şerbet döküldüğünde o çıtırtısı tüm Muğla sokaklarında yankılanır gari! Eskiden gelin evinden damat evine "saraylı" göndermek bir şanş, bir gelenekti.',
    ingredients: [
      'Ceviz içi (bolca)',
      'Un, Yumurta, Yoğurt (hamur için)',
      'Aşurelik buğday nişastası',
      'Tereyağı',
      'Şerbet (Şeker, su, limon)'
    ],
    story: 'Efsaneye göre bu tatlı, zamanında saraydan Muğla’ya gelen bir aşçı tarafından halka öğretilmiş. Muğla kadınları o kadar sevmiş ki, her özel günden "Saraylısız olmaz gari" demeye başlamışlar.'
  },
  {
    id: 'cokertme',
    category: 'Ana Yemek',
    title: 'Çökertme Kebabı',
    description: 'Bodrum’dan dünyaya yayılan, çıtır patates ve bonfilenin muazzam uyumu.',
    image: 'https://picsum.photos/seed/kebab/800/600',
    fullText: 'Kibrit çöpü inceliğinde doğranmış çıtır patateslerin üzerine süzme yoğurt ve tereyağında çevrilmiş bonfile parçaları gelir. En üste de sarımsaklı domates sosu döküldü mü, yemeye doyum olmaz bakem!',
    ingredients: [
      'Dan bonfile',
      'Patates (kibrit doğranmış)',
      'Süzme yoğurt',
      'Tereyağı & Domates sosu'
    ],
    story: 'Bodrum\'un meşhur Çökertme zeybeği gibi asil, tadı gibi akılda kalıcıdır. Her Muğla sofrasının gurur kaynağıdır.'
  },
  {
    id: 'tarhana',
    category: 'Çorba',
    title: 'Muğla Tarhanası',
    description: 'Ege’nin şifa kaynağı, kış aylarının vazgeçilmezi.',
    image: 'https://picsum.photos/seed/soup/800/600',
    fullText: 'Muğla tarhanası diğerlerine benzemez; börülceli olur, içine kurutulmuş biberler atılır. İçerken damağınızda o göce (yarma) tadını hissetmeniz lazım gari.',
    ingredients: [
      'Tarhana göcesi',
      'Börülce',
      'Kurutulmuş Muğla biberi',
      'Sarımsak'
    ],
    story: 'Yazdan hazırlanan tarhanalar, kışın en sert soğuğunda Muğlalıların içini ısıtır. Komşudan komşuya bir kasede taşınır, bereketi paylaşılır.'
  }
];

export default function App() {
  const [activeTab, setActiveTab ] = useState<'home' | 'gastronomy' | 'history' | 'dialect'>('home');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hoş geldin be ya! Ben Muğla Kültür Elçisi. N\'edip duruñ bakem? Merak ettiğin ne varsa sor gari!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    const response = await askAmbassador(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-warm-cream selection:bg-olive-drab selection:text-white">
      {/* Header */}
      <nav className="border-b border-olive-drab/10 p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="serif-display text-3xl font-bold text-deep-ink tracking-tight">
          Muğla <span className="text-olive-drab italic font-light">Kültür Elçisi</span>
        </h1>
        <div className="hidden md:flex gap-8 items-center">
          {['home', 'gastronomy', 'history', 'dialect'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "text-sm uppercase tracking-widest font-medium transition-all",
                activeTab === tab ? "text-olive-drab underline underline-offset-8" : "text-deep-ink/50 hover:text-deep-ink"
              )}
            >
              {tab === 'home' ? 'Anasayfa' : 
               tab === 'gastronomy' ? 'Mutfak' : 
               tab === 'history' ? 'Tarih' : 'Şive'}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              {/* Hero */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="serif-display text-6xl leading-[1.1] text-deep-ink">
                    Ege'nin <br />
                    <span className="italic">Bilge Ruhu</span> <br />
                    Muğla'ya Hoş Geldin!
                  </h2>
                  <p className="text-lg text-deep-ink/70 leading-relaxed max-w-md">
                    Toprağından bereket, insanından samimiyet fışkıran bu toprakların her köşesi bir hikaye, her yediği bir sanat. Haydi, Muğla'yı beraber keşfedelim gari!
                  </p>
                  <button 
                    onClick={() => setActiveTab('gastronomy')}
                    className="olive-button px-8 py-4 text-lg font-medium flex items-center gap-2"
                  >
                    Tadına Bakmaya Başla <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative">
                  <img 
                    src="https://picsum.photos/seed/mugla-landscape/800/1000" 
                    alt="Muğla Manzarası" 
                    className="pill-image w-full shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-xl max-w-xs cultural-card border border-olive-drab/10">
                    <p className="serif-display text-xl leading-snug">
                      "Yediği her bi' lokma, Muğla'nın toprağına bir teşekkürdür bakem."
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Chat Section */}
              <div className="cultural-card p-1 bg-olive-drab shadow-2xl shadow-olive-drab/20">
                <div className="bg-white rounded-[31px] p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-olive-drab/10 flex items-center justify-center">
                      <MessageSquare className="text-olive-drab w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="serif-display text-2xl">Elçiye Soruñ Bakem</h3>
                      <p className="text-xs text-deep-ink/50 uppercase tracking-widest font-semibold font-sans">Muğla Hakkında Her Şeyi Yanıtlar</p>
                    </div>
                  </div>
                  
                  <div className="h-[400px] overflow-y-auto mb-6 space-y-4 p-4 rounded-2xl bg-warm-cream/50">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={`${msg.role}-${i}`}
                        initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap",
                          msg.role === 'user' 
                            ? "ml-auto bg-olive-drab text-white rounded-tr-none" 
                            : "mr-auto bg-white border border-olive-drab/10 text-deep-ink rounded-tl-none shadow-sm"
                        )}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="text-xs text-deep-ink/40 animate-pulse">Elçi n'edip dürüyosa yazıp duru gari...</div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <input 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Muğla'nın neyi meşhur gari?"
                      className="flex-1 bg-warm-cream px-6 py-4 rounded-full border border-deep-ink/5 focus:outline-none focus:border-olive-drab/30 font-sans"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || isTyping}
                      className="w-14 h-14 rounded-full bg-olive-drab flex items-center justify-center text-white disabled:opacity-50 hover:scale-105 transition-transform"
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'gastronomy' && (
            <motion.div
              key="gastronomy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <Utensils className="w-12 h-12 mx-auto text-olive-drab" />
                <h2 className="serif-display text-5xl">Muğla'nın Meşhur <span className="italic">Lezzet Sofrası</span></h2>
                <p className="text-deep-ink/60">Tarhanasından kebabına, tatlısından ot yemeğine Muğla mutfağında her lokma bir sanattır.</p>
              </div>

              <div className="grid gap-12">
                {DISHES.map((dish) => (
                  <div key={dish.id} className="cultural-card flex flex-col lg:flex-row border border-olive-drab/10 overflow-hidden">
                    <div className="lg:w-1/2 overflow-hidden">
                      <img 
                        src={dish.image} 
                        alt={dish.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 min-h-[400px]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-12 lg:w-1/2 space-y-6">
                      <div className="flex items-center gap-3 text-olive-drab">
                        <span className="uppercase text-xs tracking-widest font-bold bg-olive-drab/10 px-2 py-1 rounded">{dish.category}</span>
                      </div>
                      <h3 className="serif-display text-4xl">{dish.title}</h3>
                      <p className="text-lg leading-relaxed text-deep-ink/80 italic border-l-4 border-olive-drab pl-6">
                        "{dish.description}"
                      </p>
                      <p className="text-deep-ink/70 leading-relaxed font-sans">
                        {dish.fullText}
                      </p>
                      
                      <div className="pt-6 grid grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-wider mb-3">Malzemeler</h4>
                          <ul className="space-y-2 text-sm text-deep-ink/60">
                            {dish.ingredients.map((ing, i) => (
                              <li key={i} className="flex gap-2 text-xs">
                                <span className="text-olive-drab">•</span> {ing}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-wider mb-3 underline decoration-olive-drab/30 underline-offset-4">Kültürel Hikayesi</h4>
                          <p className="text-xs text-deep-ink/60 leading-relaxed italic">
                            {dish.story}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Landmark className="w-20 h-20 mx-auto text-olive-drab mb-6 opacity-20" />
              <h2 className="serif-display text-4xl">Tarih Sayfaları Hazırlanıyoñ gari...</h2>
              <p className="mt-4 text-deep-ink/50 max-w-md mx-auto italic">Stratonikeia'dan Knidos'a, antik kentlerin gizli yollarını çok yakında elçimizden duyacaksıñız.</p>
            </motion.div>
          )}

          {activeTab === 'dialect' && (
            <motion.div
              key="dialect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <Languages className="w-12 h-12 mx-auto text-olive-drab" />
                <h2 className="serif-display text-5xl">Muğla <span className="italic">Şivesi Sözlüğü</span></h2>
                <p className="text-deep-ink/60">Bizim buralarda dil, kalbin sesidir. "N'edip duruñ?" diyene "Eyiyim" demek yetmez gari!</p>
              </div>

              <div className="grid gap-4">
                {[
                  { word: 'Gari', meaning: 'Artık, bundan sonra. Cümlenin sonuna yapıştır gitsin!' },
                  { word: 'Ünlemek', meaning: 'Seslenmek, çağırmak. "Ona bi ünle bakem." ' },
                  { word: 'Bakem', meaning: 'Bakalım. Samimiyetin en doğal hali.' },
                  { word: 'Berek', meaning: 'Pek, çok fazla. "Berek datlı olmuş gari." ' },
                  { word: 'N\'edip duruñ?', meaning: 'Nasılsın, ne yapıyorsun? Hal hatır sormanın en Muğlalı yolu.' }
                ].map((item, i) => (
                  <div key={i} className="cultural-card p-6 border border-olive-drab/10 flex justify-between items-center group hover:bg-olive-drab/5 transition-colors cursor-default">
                    <div>
                      <span className="serif-display text-2xl text-deep-ink group-hover:text-olive-drab transition-colors">{item.word}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-deep-ink/60 italic font-sans">{item.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-olive-drab/10 py-12 mt-20 bg-deep-ink text-warm-cream">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="serif-display text-3xl mb-2">Muğla <span className="italic font-light opacity-60">Kültür Elçisi</span></h2>
            <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-40">Muğla'nın Geleceğine Gelenekle Bakıyoruz</p>
          </div>
          <div className="flex gap-8 text-sm uppercase tracking-widest font-medium opacity-60">
            <a href="#" className="hover:text-warm-cream/100 hover:underline">Hakkımızda</a>
            <a href="#" className="hover:text-warm-cream/100 hover:underline">İletişim</a>
            <a href="#" className="hover:text-warm-cream/100 hover:underline">Lezzet Haritası</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-12 border-t border-white/5 flex justify-between items-center opacity-30 text-[10px] uppercase font-bold tracking-widest leading-none">
          <span>&copy; 2024 Muğla Kültür Elçisi AI Projesi</span>
          <div className="flex gap-2 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span>Elçi Çevrimiçi Gari!</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
