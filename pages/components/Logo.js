import Link from "next/link";

export default function Logo() {
    return (
        <Link href='/#home'>
        <div className="fixed top-2 left-3 font-monument uppercase z-20">
            Dialect Labs
        </div>
        </Link>
    )
}