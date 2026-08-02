function CTASection() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto bg-secondary rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
                <h2 className="text-4xl lg:text-5xl font-black mb-6 relative z-10">Kezdd el a felkészülést még ma!</h2>
                <p className="text-primary/20 text-lg opacity-80 mb-10 max-w-2xl mx-auto relative z-10 text-white/80">
                    Csatlakozz több ezer sikeres érettségizőhöz és érd el az álmaid.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <button id="regisztracio" className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform" >
                        Regisztráció
                    </button>
                </div>
            </div>
        </section>
    )
};

export default CTASection;