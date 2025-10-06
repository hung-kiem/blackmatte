import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type SwitcherProps<T extends FieldValues> = {
    name: FieldPath<T>
    control: Control<T>
    label?: string
    labelPosition?: 'horizontal' | 'vertical'
}

const Switcher = <T extends FieldValues>({
    name,
    control,
    label,
    labelPosition = 'horizontal',
}: SwitcherProps<T>) => {
    const {
        field: { value, onChange },
    } = useController<T>({
        name,
        control,
    })

    const isHorizontal = labelPosition === 'horizontal'

    return (
        <div>
            <label
                className={`flex ${isHorizontal ? 'flex-row items-center space-x-4' : 'flex-col items-start'}`}
            >
                {label && (
                    <span
                        className={`text-sm font-medium text-black dark:text-white ${isHorizontal ? 'mb-0 mr-1' : 'mb-2'}`}
                        style={{ lineHeight: '1.5rem' }}
                    >
                        {label}
                    </span>
                )}
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        id={name}
                        className="sr-only cursor-pointer"
                        checked={!!value}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                    <div className="block h-6 w-10 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                    <div
                        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${
                            value &&
                            '!right-1 !translate-x-[calc(100%-0.125rem)] !bg-primary dark:!bg-secondary'
                        }`}
                    ></div>
                </div>
            </label>
        </div>
    )
}

export default Switcher
