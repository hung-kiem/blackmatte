export default function Page() {
    return (
        <div className="font-sans flex h-[calc(100vh-80px-32px)] flex-col items-center justify-center text-center">
            <div className="flex items-center">
                <h1 className="border-gray-300 mr-5 inline-block border-r pr-6 text-3xl font-semibold dark:border-white">
                    403
                </h1>
                <div className="inline-block">
                    <h2 className="m-0 text-base font-normal leading-[49px]">
                        Bạn không có quyền truy cập chức năng này.
                    </h2>
                </div>
            </div>
        </div>
    )
}
