function PasswordResetFrom() {
  return (
    <div className="2xl:col-span-8 xl:col-span-7">
      <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
        Password Reset
      </h3>
      <div className="mt-8">
        <form action="">
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fname"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Old Password
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="fname"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lname"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                New Password
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="lname"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Confirm New Password
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="email"
              />
            </div>
            
          </div>
          
          <div className="flex justify-end">
            <button
              aria-label="none"
              className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordResetFrom
