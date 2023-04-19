import { useReducer } from 'react'
import Router from 'next/router'

const Item = ({ type, data, edit }) => {
    console.log(data)
    function reducer(state, action) {
        return {
            ...state,
            [action.type]: action.data
        }
    }
    const [formData, update] = useReducer(reducer, data)

    function handleCancel() {
        Router.push('/buy/items')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        const req = await fetch('/api/buy/items/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const res = await req.json()
        if (res.msg == 'Success!') {
            Router.push({pathname: '/buy/items', query: {action: 'new', success: true}})
        } else {
            Router.push({pathname: '/buy/items', query: {action: 'new', success: false}})
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

    return (
        <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">General Information</h3>
                    </div> 
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Document Series
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.documentNo}
                                            type="text"
                                            placeholder="ITM"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'documentNo', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.documentNo}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="employee-number" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Unit of Measurement
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.unitMeasurement}
                                            type="text"
                                            placeholder="Unit of Measurement"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'unitMeasurement', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.unitMeasurement}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                {"Unit Cost (US$)"}
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.unitCost}
                                            type="number"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'unitCost', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.unitCost}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                EAN
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.EAN}
                                            type="number"
                                            placeholder="EAN"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'EAN', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.EAN}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Name
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.name}
                                            type="text"
                                            placeholder="name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'name', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.name}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="employee-number" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Make
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.make}
                                            type="text"
                                            placeholder="Make"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'make', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.make}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Item Group
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.itemGroup}
                                            type="text"
                                            placeholder="Item Group"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'itemGroup', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.itemGroup}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                UPC
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.UPC}
                                            type="number"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'UPC', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.UPC}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                ISBN
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={formData.ISBN}
                                            type="text"
                                            placeholder="ISBN"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {update({type: 'ISBN', data: e.target.value})}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {formData.ISBN}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Description</h3>
                    </div> 
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Description
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <textarea placeholder="Description" value={formData.description} onChange={(e) => {update({type: 'description', data: e.target.value})}} disabled={!edit}></textarea>
                                
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

export default Item