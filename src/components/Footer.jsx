export default function Footer({
    designer = "Ramxcodes",
    year = new Date().getFullYear(),
}) {
    return (
        <footer className="mt-12 py-8">
            <div className="max-w-3xl mx-auto text-center text-xs text-gray-400">
                <div>
                    Design &amp; Developed by <span className="text-gray-200 font-semibold">{designer}</span>
                </div>
                <div className="mt-1">© {year}. All rights reserved.</div>
            </div>
        </footer>
    );
}