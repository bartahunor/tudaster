import TestimonialSection from "../sections/TestimonialSection";
import CTASection from "../sections/CTASection";
import RecommendedSubjectsSection from "../sections/RecommendedSubjectsSection";

function HomePage() {
    return (
        <div >
            <div className="h-20"></div>
            <RecommendedSubjectsSection />
            <TestimonialSection />
            <CTASection />
        </div>
    );
}

export default HomePage;