import ProtoTypes from "prop-types";
import { useState, useContext } from 'react'
import { isAdmin } from "../../utils/Permission";
import AuthContext from "../../context/AuthContext";
function Files({ name, size, children, link, onDeleteFile,id}) {
  const { authTokens, logoutUser, user } = useContext(AuthContext)
  // Confirmation for delete
  const confirmDelete = (fileId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this file?'
    )

    if (isConfirmed) {
      onDeleteFile(fileId)
    }
  }
  return (
    <div className="flex flex-col items-center w-24 h-24 lg:w-44 lg:h-44">
      <div className="w-full flex justify-center">{children}</div>
      <h4 className="md:text-base text-sm  dark:text-white font-semibold mt-2">
        {name}
      </h4>
      <span className="text-base text-bgray-600 dark:text-bgray-50">
        <a href={link}>Download</a>
      </span>
      {isAdmin(user.groups[0]) && (
        <button onClick={() => confirmDelete(id)}>Delete</button>
      )}
    </div>
  )
}
Files.propTypes = {
  name: ProtoTypes.string,
  size: ProtoTypes.string,
  children: ProtoTypes.node,
};

export default Files;
