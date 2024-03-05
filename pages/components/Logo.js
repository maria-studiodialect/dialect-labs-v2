import Link from "next/link";

export default function Logo({color}) {
    return (
        <Link href='/#home'>
        <div className={`fixed top-2 left-3 font-monument uppercase z-20 ${color === 'white' ? 'text-white' : 'text-black'}`}>
            Dialect Labs
        </div>
        </Link>
    )
}