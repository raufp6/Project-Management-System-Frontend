import img from '../../../../assets/images/avatar/purple-a.png'
import { status, priority_data } from '../../../../data/variables'
function TaskInfo({ task }) {
  
  return (
    <div>
      <h4 className="font-bold text-bgray-900 dark:text-white text-xl mb-4">
        View Task
      </h4>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Task :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {task.title}
          </h4>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Project :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {task.project?.name}
          </h4>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Priority :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <div className="flex space-x-2 items-center">
            <div
              className={`w-3 h-3 ${
                priority_data[task.priority]?.color
              } rounded-full`}
            ></div>
            <span className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">
              {priority_data[task.priority]?.title}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Assigned to :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {task.assigned_to?.username}
          </h4>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Description :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {task.description}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default TaskInfo
