
import HeroSection from '../components/HeroSection';
import UserStatistics from '../components/UserStatistics';
import CommentsSection from '../components/CommentsSection';
import AppDescription from '../components/AppDescription';


function Landing() {
    return (
        <div>
            <HeroSection />
            <AppDescription />
            <UserStatistics />
            <CommentsSection />
        </div>
    );
}

export default Landing;
