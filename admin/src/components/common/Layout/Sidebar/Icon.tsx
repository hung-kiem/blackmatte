import * as React from 'react'
import IconHome from '@/components/common/icons/IconHome'
import IconUser from '@/components/common/icons/IconUser'
import IconComponent from '@/components/common/icons/IconComponent'
import IconDashboard from '@/components/common/icons/IconDashboard'
import IconTransaction from '@/components/common/icons/IconTransaction'
import IconReport from '@/components/common/icons/IconReport'

export interface IconProps {
    name?: string
}

const Icon = ({ name }: IconProps) => {
    switch (name) {
        case 'home':
            return <IconHome />
        case 'user':
            return <IconUser />
        case 'component':
            return <IconComponent />
        case 'dashboard':
            return <IconDashboard />
        case 'transaction':
            return <IconTransaction />
        case 'report':
            return <IconReport />
        default:
            return null
    }
}

export default Icon
