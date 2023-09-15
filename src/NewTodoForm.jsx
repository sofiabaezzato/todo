import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
    
        onSubmit(newItem)
    
        setNewItem("")
      }

    return (
        <form className='new-task-form' onSubmit={handleSubmit}>
            <div className="form-row">
                <input
                    placeholder='New task'
                    type="text"
                    id="item"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                />
            </div>
            <button  className="save-btn">Add</button>
        </form>
    )
    
}