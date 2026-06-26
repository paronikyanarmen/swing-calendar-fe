import {Link} from '@tanstack/react-router'

export function Header() {
    return (
        <header className="flex items-center justify-center gap-4 border-b border-gray-200 px-6 py-4">
            <nav className="flex items-center gap-2">
                <Link
                    to="/"
                    activeOptions={{exact: true}}
                    className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200 transition-colors"
                    activeProps={{className: 'bg-gray-200'}}
                >
                    Home
                </Link>
                <Link
                    to="/calendar"
                    className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200 transition-colors"
                    activeProps={{className: 'bg-gray-200'}}
                >
                    Calendar
                </Link>
            </nav>
        </header>
    )
}
