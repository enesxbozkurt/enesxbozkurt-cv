export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-6 border-t border-white/5 bg-black/20">
            <div className="container mx-auto px-4 text-center">
                <p className="text-muted/60 text-xs">
                    © {currentYear} Enes Bozkurt
                </p>
            </div>
        </footer>
    )
}
