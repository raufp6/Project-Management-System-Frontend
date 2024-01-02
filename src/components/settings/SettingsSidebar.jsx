import ProtoTypes from "prop-types";
import Progressbar from "../chart/Progressbar";
import TabBtn from "../button/TabBtn";

function SettingsSidebar() {
  return (
    <aside className="col-span-3 border-r border-bgray-200 dark:border-darkblack-400">
      {/* Sidebar Tabs */}

      <div className="px-4 py-6">
        <TabBtn
          link=""
          title="Personal Informations"
          text=""
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="12"
              cy="17.5"
              rx="7"
              ry="3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="7"
              r="4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </TabBtn>
        <TabBtn
          link="password-reset"
          title="Reset Password"
          text="Yo can reset password"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="12"
              cy="17.5"
              rx="7"
              ry="3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="7"
              r="4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </TabBtn>
      </div>
      {/* Progressbar  */}
    </aside>
  )
}

SettingsSidebar.propTypes = {
  activeTab: ProtoTypes.string,
  handleActiveTab: ProtoTypes.func,
};

export default SettingsSidebar;
