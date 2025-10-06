import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ClickOutside from '@/components/ClickOutside'
import IconLogOut from '@/components/common/icons/IconLogOut'
import IconUser from '@/components/common/icons/IconUser'
import IconCollapseArrow from '@/components/common/icons/IconCollapseArrow'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { signOut, userInfo } = useAuth()
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut()
        router.replace('/signIn')
    }

    return (
        <ClickOutside
            onClick={() => setDropdownOpen(false)}
            className="relative"
        >
            <div
                role={'button'}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
            >
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white">
                        {userInfo?.name}
                    </span>
                    <span className="block text-xs">{userInfo?.roleName}</span>
                </span>

                <span className="h-12 w-12 rounded-full">
                    <Image
                        width={112}
                        height={112}
                        src={'/images/user/user-01.png'}
                        onError={(event) => {
                            if (event.currentTarget.parentElement) {
                                event.currentTarget.parentElement.classList.add(
                                    'hidden'
                                )
                            }
                        }}
                        style={{
                            width: 'auto',
                            height: 'auto',
                        }}
                        alt="User"
                    />
                </span>

                <IconCollapseArrow direction="down" />
            </div>
            {dropdownOpen && (
                <div
                    className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
                >
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-4 dark:border-strokedark">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                            >
                                <IconUser />
                                Quản lý tài khoản
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                        onClick={handleSignOut}
                    >
                        <IconLogOut />
                        Đăng xuất
                    </button>
                </div>
            )}
        </ClickOutside>
    )
}

export default DropdownUser
