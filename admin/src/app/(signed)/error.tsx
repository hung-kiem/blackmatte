'use client'

import Button from '@/components/common/Buttons/Button'

interface ErrorProps {
    error: {
        message: string
    }
}

export default function Error({ error }: ErrorProps) {
    return (
        <div
            className={'h-screen'}
            style={{
                fontFamily:
                    'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div>
                <h1
                    className={
                        'mr-[20px] inline-block border-r-[1px] border-solid border-r-[rgba(0,0,0,.3)] pr-[23px] font-semibold dark:border-r-[rgba(255,255,255,.3)]'
                    }
                    style={{
                        fontSize: '24px',
                        verticalAlign: 'top',
                        lineHeight: '49px',
                    }}
                >
                    Oops!
                </h1>
                <div style={{ display: 'inline-block' }}>
                    <h2
                        style={{
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '49px',
                            margin: 0,
                        }}
                    >
                        {error.message}
                    </h2>
                </div>
                <div className={'mt-2 flex w-full justify-center gap-4'}>
                    <Button
                        type={'outline-black'}
                        className={'w-[200px]'}
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </Button>
                    <Button
                        type={'outline-black'}
                        className={'w-[200px]'}
                        onClick={() => (window.location.pathname = '/')}
                    >
                        Trở về trang chủ
                    </Button>
                </div>
            </div>
        </div>
    )
}
