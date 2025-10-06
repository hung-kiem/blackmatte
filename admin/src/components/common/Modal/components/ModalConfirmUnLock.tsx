import { closeModal } from '..'
import Button from '../../Buttons/Button'
import Input from '../../Input/Input'
import Modal from '../Modal'

export default function ModalConfirmUnLock() {
    return (
        <Modal size={'sm'}>
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
                Modal title unlock
            </h2>
            <div className="mb-7.5 flex flex-col gap-2">
                <Input label="Tên đăng nhập" />
                <Input label="Email" />
                <Input label="Password" />
            </div>
            <Button type="black" size="medium" onClick={closeModal}>
                Đóng
            </Button>
        </Modal>
    )
}
