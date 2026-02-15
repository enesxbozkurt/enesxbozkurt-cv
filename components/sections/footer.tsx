export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-8 border-t border-white/5 bg-black/20">
            <div className="container mx-auto px-4 text-center">
                <p className="text-muted/40 text-[10px] tracking-widest uppercase">
                    © {currentYear} Enes Bozkurt
                </p>
            </div>
        </footer>
    )
}
