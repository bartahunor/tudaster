import TestimonialSection from "../sections/TestimonialSection";
import CTASection from "../sections/CTASection";
import RecommendedSubjectsSection from "../sections/RecommendedSubjectsSection";
import Hero from "../sections/Hero";
import WorkFlow from "../sections/WorkFlow";

function HomePage() {
    return (
        <div >
            <div className="h-20"></div>
            <Hero />
            <WorkFlow />
            <RecommendedSubjectsSection />
            <TestimonialSection />
            <CTASection />
        </div>
    );
}

export default HomePage;