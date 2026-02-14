export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-8 border-t border-white/5 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-muted text-sm">
                    © {currentYear} built with <span className="text-primary">Next.js</span> & <span className="text-primary">Supabase</span>
                </p>

                <div className="flex items-center gap-6 text-sm text-muted">
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="https://github.com/inforra" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Source Code
                    </a>
                </div>
            </div>
        </footer>
    )
}
