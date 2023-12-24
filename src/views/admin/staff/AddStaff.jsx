import AddForm from './components/AddFrom'

function AddStaff() {
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <div className="2xl:col-span-9 col-span-8">
            <div className="rounded-lg bg-white dark:bg-darkblack-600 px-6 py-8">
              <div className="2xl:flex justify-between gap-12">
                {/* Form  */}
                <AddForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
export default AddStaff
