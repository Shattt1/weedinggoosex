"use client";

import { useState } from "react";
import { useEffect } from "react";

function RSVPForm() {
    const [name, setName] = useState("");
    const [attending, setAttending] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !attending) return;

        setIsSubmitting(true);

        const res = await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, attending }),
        });

        if (res.ok) {
            setIsSuccess(true);
        } else {
            const data = await res.json();
            alert("Ошибка: " + (data.error || "неизвестная"));
        }

        setIsSubmitting(false);
    };

    if (isSuccess) {
        return (
            <div className="text-center py-8">
                <p className="text-xl text-[#5D4037]">Спасибо! ❤️ Ваш ответ отправлен.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-left">
                <label className="block mb-4 text-lg text-[#5D4037]">Ваше Имя и Фамилия</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иванов Иван"
                    className="w-full bg-white border border-[#5D4037] px-6 py-4 text-[#5D4037] placeholder-[#795548] focus:outline-none focus:border-[#5D4037] transition-colors rounded"
                    required
                />
            </div>
            <div className="text-left">
                <label className="block mb-6 text-lg text-[#5D4037]">Сможете ли вы присутствовать?</label>
                <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer text-[#5D4037]">
                        <input
                            type="radio"
                            name="attending"
                            value="yes"
                            checked={attending === "yes"}
                            onChange={(e) => setAttending(e.target.value)}
                            className="w-5 h-5 text-[#5D4037]"
                            required
                        />
                        <span>Обязательно буду</span>
                    </label>
                    <label className="flex items-center gap-4 cursor-pointer text-[#5D4037]">
                        <input
                            type="radio"
                            name="attending"
                            value="no"
                            checked={attending === "no"}
                            onChange={(e) => setAttending(e.target.value)}
                            className="w-5 h-5 text-[#5D4037]"
                        />
                        <span>Не смогу присутствовать</span>
                    </label>
                </div>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#5D4037] text-white px-12 py-4 text-sm tracking-wider hover:bg-[#4E342E] transition-colors disabled:opacity-50 rounded"
            >
                {isSubmitting ? "Отправка..." : "ОТПРАВИТЬ"}
            </button>
        </form>
    );
}

export default function Home() {

    const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const weddingDate = new Date('2026-02-06T00:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        const elements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in');
        elements.forEach((el) => observer.observe(el));

        const heroImage = new Image();
        heroImage.src = "/images/hero3.jpg";
        heroImage.onload = () => {
            setIsHeroImageLoaded(true);
        };

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF0E6] text-[#5D4037]">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-start overflow-hidden pl-8 pr-8">
                <img
                    src="/images/hero3.jpg"
                    alt="Наша свадьба"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isHeroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-black/80 to-transparent z-10"></div>
                <div className="relative z-20 text-white animate-fade-in max-w-2xl">
                    {/* Вертикальная дата слева */}
                    <div className="flex flex-col space-y-2 mb-8">
                        <span className="text-6xl md:text-8xl font-serif tracking-wider"></span>
                        <span className="text-6xl md:text-8xl font-serif tracking-wider"></span>
                        <span className="text-6xl md:text-8xl font-serif tracking-wider"></span>
                    </div>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-20 px-6 max-w-4xl mx-auto text-center animate-on-scroll">
                <h2 className="text-5xl md:text-6xl font-script italic mb-12 text-[#5D4037]">Дорогие гости!</h2>
                <p className="text-lg md:text-xl leading-relaxed mb-6 text-[#5D4037]">
                    В нашей жизни предстоят счастливые<br />
                    перемены! Мы хотим, чтобы в этот день<br />
                    рядом с нами были самые близкие<br />
                    и дорогие для нас люди.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-12 text-[#5D4037]">
                    Будем рады разделить с вами чудесный<br />
                    праздник — день нашей свадьбы.
                </p>

                {/* Calendar */}
                <h3 className="text-4xl md:text-5xl font-serif tracking-widest mb-8 text-[#5D4037]">ФЕВРАЛЬ 2026</h3>
                <div className="flex justify-center gap-4 md:gap-8 mb-4 text-sm md:text-base text-[#795548]">
                    <span className="w-8 md:w-12 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>Пн</span>
                    <span className="w-8 md:w-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>Вт</span>
                    <span className="w-8 md:w-12 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>Ср</span>
                    <span className="w-8 md:w-12 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>Чт</span>
                    <span className="w-8 md:w-12 text-center animate-fade-in" style={{ animationDelay: '1s' }}>Пт</span>
                    <span className="w-8 md:w-12 text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>Сб</span>
                    <span className="w-8 md:w-12 text-center animate-fade-in" style={{ animationDelay: '1.4s' }}>Вс</span>
                </div>
                <div className="flex justify-center gap-4 md:gap-8 text-lg md:text-xl text-[#5D4037]">
                    <span className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center animate-fade-in" style={{ animationDelay: '1.6s' }}>2</span>
                    <span className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center animate-fade-in" style={{ animationDelay: '1.8s' }}>3</span>
                    <span className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center animate-fade-in" style={{ animationDelay: '2s' }}>4</span>
                    <span className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center animate-fade-in" style={{ animationDelay: '2.2s' }}>5</span>
                    <span className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center relative animate-fade-in" style={{ animationDelay: '2.4s' }}>
                        <span className="z-10">6</span>
                        <svg className="absolute inset-0 m-auto w-8 h-8 md:w-12 md:h-14 animate-heartbeat" viewBox="0 0 24 24" fill="none" stroke="#5D4037" strokeWidth="1.5">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </span>
                    <span className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center animate-fade-in" style={{ animationDelay: '2.6s' }}>9</span>
                    <span className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center animate-fade-in" style={{ animationDelay: '2.8s' }}>10</span>
                </div>

                {/* Countdown Timer */}
                <div className="mt-16 pt-12 border-t border-[#795548]">
                    <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl md:text-6xl font-serif text-[#5D4037] mb-2">{timeLeft.days}</div>
                            <div className="text-xs md:text-sm uppercase tracking-wider text-[#795548]">дней</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-6xl font-serif text-[#5D4037] mb-2">{timeLeft.hours}</div>
                            <div className="text-xs md:text-sm uppercase tracking-wider text-[#795548]">часов</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-6xl font-serif text-[#5D4037] mb-2">{timeLeft.minutes}</div>
                            <div className="text-xs md:text-sm uppercase tracking-wider text-[#795548]">минут</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-6xl font-serif text-[#5D4037] mb-2">{timeLeft.seconds}</div>
                            <div className="text-xs md:text-sm uppercase tracking-wider text-[#795548]">секунд</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Timeline */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-script italic text-center mb-16 text-[#5D4037] animate-on-scroll">Программа вечера</h2>
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    <div className="text-center animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                        <img src="https://ext.same-assets.com/3337128347/549636627.svg" alt="Gathering" className="w-16 h-16 mx-auto mb-4" />
                        <div className="text-4xl md:text-5xl font-serif mb-2 text-[#5D4037]">13:00</div>
                        <div className="text-lg text-[#5D4037]">сбор гостей</div>
                    </div>
                    <div className="text-center animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                        <img src="https://ext.same-assets.com/3337128347/1631523801.svg" alt="Ceremony" className="w-16 h-16 mx-auto mb-4" />
                        <div className="text-4xl md:text-5xl font-serif mb-2 text-[#5D4037]">16:40</div>
                        <div className="text-lg text-[#5D4037]">выездная<br />церемония</div>
                    </div>
                    <div className="text-center animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                        <img src="https://ext.same-assets.com/3337128347/3045296183.svg" alt="Banquet" className="w-16 h-16 mx-auto mb-4" />
                        <div className="text-4xl md:text-5xl font-serif mb-2 text-[#5D4037]">17:10</div>
                        <div className="text-lg text-[#5D4037]">начало<br />банкета</div>
                    </div>
                </div>
            </section>

            {/* Wedding Location Section */}
            <section className="py-16 px-6 max-w-4xl mx-auto text-center animate-on-scroll">
                <h2 className="text-5xl md:text-6xl font-script italic mb-8 text-[#5D4037]">Место Венчания</h2>
                <p className="text-xl md:text-2xl mb-2 text-[#5D4037]">Ростовский кафедральный собор Рождества Пресвятой Богородицы</p>
                <p className="text-lg text-[#795548] mb-8">Ростов-на-Дону, улица Станиславского 58</p>
                <button
                    onClick={() => window.open('https://yandex.ru/maps/?text=Ростов-на-Дону, улица Станиславского 58', '_blank')}
                    className="bg-[#5D4037] text-white px-8 py-4 text-sm tracking-wider hover:bg-[#4E342E] transition-colors mb-8"
                >
                    ПОСТРОИТЬ МАРШРУТ
                </button>
                <img
                    src="/images/church.jpg"
                    alt="Церковь"
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                />
            </section>

            {/* Reception Location Section */}
            <section className="py-16 px-6 max-w-4xl mx-auto text-center animate-on-scroll">
                <h2 className="text-5xl md:text-6xl font-script italic mb-8 text-[#5D4037]">Место Банкета</h2>
                <p className="text-xl md:text-2xl mb-2 text-[#5D4037]">Банкетный зал "Шарден"</p>
                <p className="text-lg text-[#795548] mb-8">Ростов-на-Дону, улица Белорусская 215/1</p>
                <button
                    onClick={() => window.open('https://yandex.ru/maps/?text=Ростов-на-Дону, улица Белорусская 215/1', '_blank')}
                    className="bg-[#5D4037] text-white px-8 py-4 text-sm tracking-wider hover:bg-[#4E342E] transition-colors mb-8"
                >
                    ПОСТРОИТЬ МАРШРУТ
                </button>
                <img
                    src="/images/reception.jpg"
                    alt="Место фуршета"
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                />
            </section>

            {/* Dress Code */}
            <section className="py-16 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-5xl md:text-6xl font-script italic mb-8 text-[#5D4037]">Дресс-код</h2>
                <p className="text-lg md:text-xl leading-relaxed mb-12 text-[#5D4037]">
                    Мы очень старались сделать праздник<br />
                    красивым и будем рады, если в своих<br />
                    нарядах Вы поддержите цветовую гамму<br />
                    нашей свадьбы.
                </p>

                {/* Палитра цветов */}
                <div className="flex justify-center gap-6 mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F5E6E6] shadow-lg animate-on-scroll" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E8DFD3] shadow-lg animate-on-scroll" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#B5B5B5] shadow-lg animate-on-scroll" style={{ animationDelay: '0.4s' }}></div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#8C6A5D] shadow-lg animate-on-scroll" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1A1A1A] shadow-lg animate-on-scroll" style={{ animationDelay: '0.6s' }}></div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#92AA5C] shadow-lg animate-on-scroll" style={{ animationDelay: '0.6s' }}></div>
                </div>

                {/* Примеры нарядов */}
                <div className="mt-8">
                    <img
                        src="/images/dress-code.jpg"
                        alt="Примеры нарядов для дресс-кода"
                        className="w-full max-w-6xl mx-auto rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Wishes Section */}
            <section className="py-16 px-6 max-w-6xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-script italic text-center mb-16 text-[#5D4037] animate-on-scroll">Пожелания</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-[#5D4037] text-white p-8 rounded-lg relative animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                        <div className="absolute top-4 right-4 text-8xl font-serif opacity-20">01</div>
                        <h3 className="text-3xl font-script italic mb-6">Подарки</h3>
                        <p className="text-sm leading-relaxed">
                            Свои теплые слова и пожелания<br />
                            напишите в сердцах, а подарки<br />
                            – в конверте.
                        </p>
                    </div>
                    <div className="bg-[#5D4037] text-white p-8 rounded-lg relative animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute top-4 right-4 text-8xl font-serif opacity-20">02</div>
                        <h3 className="text-3xl font-script italic mb-6">Цветы</h3>
                        <p className="text-sm leading-relaxed">
                            Если Вы захотите подарить<br />
                            нам цветы, то пожалуйста<br />
                            не мучить букеты ростовской<br />
                            жарой, а заменить их<br />
                            на бутылочку вашего<br />
                            любимого алкоголя для нашей<br />
                            домашней коллекции.
                        </p>
                    </div>
                    <div className="bg-[#5D4037] text-white p-8 rounded-lg relative animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                        <div className="absolute top-4 right-4 text-8xl font-serif opacity-20">03</div>
                        <h3 className="text-3xl font-script italic mb-6">Дети</h3>
                        <p className="text-sm leading-relaxed">
                            Территория ресторана<br />
                            не предусматривает наличие<br />
                            детских зон и отдельных<br />
                            пространств для организации<br />
                            детского досуга, позаботьтесь<br />
                            заранее о том, с кем оставить<br />
                            Вашу кроху на время<br />
                            праздничного вечера.<br />
                            Благодарим Вас за понимание!
                        </p>
                    </div>
                </div>
            </section>

            {/* Organizer Contact */}
            <section className="py-16 px-6 max-w-4xl mx-auto text-center animate-on-scroll">
                <h2 className="text-5xl md:text-6xl font-script italic mb-8 text-[#5D4037]">Наш организатор</h2>
                <p className="text-lg mb-6 text-[#5D4037]">
                    Если Вы заблудились, готовите сюрприз<br />
                    или у Вас появились какие-либо вопросы,<br />
                    Вам с радостью поможет<br />
                    наш организатор:
                </p>
                <h3 className="text-5xl font-serif tracking-[0.3em] mb-8 text-[#5D4037]">1</h3>
                <button className="bg-[#5D4037] text-white px-8 py-4 text-sm tracking-wider hover:bg-[#4E342E] transition-colors mb-8">
                    213
                </button>
                <div className="flex justify-center gap-4">
                    <a href="https://wa.me/79604706930" className="w-12 h-12 bg-[#5D4037] rounded-full flex items-center justify-center hover:bg-[#4E342E] transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                    </a>
                    <a href="https://t.me/" className="w-12 h-12 bg-[#5D4037] rounded-full flex items-center justify-center hover:bg-[#4E342E] transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/" className="w-12 h-12 bg-[#5D4037] rounded-full flex items-center justify-center hover:bg-[#4E342E] transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* Closing Message */}
            <section className="py-16 px-6 max-w-4xl mx-auto text-center animate-on-scroll">
                <p className="text-xl md:text-2xl italic mb-2 text-[#5D4037]">Наша история — это самая высокая</p>
                <p className="text-3xl md:text-4xl font-script italic mb-8 text-[#795548]">снежная гора.</p>
                <p className="text-lg leading-relaxed mb-8 text-[#5D4037]">
                    Даже те, кто не верит в волшебство<br />
                    и мистику, перевернут<br />
                    свое сознание в этот вечер.
                </p>
                <div className="w-24 h-px bg-[#795548] mx-auto mb-8"></div>
                <p className="text-lg leading-relaxed mb-8 text-[#5D4037]">
                    Мы будем очень рады если<br />
                    Вы сможете присутствовать<br />
                    на нашем празднике!
                </p>
                <p className="text-4xl md:text-5xl font-script italic text-[#5D4037]">Павел<br />и Дилафруз</p>
            </section>

            {/* RSVP Form */}
            <section className="bg-[#5D4037] py-16 px-6 animate-on-scroll">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl font-script italic mb-8 text-white">Анкета гостя</h2>
                    <p className="text-lg mb-12 text-white">
                        Ваши ответы очень помогут нам<br />
                        при организации свадьбы
                    </p>

                    <div className="bg-white p-8 rounded-lg">
                        <RSVPForm />
                    </div>

                    <p className="text-sm mt-8 text-white">
                        Пожалуйста, дайте свой ответ<br />
                        <strong>до 1 Января 2026</strong>
                    </p>
                </div>
            </section>
        </div>
    );
}