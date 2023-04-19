import React, { useState, useEffect, Fragment } from 'react'
import { useSession, getSession } from 'next-auth/react'
import Breadcrumb from '../../../components/breadcrumb'
import Select from '../../../components/select'
import TravelAuths from '../../../components/travel/travelauth/travelAuths'
import Router, { useRouter } from 'next/router'
import { CheckCircleIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/20/solid'

const requesterOptions = [
    {id: 1, option: "Any"},
    {id: 2, option: "You"},
    {id: 3, option: "Other"}
]

const statusOptions = [
    {id: 1, option: "Any"},
    {id: 2, option: "Approved"},
    {id: 3, option: "Pending"},
    {id: 4, option: "Denied"}
]

const pages = [
    { name: 'Travel', href: '/travel' },
    { name: 'Travel Authorizations', href: '/travel/travelauth' }
]

const Travel = ({ session }) => {
    const [travelAuths, setTravelAuths] = useState([])
    const [loading, setLoading] = useState(false)
    const [statusFilter, setStatusFilter] = useState(statusOptions[0])
    const [requesterFilter, setRequesterFilter] = useState(requesterOptions[0])
    const router = useRouter()
    const [alert, setAlert] = useState(router.query.success == 'true' || router.query.success == 'false')

    const user = session.user
    
    useEffect(() => {
        setLoading(true)
        fetch('/api/travel/travelauth')
        .then(req => req.json())
        .then(res => {
            setTravelAuths(res.data)
            setLoading(false)
        })
    }, [])
    
    return (
        <div class="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div class="w-full h-full bg-gray-100 p-10">
                <div className="sm:px-6 lg:px-8">
                    <h1 className="font-semibold leading-6 text-2xl">Travel Authorizations</h1>
                    <div className="flex flex-row justify-between items-center mt-8 sm:flex sm:items-center">
                        <div className="flex flex-row justify-center items-center">
                            <span className="mr-2">Requested By: </span>
                            <Select options={requesterOptions} initial={requesterFilter} onChange={(e) => {
                                setRequesterFilter(e)
                            }} styles={"min-w-[120px]"}/>
                            <span className="ml-5 mr-2">Status: </span>
                            <Select options={statusOptions} initial={statusFilter} onChange={(e) => {
                                setStatusFilter(e)
                            }} styles={"min-w-[120px]"} />
                        </div>
                        {user && user.level !== 3 &&  
                        <button
                            type="button"
                            onClick={() => {Router.push('/travel/travelauth/new')}}
                            className="block rounded-md bg-[var(--primary-color)] py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
                        >
                            New
                        </button>
                        }
                        
                    </div>
                    <TravelAuths user={user} data={travelAuths.filter(travelAuth => {
                        if (requesterFilter.option == "Any") {
                            return true
                        } else if (requesterFilter.option == "You") {
                            return travelAuth.name == user.firstName + ' ' + user.lastName
                        } else {
                            return travelAuth.name !== user.firstName + ' ' + user.lastName 
                        }
                    }).filter(travelAuth => {
                        if (statusFilter.option == "Any") {
                            return true
                        } else if (statusFilter.option == "Approved") {
                            return travelAuth.status == "approved"
                        } else if (statusFilter.option == "Pending") {
                            return travelAuth.status == "pending"
                        } else {
                            return travelAuth.status == "denied"
                        }
                    })} loading={loading}/>
                    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <a
                            href="#"
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                            Previous
                            </a>
                            <a
                            href="#"
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                            Next
                            </a>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                <span className="font-medium">{travelAuths.length}</span> results
                            </p>
                            </div>
                            <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <a
                                href="#"
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                </a>
                                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                <a
                                href="#"
                                aria-current="page"
                                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                1
                                </a>
                                <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                2
                                </a>
                                <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                >
                                3
                                </a>
                                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                ...
                                </span>
                                <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                >
                                8
                                </a>
                                <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                9
                                </a>
                                <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                10
                                </a>
                                <a
                                href="#"
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                </a>
                            </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {alert && ((router.query.success == 'true') ? (
                    <div className="rounded-md bg-green-50 p-4 absolute bottom-10">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">Successfully {(router.query.action == 'new') ? 'created' : 'approved'} travel authorization!</p>
                            </div>
                            <div className="ml-auto pl-3">
                                <div className="-mx-1.5 -my-1.5">
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                        onClick={() => {setAlert(false)}}
                                    >
                                        <span className="sr-only">Dismiss</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className="rounded-md bg-red-50 p-4 absolute bottom-10">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">A problem occurred!</p>
                            </div>
                            <div className="ml-auto pl-3">
                                <div className="-mx-1.5 -my-1.5">
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                                        onClick={() => {setAlert(false)}}
                                    >
                                        <span className="sr-only">Dismiss</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
                
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

    return {
        props: { session }
    }
}
  

export default Travel
