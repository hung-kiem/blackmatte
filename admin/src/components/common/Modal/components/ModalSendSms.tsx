import { SubmitHandler, useForm } from 'react-hook-form'
import { closeModal, ModalData } from '..'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Modal from '../Modal'
import Input from '../../Input/Input'
import Button from '../../Buttons/Button'

interface FormValues {
    phoneNumber: string
    contentSms: string
}

const schema = yup.object().shape({
    phoneNumber: yup
        .string()
        .required('Vui lòng nhập số điện thoại.')
        .matches(/^[0-9]+$/, 'Số điện thoại phải là số.'),
    contentSms: yup.string().required('Vui lòng nhập nội dung tin nhắn.'),
})

export default function ModalSendSms({
    phone,
    content,
    onSubmitted,
}: ModalData) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            phoneNumber: phone || '',
            contentSms: content || '',
        },
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (onSubmitted) {
            onSubmitted(data.phoneNumber, data.contentSms)
        }
        closeModal()
    }

    return (
        <Modal size="lg">
            <h2 className="mb-4 justify-center text-xl font-bold text-black dark:text-white">
                Gửi tin nhắn
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-7.5 flex flex-col gap-2">
                    <div>
                        <Input
                            label="Số điện thoại"
                            layout="vertical"
                            {...register('phoneNumber')}
                        />
                        {errors.phoneNumber && (
                            <p className="mt-1 text-sm text-red">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-3 block text-sm text-neutral-600 dark:text-white">
                            Nội dung
                        </label>
                        <textarea
                            rows={6}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            {...register('contentSms')}
                        ></textarea>
                        {errors.contentSms && (
                            <p className="mt-1 text-sm text-red">
                                {errors.contentSms.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex w-full justify-center gap-4">
                    <Button type="primary" size="medium" htmlType="submit">
                        Gửi
                    </Button>
                    <Button type="black" size="medium" onClick={closeModal}>
                        Đóng
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
