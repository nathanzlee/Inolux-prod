import { useState, useEffect } from 'react'
import SearchSelect from '../purchaseOrders/searchSelect'

const ItemsTable = ({ data, locationOptions, edit, onChange }) => {
    console.log(data)
    const [rows, setRows] = useState([{
        description: "chip",
        name: "IN-P32TRRRGB-8244",
        quantity: 2,
        unitCost: 10,
        unitMeasurement: "lbs"
    }])

    function onChangeLocation() {
        console.log("shut up")
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
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            Location
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white max-h-[200px] overflow-y-auto">
                        {rows.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td className="whitespace-nowrap text-center py-4 px-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <label>{row.name}</label>
                                    </td>
                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                        <label>{row.unitMeasurement}</label>
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
                                        <label>{row.unitCost}</label>
                                    </td>
                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                        <label>{row.unitCost * row.quantity}</label>
                                    </td>
                                    <td className="items-center text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <SearchSelect options={locationOptions} display={'name'} onChange={(e) => {onChangeLocation({index: index, value: e._id})}} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default ItemsTable