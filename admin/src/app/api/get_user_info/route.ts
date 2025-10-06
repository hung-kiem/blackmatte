import { UserInformation } from '@/types/auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const data: UserInformation = {
        id: '1',
        name: 'Nguyễn Kiêm Hùng',
        email: 'hungnk1@vnpay.vn',
        role: 'admin',
        roleName: 'Quản trị viên',
    }

    return NextResponse.json(data)
}
