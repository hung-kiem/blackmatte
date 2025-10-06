import classNames from 'classnames'

export default function Loader({ partial }: { partial?: boolean }) {
    return (
        <div
            className={classNames(
                'flex items-center justify-center bg-white dark:bg-black',
                {
                    'h-[calc(100vh-80px-32px)]': partial,
                    'h-screen': !partial,
                }
            )}
        >
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    )
}
