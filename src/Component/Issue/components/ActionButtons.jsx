import React from 'react'

function ActionButtons({record, onReturn, onView}) {
  return (
    <>
    {
        onReturn && (
            <button type='button' onClick={() => onReturn(record.issueId)} disabled={record.status === "RETURNED"}>
                Return
            </button>
        )
      }

      {
        onView && (
          <button type='button' onClick={() => onView(record.issueId)}>
            View
          </button>
        )
    }
    </>
  )
}

export default ActionButtons