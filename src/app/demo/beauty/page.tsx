import Image from 'next/image';

const SERVICES = [
  {
    title: 'Маникюр + покрытие',
    desc: 'Аппаратный, выравнивание, однотонное покрытие',
    price: '1 200 KGS',
    time: '1 ч 30 мин',
  },
  {
    title: 'Смарт-педикюр',
    desc: 'Обработка стоп, пальчиков, гель-лак',
    price: '1 500 KGS',
    time: '1 ч 15 мин',
  },
  {
    title: 'Наращивание ногтей',
    desc: 'Наращивание на нижние формы, опил',
    price: '1 800 KGS',
    time: '2 ч 00 мин',
  },
  {
    title: 'Дизайн (френч / втирка)',
    desc: 'Утонченный дизайн на все ногти',
    price: '300 KGS',
    time: '15 мин',
  },
  {
    title: 'Укрепление гелем',
    desc: 'Жесткий гель для ломких ногтей',
    price: '200 KGS',
    time: '20 мин',
  },
];

const PORTFOLIO = [
  'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516975080661-46bfa332b89f?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=400&auto=format&fit=crop',
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
    text: 'Аида всегда угадывает с цветом и формой. Спасла мои перепиленные ногти, теперь только к ней.',
    author: 'Елена',
  },
];

export default function BeautyDemo() {
  return (
    <main className="min-h-screen bg-[#FDFBF9] text-[#2D2A26] font-sans selection:bg-[#B78C7A] selection:text-white">
      {/* Mobile Wrapper */}
      <div className="max-w-[480px] mx-auto bg-[#FDFBF9] min-h-screen shadow-[0_0_40px_rgba(0,0,0,0.05)] relative pb-28">
        
        {/* HEADER */}
        <section className="flex flex-col items-center text-center pt-16 px-6">
          <div className="relative w-24 h-24 mb-5">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
              alt="Aida - Мастер маникюра"
              fill
              className="rounded-full object-cover border border-[#F0EBE1] shadow-sm p-1"
            />
          </div>
          <h1 className="text-2xl font-medium tracking-tight mb-3">
            Aida Nail Studio
          </h1>
          <div className="bg-[#F0EBE1] text-[#B78C7A] text-[10px] font-medium uppercase tracking-[0.1em] px-4 py-1.5 rounded-full mb-4 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Бишкек, центр
          </div>
          <p className="text-[14px] font-light text-[#7C7A77] leading-relaxed max-w-[280px]">
            Премиальный маникюр, стерильность 100%, смарт-педикюр.
          </p>
        </section>

        {/* PRICING */}
        <section className="px-6 py-12">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#B78C7A] text-center mb-6 font-medium">
            Услуги & Прайс
          </h2>
          <div className="flex flex-col gap-3">
            {SERVICES.map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F5F2ED]"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-[15px]">{item.title}</h3>
                  <span className="font-medium text-[#B78C7A] whitespace-nowrap ml-4">
                    {item.price}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[12px] text-[#8C8A87]">
                  <span className="line-clamp-1 mr-4">{item.desc}</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap bg-[#FDFBF9] px-2 py-1 rounded-md">
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

        {/* PORTFOLIO GRID 2x3 */}
        <section className="px-6 py-4">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#B78C7A] text-center mb-6 font-medium">
            Портфолио
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {PORTFOLIO.map((img, i) => (
              <div key={i} className="relative w-full aspect-square bg-[#F0EBE1] overflow-hidden rounded-xl">
                <Image 
                  src={img} 
                  alt="Manicure work" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 480px) 50vw, 240px"
                />
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS (Snap Carousel) */}
        <section className="py-12">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#B78C7A] text-center mb-6 font-medium px-6">
            Отзывы
          </h2>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {REVIEWS.map((review, i) => (
              <div 
                key={i} 
                className="min-w-[260px] w-[85%] snap-center bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F5F2ED] flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-3 text-[#B78C7A]">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[13px] text-[#7C7A77] leading-relaxed font-light italic">
                    «{review.text}»
                  </p>
                </div>
                <span className="block mt-4 text-[12px] font-medium text-[#2D2A26]">
                  — {review.author}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER INFO */}
        <section className="px-6 py-8 text-center border-t border-[#F5F2ED] mb-8">
          <h3 className="font-medium text-[#2D2A26] mb-2">Aida Nail Studio</h3>
          <p className="text-[13px] text-[#7C7A77] mb-1">г. Бишкек, ул. Токтогула 125/1</p>
          <p className="text-[13px] text-[#7C7A77]">Ежедневно с 10:00 до 20:00</p>
        </section>

        {/* FIXED BOTTOM CTA */}
        <div className="fixed bottom-0 left-0 right-0 w-full z-50 pointer-events-none">
          <div className="max-w-[480px] mx-auto p-4 pb-6 bg-gradient-to-t from-[#FDFBF9] via-[#FDFBF9]/95 to-transparent pointer-events-auto">
            <a 
              href="https://wa.me/996555000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-[#B78C7A] text-white py-4 rounded-xl text-[14px] font-medium tracking-wide shadow-[0_8px_25px_rgba(183,140,122,0.35)] active:scale-[0.98] transition-transform"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
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
