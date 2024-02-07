import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useSession, getSession } from 'next-auth/react'
import Breadcrumb from '../../components/breadcrumb'
import Router, { useRouter } from 'next/router'
import { CheckCircleIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react'
import UsersTable from '../../components/users/users'

const pages = [
    { name: 'Users', href: '/users' },
]

const Users = ({ session }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [level, setLevel] = useState('employee')
    let managersList = (level == "employee") ? users.filter(user => user.level == 2 || user.level == 3) : users.filter(user => user.level == 3)
    const [department, setDepartment] = useState('Sales')
    const [manager, setManager] = useState(managersList[0]?._id)
    const cancelButtonRef = useRef(null)
    const user = session.user
    
    

    useEffect(() => {
        setLoading(true)
        fetch('/api/users')
        .then(req => req.json())
        .then(res => {
            let data = res.data
            data.sort(function(a, b) {
                // Compare the 2 dates
                if (a.number < b.number) return -1;
                if (a.number > b.number) return 1;
                return 0;
            })
            setUsers(data)
            setLoading(false)
        })
    }, [open])
    
    async function handleAdd() {
        const req = await fetch('/api/users/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName: firstName, lastName: lastName, email: email, level: (level == 'employee') ? 1 : 2, department: department, manager: manager})
        })
        const res = await req.json()
        setOpen(false)
    }

    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 p-10">
                <div className="sm:px-6 lg:px-8">
                    <h1 className="font-semibold leading-6 text-2xl">Users</h1>
                    <div className="flex flex-row justify-between items-center mt-8 sm:flex sm:items-center">
                        <div className="flex flex-row justify-center items-center">
                            
                        </div>
                        <button
                            type="button"
                            onClick={() => {setOpen(true)}}
                            className="block rounded-md bg-[var(--primary-color)] py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
                        >
                            New
                        </button>
                        
                    </div>
                    <UsersTable data={users} loading={loading}/>
                </div>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                New User
                                                </Dialog.Title>
                                                <div className="-space-y-px rounded-md shadow-sm">
                                                    <div>
                                                        <input
                                                            className="relative block w-full rounded-md my-4 p-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="First name"
                                                            onChange={e => setFirstName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            className="relative block w-full rounded-md my-4 p-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="Last name"
                                                            onChange={e => setLastName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            className="relative block w-full rounded-md my-4 p-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="Email address"
                                                            onChange={e => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <select 
                                                            className="block w-full rounded-md my-4 border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 min-w-[120px]"
                                                            defaultValue="employee"
                                                            onChange={(e) => {
                                                                setLevel(e.target.value)
                                                            }}
                                                        >
                                                            <option value="employee">Employee</option>
                                                            <option value="manager">Manager</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select 
                                                            className="block w-full rounded-md my-4 border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 min-w-[120px]"
                                                            defaultValue="Sales"
                                                            onChange={(e) => {
                                                                setDepartment(e.target.value)
                                                            }}
                                                        >
                                                            <option value="Sales">Sales</option>
                                                            <option value="Product Management">Product Management</option>
                                                            <option value="Operations">Operations</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select 
                                                            className="block w-full rounded-md my-4 border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 min-w-[120px]"
                                                            defaultValue={manager}
                                                            onChange={(e) => {
                                                                setManager(e.target.value)
                                                            }}
                                                        >
                                                            {managersList.map(user => {
                                                                return (
                                                                    <option value={user._id}>{user.firstName + ' ' + user.lastName}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                                onClick={() => {handleAdd()}}
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    )
  
}


export async function getServerSideProps(context) {
    const session = await getSession(context)
    
    if(!session){
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    if(session.user.level !== 3) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}
  

export default Users