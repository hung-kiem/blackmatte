import React, { ReactNode, useState, MouseEvent } from 'react'
interface CollapsibleCardProps {
    title: string
    children: ReactNode
}
const CollapsibleCard = ({ title, children }: CollapsibleCardProps) => {
    const [isOpen, setIsOpen] = useState(true)

    const toggleCollapse = () => setIsOpen(!isOpen)

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    return (
        <div className="relative space-y-4 rounded-xl bg-white p-4 dark:bg-black">
            <div
                className="cursor-pointer text-lg font-semibold text-black dark:text-white"
                onClick={toggleCollapse}
                onMouseDown={handleMouseDown}
                style={{ userSelect: 'none' }}
            >
                {title}
            </div>
            <svg
                className={`absolute right-4 top-1 fill-current ${
                    isOpen ? 'rotate-180' : ''
                } `}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                    fill=""
                />
            </svg>

            {isOpen && <div className="mt-2">{children}</div>}
        </div>
    )
}

export default CollapsibleCard
