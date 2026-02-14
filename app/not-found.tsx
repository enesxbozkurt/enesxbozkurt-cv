export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-text mb-4">Profile Not Found</h2>
                <p className="text-muted mb-8">
                    The CV profile you're looking for doesn't exist or is not public.
                </p>
                <a
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-primary text-bg px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
                >
                    Go to Home
                </a>
            </div>
        </div>
    )
}
