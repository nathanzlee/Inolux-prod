import { useState, useEffect } from 'react'
import SearchSelect from './searchSelect'

const ItemsTable = ({ data, itemOptions, edit, onChange }) => {
    console.log(data)
    console.log(itemOptions)
    const [rows, setRows] = useState(data.map(item => {
        return {
            item: item.item,
            unit: itemOptions.find(i => i._id == item.item)?.unitMeasurement,
            cost: itemOptions.find(i => i._id == item.item)?.unitCost,
            description: itemOptions.find(i => i._id == item.item)?.description,
            quantity: item.quantity,
            amount: item.quantity * parseFloat(itemOptions.find(i => i._id == item.item)?.unitCost)
        }
    }))
    console.log(rows)
   
    function onChangeItem({ index, value }) {
        const newData = rows.map((item, i) => {
            if (i == index) {
                return {
                    ...item,
                    item: value,
                    unit: itemOptions.find(i => i._id == value).unitMeasurement,
                    cost: itemOptions.find(i => i._id == value).unitCost,
                    description: itemOptions.find(i => i._id == value).description,
                    quantity: item.quantity,
                    amount: item.quantity * parseFloat(itemOptions.find(i => i._id == value).unitCost)
                }
            }
            return item 
        })
        setRows(newData)
    }

    function onChangeQuantity({ index, value }) {
        
        const newData = rows.map((item, i) => {
            if (i == index) {
                return {
                    ...item,
                    quantity: value,
                    amount: parseFloat(value) * item.cost
                }
            }
            return item 
        })
        setRows(newData)
    }
    
    function newRow(e) {
        e.preventDefault()
        setRows([
            ...rows, 
            { item: null, unit: null, description: '', quantity: 0, cost: null, amount: 0 }
        ])
    }

    // useEffect(() => {
    //     if (itemOptions.length > 0) onChangeItem({index: 0, value: itemOptions[0]._id})
    // }, [])
    
    useEffect(() => {
        onChange(rows)
    }, [rows])
    
    return (
        <div>
            <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-5">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3 px-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                            Item
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            Unit of Measurement
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            Description
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            Quantity
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            Unit Price 
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white max-h-[200px] overflow-y-auto">
                        {rows.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td className="whitespace-nowrap text-center py-4 px-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <SearchSelect options={itemOptions} initial={row.item} display={'name'} onChange={(e) => {onChangeItem({index: index, value: e._id})}} />
                                    </td>
                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                        <label>{row.unit}</label>
                                    </td>
                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                        <label>{row.description}</label>
                                    </td>
                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                        <input 
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6" 
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) => {
                                                onChangeQuantity({
                                                    index,
                                                    value: e.target.value
                                                })
                                            }}
                                            disabled={!edit}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                        <label>{row.cost}</label>
                                    </td>
                                    <td className="items-center text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <label>{row.amount}</label>
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

export default ItemsTable