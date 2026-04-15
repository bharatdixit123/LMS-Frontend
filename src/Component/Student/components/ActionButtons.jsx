import React from 'react'

function ActionButtons({student, onActivate, onDeactivate, onView, onEdit, onList}) {
    
    return (
    <>
        {onEdit && (
        <button onClick={() => onEdit(student)}>
        Edit
        </button>
        )}

        {onActivate && !student.active && (
        <button type="button" onClick={() => onActivate(student.studentId)}>
            Activate
        </button>
        )}
    
        {onDeactivate && student.active && (
        <button type="button" onClick={() => onDeactivate(student.studentId)}>
            Deactivate
        </button>
        )}
        
        {onView && (
        <button type="button" onClick={() => onView(student)}>
        View
        </button>
        )}

        {onList && (
        <button type="button" onClick={onList}>
        List
        </button>
        )}
    </>
    )
}

export default ActionButtons