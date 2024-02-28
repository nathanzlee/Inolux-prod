import { useState } from "react"

const Row = ({ id, number, name, level, manager }) => {
    const [selectedManager, setSelectedManager] = useState(manager.current)

    let title 
    if (level == 1) {
        title = "Employee"
    } else if (level == 2) {
        title = "Manager"
    } else {
        title = "President"
    }

    async function handleSave() {
        const req = await fetch('/api/users/edit/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({manager: selectedManager})
        })
        const res = await req.json()
    }

    async function handleRemove() {
        const req = await fetch('/api/users/remove/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        const res = await req.json()
    }

    return (
        <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{number}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{name}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{title}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {level !== 3 && (<select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 min-w-[120px]"
                    defaultValue={manager.current}
                    onChange={(e) => {
                        setSelectedManager(e.target.value)
                    }}
                >
                    {manager.list.map(m => {
                        return (
                            <option value={m._id}>{m.firstName + ' ' + m.lastName}</option>
                        )
                    })}
                </select>)}
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a onClick={() => {handleSave()}} className="text-[var(--primary-color)] hover:text-indigo-900 mr-4">
                    {level !== 3 && "Save"}
                </a>
                <a onClick={() => {handleRemove()}} className="text-[var(--primary-color)] hover:text-indigo-900">
                    {level !== 3 && "Remove"}
                </a>
            </td>
        </tr>
    )
}

export default Row