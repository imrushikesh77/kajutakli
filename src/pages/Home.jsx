import Header from "@/components/Header";
import Profile from "@/components/Profile";

export default function Home() {
    return (
        // stacked on small screens; when viewport >= 800px use a 3-col grid with center fixed at 800px + 20px for side gaps
        <div className="min-h-screen bg-brand-dark flex flex-col min-[800px]:grid min-[800px]:grid-cols-[1fr_minmax(0,calc(800px+20px))_1fr]">
            {/* left filler (only visible when >=800px) */}
            <div className="hidden min-[800px]:block bg-gray-100 dark:bg-brand-dark" />

            {/* center column: it contains an inner fixed-width box (max 800px) with 10px margin on both sides ALWAYS */}
            <main className="w-full flex justify-center bg-transparent">
                <div
                    className="w-full max-w-[800px] mx-[10px] flex flex-col items-center justify-start"
                    style={{ boxShadow: 'inset -0.5px 0 0 rgba(55,65,81,0.6), inset 0.5px 0 0 rgba(55,65,81,0.6)' }}
                >
                    <Header />
                    <Profile />
                </div>
            </main>

            {/* right filler (only visible when >=800px) */}
            <div className="hidden min-[800px]:block bg-gray-100 dark:bg-brand-dark" />
        </div>
    )
}