// toastUtils.js
import toast from 'react-hot-toast'

export const sucessNotify = (message) => {
  toast.success(message)
}
export const errorNotify = (message) => toast.error(message)
export const DefaultNotify = (message) => toast(message)

export const promiseAlert = async (message) => {
  toast.promise(message, {
    pending: 'Uploading...',
    success: 'Upload successful!',
    error: 'Upload Faild!!',
    position: 'top-center',
  })
}

export const handleToast = (msg, type = 'default') => {
  if (type == 'success') {
    sucessNotify(msg)
  } else if (type == 'error') {
    errorNotify(msg)
  } else {
    DefaultNotify(msg)
  }
}
