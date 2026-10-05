'use client';

import { useState } from 'react';

const PRICING = {
  manicure: [
    {
      title: 'Снятие + маникюр + гель-лак',
      price: '1 500 KGS',
      time: '1 ч 30 мин',
    },
    {
      title: 'Наращивание',
      price: '2 000 KGS',
      time: '2 ч 00 мин',
    },
  ],
  pedicure: [
    {
      title: 'Смарт-педикюр',
      price: '1 800 KGS',
      time: '1 ч 15 мин',
    },
  ],
  complex: [
    {
      title: 'Комплекс в 4 руки',
      price: '3 200 KGS',
      time: '1 ч 45 мин',
    },
  ],
};

const TABS = [
  { id: 'manicure', label: 'Маникюр' },
  { id: 'pedicure', label: 'Педикюр' },
  { id: 'complex', label: 'Комплексы' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=600&auto=format&fit=crop',
];

const REVIEWS = [
  {
    text: 'Лучший мастер в городе! Ногти держатся идеально месяц, форма просто восторг. Отдельное спасибо за кофе 🤎',
    author: 'Алина К.',
  },
  {
    text: 'Очень чистый и аккуратный смарт-педикюр. Стерильно на 100%, инструменты открывают при мне. Рекомендую!',
    author: 'Мээрим',
  },
  {
    text: 'Аида всегда угадывает с цветом и формой. Спасла мои перепиленные ногти, комплекс в 4 руки — топ.',
    author: 'Елена',
  },
];

export default function BeautyDemo() {
  const [activeTab, setActiveTab] = useState<keyof typeof PRICING>('manicure');

  return (
    <main className="min-h-screen bg-[#FDFBF9] text-[#2D2A26] font-sans selection:bg-[#B78C7A] selection:text-white">
      {/* Mobile Wrapper */}
      <div className="max-w-[480px] mx-auto bg-[#FDFBF9] min-h-screen shadow-[0_0_40px_rgba(0,0,0,0.05)] relative pb-32">
        
        {/* HEADER */}
        <section className="flex flex-col items-center text-center pt-12 px-6">
          <div className="relative w-28 h-28 mb-5 rounded-full p-1 border border-[#F0EBE1] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
              alt="Aida Nails & Podology"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl font-medium tracking-tight mb-4 text-[#2D2A26]">
            Aida Nails & Podology
          </h1>
          
          <div className="flex flex-col gap-2 w-full max-w-[320px]">
            <div className="bg-[#F0EBE1] text-[#A67C52] text-[11px] font-medium uppercase tracking-wider px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Бишкек • Центр (Токтогула / Исанова)
            </div>
            
            <div className="bg-[#FDFBF9] border border-[#F0EBE1] text-[#7C7A77] text-[11px] font-medium uppercase tracking-wider px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
              <svg className="w-4 h-4 text-[#A67C52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Стерильность 100% (Сухожар ГП-10)
            </div>
          </div>
        </section>

        {/* PRICING WITH TABS */}
        <section className="px-6 py-12">
          {/* Tabs Navigation */}
          <div className="flex justify-between items-center bg-[#F5F2ED] p-1 rounded-xl mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof typeof PRICING)}
                className={`flex-1 text-[12px] font-medium uppercase tracking-wide py-2.5 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#B78C7A] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                    : 'text-[#8C8A87] hover:text-[#2D2A26]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Pricing List */}
          <div className="flex flex-col gap-3">
            {PRICING[activeTab].map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F5F2ED] animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-[15px]">{item.title}</h3>
                  <span className="font-medium text-[#B78C7A] whitespace-nowrap ml-4">
                    {item.price}
                  </span>
                </div>
                <div className="flex justify-end items-center text-[12px] text-[#8C8A87]">
                  <span className="flex items-center gap-1.5 whitespace-nowrap bg-[#FDFBF9] px-2.5 py-1.5 rounded-md">
                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO GRID 2x2 */}
        <section className="px-6 py-4">
          <h2 className="text-[12px] uppercase tracking-[0.2em] text-[#A67C52] text-center mb-6 font-medium">
            Портфолио
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {GALLERY.map((img, i) => (
              <div key={i} className="relative w-full aspect-square bg-[#F0EBE1] rounded-2xl shadow-sm">
                <img 
                  src={img} 
                  alt="Работы студии" 
                  className="w-full h-full object-cover rounded-2xl" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-12">
          <h2 className="text-[12px] uppercase tracking-[0.2em] text-[#A67C52] text-center mb-6 font-medium px-6">
            Отзывы клиентов
          </h2>
          <div className="flex flex-col gap-4 px-6">
            {REVIEWS.map((review, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F5F2ED]"
              >
                <div className="flex gap-1 mb-3 text-[#B78C7A]">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[14px] text-[#7C7A77] leading-relaxed font-light italic mb-4">
                  «{review.text}»
                </p>
                <span className="block text-[13px] font-medium text-[#2D2A26]">
                  — {review.author}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <section className="px-6 pb-20 pt-4 text-center">
          <p className="text-[12px] uppercase text-[#A67C52] tracking-wider mb-2 font-medium">Aida Nails & Podology</p>
          <p className="text-[13px] text-[#7C7A77]">Ежедневно с 10:00 до 20:00</p>
        </section>

        {/* FIXED BOTTOM CTA */}
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="w-full max-w-[448px] pointer-events-auto">
            <a 
              href="https://wa.me/996555000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-[#A67C52] text-white py-[18px] rounded-2xl text-[15px] font-medium shadow-[0_8px_30px_rgba(166,124,82,0.35)] active:scale-[0.98] transition-transform"
            >
              <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Записаться в WhatsApp
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
