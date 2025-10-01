'use client'

import { create } from 'zustand'
import { useDeferredValue } from 'react'
import ModalSendSms from './components/ModalSendSms'
import ModalSendOtt from './components/ModalSendOtt'

type modal = 'send-sms' | 'send-ott'

export interface ModalData {
    phone?: string
    content?: string
    onSubmitted?: (phone: string, content: string) => void
    bankCode?: string
}

export const store = create<{
    data?: ModalData
    modal?: modal
    openModal: (modal: modal, data: ModalData) => void
    closeModal: () => void
}>((setState) => ({
    openModal: (modal, data) => setState({ modal, data }),
    closeModal: () => setState({ modal: undefined, data: undefined }),
}))

export default function ModalUI() {
    const { modal, data } = store()
    const modalType = useDeferredValue(modal)
    const items = useDeferredValue(data || {})
    return (
        <>
            {modalType == 'send-sms' && <ModalSendSms {...items} />}
            {modalType == 'send-ott' && <ModalSendOtt {...items} />}
        </>
    )
}

export function closeModal() {
    document.body.classList.remove('overflow-hidden')
    store.setState({ modal: undefined, data: undefined })
}

export function openModal<T extends ModalData>(modal: modal, data?: T) {
    document.body.classList.add('overflow-hidden')
    store.setState({ modal, data })
}
