import { useState, useEffect } from 'react'

const Table = ({ data, edit, onChange }) => {
    const [rows, setRows] = useState(data)

    function onChangeRow({ type, index, value }) {
        const newData = rows.map((item, i) => {
            if (i == index) {
                return {
                    ...item,
                    [type]: value
                }
            }
            return item 
        })
        console.log(newData)
        setRows(newData)
    }

    function newRow(e) {
        e.preventDefault()
        setRows([
            ...rows, 
            { date: null, city: '', state: '', country: '', people: '', customer: '', reason: '' }
        ])
    }

    useEffect(() => {
        onChange(rows)
    }, [rows])
   
    return (
        <div>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-5">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                            Date
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            City
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            State
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            Country
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            {"Name(s) of Customer(s), Supplier(s) to Visit"}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            New/Engaged
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            Reason for Visit
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white max-h-[200px] overflow-y-auto">
                        {rows.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                        <input 
                                            className="w-full p-[3px]" 
                                            type="date" 
                                            value={row.date}
                                            onChange={(e) => {
                                                onChangeRow({
                                                    type: "date",
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <input 
                                            className="w-full p-[3px]" 
                                            type="text"
                                            value={row.city}
                                            onChange={(e) => {
                                                onChangeRow({
                                                    type: "city",
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <input 
                                            className="w-full p-[3px]" 
                                            type="text"
                                            value={row.state}
                                            onChange={(e) => {
                                                onChangeRow({
                                                    type: "state",
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <input 
                                            className="w-full p-[3px]" 
                                            type="text"
                                            value={row.country}
                                            onChange={(e) => {
                                                onChangeRow({
                                                    type: "country",
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <input 
                                            className="w-full p-[3px]" 
                                            type="text"
                                            value={row.people}
                                            onChange={(e) => {
                                                onChangeRow({
                                                    type: "people",
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <select
                                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 min-w-[120px]"
                                            defaultValue={row.customer}
                                            onChange={(e) => {
                                                onChangeRow({
                                                    type: "customer",
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        >
                                            <option value="New">New</option>
                                            <option value="Engaged">Engaged</option>
                                        </select>
                                        {/* <input 
                                            className="w-full p-[3px]" 
                                            type="text"
                                            value={row.customer}
                                            onChange={(e) => {
                                                onChangeRow({
                                                    type: "customer",
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        /> */}
                                    </td>
                                    <td className="items-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <input 
                                            className="w-full p-[3px]" 
                                            type="text"
                                            value={row.reason}
                                            onChange={(e) => {
                                                onChangeRow({
                                                    type: "reason",
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {edit && (
                <button onClick={newRow} className="block rounded-md bg-[var(--primary-color)] py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]">
                    Add item
                </button>
            )}
        </div>
    )
}

export default Table