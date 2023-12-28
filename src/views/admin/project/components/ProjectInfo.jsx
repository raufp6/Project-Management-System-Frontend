import img from '../../../../assets/images/avatar/purple-a.png'
import { status, priority_data } from '../../../../data/variables'
function ProjectInfo({ project }) {
  return (
    <div>
      <h4 className="font-bold text-bgray-900 dark:text-white text-xl mb-4">
        View Project
      </h4>
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
            {project.name}
          </h4>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Status :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <div className="flex space-x-2 items-center">
            <div
              className={`w-3 h-3 ${
                status[project.status]?.color
              } rounded-full`}
            ></div>
            <span className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">
              {status[project.status]?.title}
              
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Start Date :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {project?.start_date}
          </h4>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Deadline :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {project?.start_date}
          </h4>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Members :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {project.members?.map((employee, index) => {
              return (
                <span>
                  {employee.first_name + ' ' + employee.last_name}
                  {index < project.members.length - 1 ? ', ' : null}
                </span>
              )
            })}
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
            {project.description}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfo
