import ProtoTypes from 'prop-types'
import PasswordResetFrom from '../../../../components/form/ResetPasswordForm'
function PasswordReset() {
  return (
    <div id="tab1" className="tab-pane active">
      <div className="xl:grid grid-cols-12 gap-12 flex 2xl:flex-row flex-col-reverse">
        <PasswordResetFrom />
      </div>
    </div>
  )
}

PasswordReset.propTypes = {
  name: ProtoTypes.string,
  activeTab: ProtoTypes.string,
}

export default PasswordReset
