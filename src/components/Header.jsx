import headerImg from "@/assets/header.jpeg";

export default function Header() {
    return (
        <header className="w-full h-40 md:h-56 lg:h-56 overflow-hidden">
            <img
                src={headerImg}
                alt="Header"
                className="w-full h-full object-cover"
            />
        </header>
    )
}