import { useState, useEffect, useReducer } from 'react'
import Router from 'next/router'
import Items from './items'
import { dateInputValue, getDateFromInput } from '../../../util/date'
import SelectAddress from './selectAddress'
import SearchSelect from '../../buy/purchaseOrders/searchSelect'

const PurchaseOrder = ({ type, data, edit }) => {
    const [loading, setLoading] = useState(false)
    const [vendorOptions, setVendorOptions] = useState([])
    const [customerOptions, setCustomerOptions] = useState([])
    const [locationOptions, setLocationOptions] = useState([])
    const [itemOptions, setItemOptions] = useState([])
    
    function reducer(state, action) {
        return {
            ...state,
            [action.type]: action.data
        }
    }
    const [formData, update] = useReducer(reducer, data)
    console.log(formData)
    useEffect(() => {
        setLoading(true)
        fetch('/api/buy/purchaseorders/new')
        .then(req => req.json())
        .then(res => {
            const vendors = res.partners.filter(partner => partner.type == 'Supplier').map((item, idx) => {
                return {
                    id: idx + 1,
                    name: item.name,
                    value: item._id
                }
            })
            setVendorOptions(vendors)
            const items = res.items.map((item, idx) => {
                return {
                    ...item,
                    id: idx + 1,
                    value: item._id
                }
            })
            setItemOptions(items)
            const customers = res.partners.filter(partner => partner.type == 'Customer').map((item, idx) => {
                return {
                    id: idx + 1,
                    name: item.name,
                    address: item.address
                }
            })
            setCustomerOptions(customers)
            const locations = res.locations.map((item, idx) => {
                return {
                    id: idx + 1,
                    name: item.name,
                    address: item.address
                }
            })
            setLocationOptions(locations)
            setLoading(false)
        })
    }, [])
    
    function handleCancel() {
        Router.push('/buy/purchaseorders')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        const req = await fetch('/api/buy/purchaseorders/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const res = await req.json()
        if (res.msg == 'Success!') {
            Router.push({pathname: '/buy/purchaseorders', query: {action: 'new', success: true}})
        } else {
            Router.push({pathname: '/buy/purchaseorders', query: {action: 'new', success: false}})
        }
    }

    async function handleSave(e) {
        e.preventDefault()
        console.log(formData)
        const req = await fetch('/api/buy/items/' + data.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const res = await req.json()
        if (res.msg == 'Success!') {
            Router.push({pathname: '/buy/items', query: {action: 'save', success: true}})
        } else {
            Router.push({pathname: '/buy/items', query: {action: 'save', success: false}})
        }
    }

    let submitButton
    if (type == 'new') {
        submitButton = (
            <button
                type="submit"
                onClick={(e) => {handleSubmit(e)}}
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Submit
            </button>
        )
    } else if (edit) {
        submitButton = (
            <button
                type="submit"
                onClick={(e) => {handleSave(e)}}
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save
            </button>
        )
    } else {
        submitButton = ''
    }
    
    return loading ? (<h1>Loading...</h1>) : 
    (
        <form className="space-y-8 divide-y divide-gray-200 px-10">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">General Information</h3>
                    </div> 
                    <div className="space-y-6 sm:space-y-5">
                        {(type !== 'new') && (
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                    Document Number
                                </label>
                                <div className="mt-2 sm:col-span-2">
                                    <label>{formData.documentNo}</label>
                                </div>
                            </div>
                        )}
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Entry Date
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    type="date"
                                    className="border-gray-300 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                                    value={(formData.entryDate == null) ? null : dateInputValue(new Date(formData.entryDate))}
                                    onChange={(e) => {update({type: 'entryDate', data: getDateFromInput(e.target.valueAsDate)})}}
                                    disabled={!edit}
                                />
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="employee-number" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Vendor
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? 
                                    (
                                        <SearchSelect options={vendorOptions} initial={(type == 'new') ? null : formData.vendor} display={'name'} onChange={(e) => {update({type: 'vendor', data: e.value})}}/>
                                    ) 
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.vendor}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Requested Delivery Date
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <input
                                    type="date"
                                    className="border-gray-300 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                                    value={(formData.deliveryDate == null) ? null : dateInputValue(new Date(formData.deliveryDate))}
                                    onChange={(e) => {update({type: 'deliveryDate', data: getDateFromInput(e.target.valueAsDate)})}}
                                    disabled={!edit}
                                />
                            </div>
                        </div>
                        <SelectAddress label={'Billing Address'} data={formData.billingAddress} allOptions={{'Customer': customerOptions, 'Location': locationOptions}} onChange={(e) => {update({type: 'billingAddress', data: e})}} edit={edit} />
                        <SelectAddress label={'Shipping Address'} data={formData.shippingAddress} allOptions={{'Customer': customerOptions, 'Location': locationOptions}} onChange={(e) => {update({type: 'shippingAddress', data: e})}} edit={edit} />
                    </div>
                </div>
                <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Item Details</h3>
                    </div> 
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Items
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Items data={formData.items} itemOptions={itemOptions} edit={edit} onChange={(data) => {update({type: 'items', data: data})}}/>
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Notes
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <textarea placeholder='Notes' value={formData.notes} onChange={(e) => {update({type: 'notes', data: e.target.value})}}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="pt-5">
                <div className="flex justify-end gap-x-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    {submitButton}
                </div>
            </div>
        </form>
    )
}

export default PurchaseOrder