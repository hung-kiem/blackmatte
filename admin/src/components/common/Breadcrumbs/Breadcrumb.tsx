import Link from 'next/link'

interface BreadcrumbProps {
    breadcrumbs: {
        label: string
        href?: string
    }[]
}

const Breadcrumb = ({ breadcrumbs }: BreadcrumbProps) => {
    return (
        <nav className="mb-2">
            <ol className="flex items-center text-sm">
                <li className="flex items-center">
                    <Link
                        className="cursor-pointer font-medium hover:font-semibold hover:text-primary"
                        href="/"
                    >
                        VNPAY
                    </Link>
                    <span className="mx-2">/</span>
                </li>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="flex items-center">
                        {index === breadcrumbs.length - 1 ? (
                            <span className="cursor-pointer font-bold text-primary">
                                {breadcrumb.label}
                            </span>
                        ) : (
                            <>
                                {breadcrumb.href ? (
                                    <Link
                                        className="cursor-pointer font-medium hover:font-semibold hover:text-primary"
                                        href={breadcrumb.href}
                                    >
                                        {breadcrumb.label}
                                    </Link>
                                ) : (
                                    <span className="font-medium">
                                        {breadcrumb.label}
                                    </span>
                                )}
                                <span className="mx-2">/</span>
                            </>
                        )}
                        {index < breadcrumbs.length - 1 && (
                            <span className="mx-2">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumb
