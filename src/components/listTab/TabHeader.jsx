import { useState } from 'react'
import Button from '../button'
import AddClientModal from '../modal/AddClientModal'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


const sucessNotify = () => toast.success('Sucess!')
const errorNotify = () => toast.error('Error')
const notify = () => toast('Here is my toast!')
function TabHeader() {
  
  const test = ()=>{
    console.log("sdsd sds d");
    toast('Here is my toast!')
  };
  const [newWallet, setNewWallet] = useState(false)
  return (
    <>
      <AddClientModal isActive={newWallet} handleClose={setNewWallet} />
      <div class="flex justify-end bg-gray-200 mb-8">
        <div className="px-4 py-2 m-2">
          <Link to="add/">
            <Button text="Add" cls="bg-success-400" />
          </Link>
          
        </div>
      </div>
    </>
  )
}

export default TabHeader
