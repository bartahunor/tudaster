import { useEffect, useRef, useState } from "react";

// Buborék animáció időzítése (ms)
const BUBBLE_DURATION = 500;      // opacity + scale + translateY animáció hossza
const HEADER_STAGGER = 250;       // ennyivel a buborék indulása után jelenik meg a fejléc
const POST_TYPING_PAUSE = 200;    // typewriter vége utáni szünet, mielőtt a következő indul
const TYPE_MIN_DELAY = 15;        // ms / karakter (min)
const TYPE_MAX_DELAY = 25;        // ms / karakter (max)

function TestimonialCard({ initals, name, title, testimonial, startAnimation, onComplete, reducedMotion }) {
    // phase: "idle" -> "bubble" -> "header" -> "typing" -> "done"
    const [phase, setPhase] = useState("idle");
    const [typedLength, setTypedLength] = useState(0);

    const startedRef = useRef(false);
    const timeoutsRef = useRef([]);

    const addTimeout = (fn, delay) => {
        const id = setTimeout(fn, delay);
        timeoutsRef.current.push(id);
        return id;
    };

    // Indítás — csak egyszer fusson le kártyánként
    useEffect(() => {
        if (!startAnimation || startedRef.current) return;
        startedRef.current = true;

        if (reducedMotion) {
            setPhase("done");
            setTypedLength(testimonial.length);
            addTimeout(() => onComplete?.(), 50);
            return;
        }

        setPhase("bubble");
        addTimeout(() => setPhase("header"), BUBBLE_DURATION);
        addTimeout(() => setPhase("typing"), BUBBLE_DURATION + HEADER_STAGGER);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startAnimation]);

    // Typewriter effekt
    useEffect(() => {
        if (phase !== "typing") return;

        if (typedLength >= testimonial.length) {
            setPhase("done");
            addTimeout(() => onComplete?.(), POST_TYPING_PAUSE);
            return;
        }

        const delay = TYPE_MIN_DELAY + Math.random() * (TYPE_MAX_DELAY - TYPE_MIN_DELAY);
        const id = setTimeout(() => setTypedLength((len) => len + 1), delay);
        timeoutsRef.current.push(id);

        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, typedLength]);

    // Cleanup
    useEffect(() => {
        return () => timeoutsRef.current.forEach(clearTimeout);
    }, []);

    const bubbleVisible = reducedMotion ? startAnimation : phase !== "idle";
    const headerVisible = reducedMotion
        ? startAnimation
        : phase === "header" || phase === "typing" || phase === "done";
    const showCursor = !reducedMotion && phase === "typing";
    const typedText = testimonial.slice(0, typedLength);

    return (
        <div
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
            style={{
                opacity: bubbleVisible ? 1 : 0,
                transform: bubbleVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
                transition: reducedMotion
                    ? "opacity 300ms ease-out"
                    : `opacity ${BUBBLE_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${BUBBLE_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                willChange: "opacity, transform",
            }}
        >
            <div
                className="flex items-center mb-4"
                style={{
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 300ms ease-out, transform 300ms ease-out",
                }}
            >
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm mr-3">
                    {initals}
                </div>
                <div>
                    <h5 className="font-bold text-slate-800 text-sm">{name}</h5>
                    <p className="text-xs text-slate-400">{title}</p>
                </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed relative">
                {/* Láthatatlan, de helyet foglaló szöveg — ez tartja meg a végleges magasságot/szélességet, hogy gépelés közben ne legyen layout shift (CLS) */}
                <span className="invisible" aria-hidden="true">"{testimonial}"</span>

                {/* A ténylegesen látszó, animált szöveg a fenntartott hely fölé pozicionálva */}
                <span className="absolute inset-0">
                    {reducedMotion ? (
                        <>{testimonial}</>
                    ) : (
                        <>
                            {typedText}
                            {showCursor && (
                                <span className="inline-block w-[2px] h-[1em] bg-slate-400 ml-[1px] align-middle animate-pulse" />
                            )}
                            {phase === "done" && ''}
                        </>
                    )}
                </span>
            </p>
        </div>
    );
}

export default TestimonialCard;