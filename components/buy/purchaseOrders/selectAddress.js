import { useState } from 'react'
import Select from '../../select'
import SearchSelect from './searchSelect'

const types = [
    {id: 1, option: 'Customer'},
    {id: 2, option: 'Location'},
    {id: 3, option: 'Other'}
]

const SelectAddress = ({ label, data, allOptions, onChange, edit }) => {
    const [type, setType] = useState((!data.type) ? types[0] : types.find(type => type.option == data.type))
    const [address, setAddress] = useState(data.address)

    return (
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                {label}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
                {
                    edit ? 
                    (
                        <div className="grid grid-cols-[140px_1fr] gap-4">
                            <Select options={types} initial={type} onChange={(e) => {setType(e)}} styles={'min-w-[140px]'} />
                            {
                                (type.option == 'Other') ? 
                                (
                                    <input 
                                        type="text"
                                        value={address}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) => {onChange({ type: 'Other', address: e.target.value })}}
                                    />
                                ) 
                                : 
                                (<SearchSelect options={allOptions[type.option]} display={'address'} onChange={(e) => {onChange({ type: type.option, address: e.address})}} />)
                            }
                        </div>
                    )
                    :
                    (
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            {data}
                        </label>
                    )
                }
            </div>
        </div>
    )
}

export default SelectAddress