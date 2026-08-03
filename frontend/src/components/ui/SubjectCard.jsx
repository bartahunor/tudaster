function SubjectCard ({icon, color, name, topic, task}){

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center cursor-pointer group">
            <div className={color}>
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
            <h4 className="font-bold text-lg mb-1">{name}</h4>
            <p className="text-xs text-slate-400 font-medium">{topic} témakör • {task} feladat</p>
        </div>
    )
};

export default SubjectCard;