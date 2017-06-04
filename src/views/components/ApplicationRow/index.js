import React from 'react'

function ApplicationRow(props){
  const handleClick = () => props.onClick(props.application.id)
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this application?\nThis action can not be undone.")) {
      props.onDelete(props.user_id, props.application.id)
    }
  }
