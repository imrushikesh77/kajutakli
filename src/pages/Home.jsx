import Header from "@/components/Header";
import Profile from "@/components/Profile";
import SectionTabs from "@/components/SectionTabs";
import Quote from "@/components/Quote";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        // stacked on small screens; when viewport >= 800px use a 3-col grid with center fixed at 800px + 20px for side gaps
        <div className="relative overflow-hidden min-h-screen bg-brand-dark flex flex-col min-[800px]:grid min-[800px]:grid-cols-[1fr_minmax(0,calc(800px+20px))_1fr] custom-scrollbar">
            {/* full-page tilted color/blur overlay (behind content) */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,140,30,0.30) 0%, rgba(255,140,30,0.12) 28%, rgba(0,0,0,0) 52%, rgba(10,110,230,0.12) 76%, rgba(10,110,230,0.34) 100%)',
                    filter: 'blur(90px) saturate(120%)',
                }}
            />

            {/* left filler (only visible when >=800px) */}
            <div className="hidden min-[800px]:block bg-gray-100 dark:bg-brand-dark" />

            {/* center column: it contains an inner fixed-width box (max 800px) with 10px margin on both sides ALWAYS */}
            <main className="w-full flex justify-center bg-transparent">
                <div
                    className="w-full max-w-[800px] mx-[10px] flex flex-col items-center justify-start relative z-10 bg-white/5 dark:bg-white/5 backdrop-blur-sm custom-scrollbar"
                    style={{
                        boxShadow: 'inset -0.5px 0 0 rgba(55,65,81,0.6), inset 0.5px 0 0 rgba(55,65,81,0.6)',
                        WebkitBackdropFilter: 'blur(8px)', /* Safari */
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <Header />
                    <Profile />
                    <SectionTabs />
                    <Quote
                        text="You have a right to perform your prescribed duty, but you are not entitled to the fruits of actions."
                        author="Bhagavad Gita"
                    />

                    <Footer designer="kajutakli" />
                </div>
            </main>

            {/* right filler (only visible when >=800px) */}
            <div className="hidden min-[800px]:block bg-gray-100 dark:bg-brand-dark" />
        </div>
    )
}