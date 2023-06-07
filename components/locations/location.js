import { useState } from 'react'
import Router from 'next/router'

const Location = ({ type, data, edit }) => {
    const [name, setName] = useState(data.name)
    const [address, setAddress] = useState(data.address)
    const [description, setDescription] = useState(data.description)
    
    function handleCancel() {
        Router.push('/buy/items')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const req = await fetch('/api/locations/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, address: address, description: description})
        })
        const res = await req.json()
        if (res.msg == 'Success!') {
            Router.push('/')
        } else {
            Router.push('/')
        }
    }

    async function handleSave(e) {
        e.preventDefault()
        const req = await fetch('/api/locations/' + data.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, address: address, description: description})
        })
        const res = await req.json()
        if (res.msg == 'Success!') {
            Router.push('/')
        } else {
            Router.push('/')
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
                                Name
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={name}
                                            type="text"
                                            placeholder="Name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {setName(e.target.value)}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {name}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="employee-number" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Address
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {
                                    edit ? (
                                        <input
                                            value={address}
                                            type="text"
                                            placeholder="Address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                            onChange={(e) => {setAddress(e.target.value)}}
                                        />
                                    )
                                    : 
                                    (
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                            {address}
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
                                <textarea placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} disabled={!edit}></textarea>
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

export default Location