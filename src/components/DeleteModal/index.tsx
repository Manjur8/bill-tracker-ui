import { ModalPropsTypes } from '@/types'
import { Modal } from 'antd'
import React from 'react'

const DeleteModdal = ({open, handleOk, handleCancel, submitLoader=false, title}: ModalPropsTypes<unknown>) => {
  return (
    <Modal open={open} onOk={handleOk} onCancel={handleCancel} title={`Delete ${title}`} okText='Delete' okButtonProps={{danger: true}} confirmLoading={submitLoader}>
        Are you sure you want to delete this{title ? ` ${title?.toLowerCase()}` : ''}?
    </Modal>
  )
}

export default DeleteModdal