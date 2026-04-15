import React from 'react'

function ActionButton({book, onDelete, onRestore, onView, onEdit}) {
  return (
    <>
    {onDelete && !book.isDeleted && (
        <button type="button" onClick={() => onDelete(book.bookId)}>
            DELETE
        </button>
        )}

        {onRestore && book.isDeleted && (
            <button type='button' onClick={() => onRestore(book.bookId)}>
                RESTORE
            </button>
        )}

        {onView && (
            <button type="button" onClick={() => onView(book)}>
                VIEW
            </button>
        )}

        {onEdit && (
            <button type='button' onClick={() => onEdit(book)}>
                UPDATE
            </button>
        )}

        
    </>
  )
}

export default ActionButton