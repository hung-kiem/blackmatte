import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type TextAreaProps<T extends FieldValues> = {
    name: FieldPath<T>
    control: Control<T>
    rows?: number
    placeholder?: string
    disabled?: boolean
    label?: string
}

const TextArea = <T extends FieldValues>({
    name,
    control,
    rows = 5,
    placeholder = 'Default textarea',
    disabled = false,
    label,
}: TextAreaProps<T>) => {
    const {
        field: { value, onChange, onBlur },
    } = useController<T>({
        name,
        control,
    })

    return (
        <div>
            {label && (
                <label
                    htmlFor={name}
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                    {label}
                </label>
            )}
            <textarea
                id={name}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full rounded-lg border-[1.5px] px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                    disabled ? 'bg-gray-100 dark:bg-gray-800' : 'bg-transparent'
                }`}
            ></textarea>
        </div>
    )
}

export default TextArea
