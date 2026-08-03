import SubjectCard from '../ui/SubjectCard';

function RecommendedSubjectsSection() {
    const subjects = [
        {
            icon: "translate",
            color: "w-16 h-16 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors",
            name: "Angol nyelv",
            topic: 0,
            task: 0
        },
        {
            icon: "history_edu",
            color: "w-16 h-16 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors",
            name: "Történelem",
            topic: 0,
            task: 0
        },
        {
            icon: "menu_book",
            color: "w-16 h-16 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors",
            name: "Irodalom",
            topic: 0,
            task: 0
        },
        {
            icon: "science",
            color: "w-16 h-16 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors",
            name: "Biológia",
            topic: 0,
            task: 0
        }
    ];

    return (
        <section className="py-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-black mb-4" id="tantargyak">Tantárgyaink:</h2>
                        <p className="text-slate-500">Minden tananyagunk az Oktatási Hivatal által közzétett érettségi feladatok követelményeit tartalmazza.</p>
                    </div>
                    <a className="text-primary font-bold flex items-center gap-2 group" href="#">

                    </a>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {subjects.map((subject, index) => (
                        <SubjectCard
                            key={index}
                            icon={subject.icon}
                            color={subject.color}
                            name={subject.name}
                            topic={subject.topic}
                            task={subject.task}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
};

export default RecommendedSubjectsSection;