import { useEffect, useRef, useState } from "react";
import TestimonialCard from "../ui/TestimonialCard";

function TestimonialSection() {
    const texts = [
        {
            initials: "KA",
            name: "Kovács Anna",
            title: "Budapest, ELTE hallgató",
            testimonial: `"Legjobb döntés volt az érettségi előtt! A magyarázatok sokkal érthetőbbek, mint a tankönyvben. Sikerült a töri érettségi ötösre!"`
        },
        {
            initials: "BT",
            name: "Balla Tamás",
            title: "Debrecen, Egyetemi hallgató",
            testimonial: `"A funkciók tesznek nagyon sokat segítenek a tanulásban az érettségire. Különösen az eszközök tippek jönnek be!"`
        },
        {
            initials: "SL",
            name: "Szabó Luca",
            title: "Szeged, Orvosi egyetem",
            testimonial: `"Imádom, hogy bárhonnan tudom tanulni mobilon is. A rangsor pedig motivált, hogy minden nap fejlődjek."`
        }
    ];

    const sectionRef = useRef(null);
    const [hasEntered, setHasEntered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [reducedMotion, setReducedMotion] = useState(false);

    // prefers-reduced-motion figyelése
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mediaQuery.matches);

        const handler = (e) => setReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Belépési animáció indítása — csak egyszer, amikor a szekció kb. 35%-a látszik
    useEffect(() => {
        const node = sectionRef.current;
        if (!node || hasEntered) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                        setHasEntered(true);
                        setActiveIndex(0);
                        observer.disconnect();
                    }
                });
            },
            { threshold: [0, 0.35, 1] }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [hasEntered]);

    // Egy kártya animációja befejeződött -> következő indul
    const handleCardComplete = (index) => {
        setActiveIndex((prev) => (index === prev ? prev + 1 : prev));
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 px-4 bg-secondary"
            data-purpose="user-testimonials"
            id="testimonials"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                    <div className="relative group cursor-pointer">
                        <div className="bg-white rounded-3xl h-full flex items-center justify-center overflow-hidden shadow-2xl relative">
                            <div className="absolute inset-0 bg-brand-purple opacity-20"></div>
                            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-xl z-10 group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div
                        className="testimonial-scroll flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        <style>{`
                            .testimonial-scroll::-webkit-scrollbar { display: none; }
                        `}</style>
                        {texts.map((text, index) => (
                            <TestimonialCard
                                key={index}
                                initals={text.initials}
                                name={text.name}
                                title={text.title}
                                testimonial={text.testimonial}
                                startAnimation={index <= activeIndex}
                                onComplete={() => handleCardComplete(index)}
                                reducedMotion={reducedMotion}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialSection;