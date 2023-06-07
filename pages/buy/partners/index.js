import React, { useState, useEffect, Fragment } from 'react'
import { getSession } from 'next-auth/react'
import Breadcrumb from '../../../components/breadcrumb'
import PartnersTable from '../../../components/buy/partners/partners'
import Pagination from '../../../components/pagination'
import Router, { useRouter } from 'next/router'
import { CheckCircleIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/20/solid'

const pages = [
    { name: 'Buy', href: '/buy' },
    { name: 'Partners', href: '/buy/partners' }
]

const Partners = ({ session }) => {
    const [partners, setPartners] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [alert, setAlert] = useState(router.query.success == 'true' || router.query.success == 'false')

    const user = session.user
    
    useEffect(() => {
        setLoading(true)
        fetch('/api/buy/partners')
        .then(req => req.json())
        .then(res => {
            setPartners(res.data)
            setLoading(false)
        })
    }, [])
    
    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 p-10">
                <div className="sm:px-6 lg:px-8">
                    <h1 className="font-semibold leading-6 text-2xl">Business Partners</h1>
                    <div className="flex flex-row justify-between items-center mt-8 sm:flex sm:items-center">
                        <div className="flex flex-row justify-center items-center">
                            
                           
                        </div>
                        <button
                            type="button"
                            onClick={() => {Router.push('/buy/partners/new')}}
                            className="block rounded-md bg-[var(--primary-color)] py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
                        >
                            New
                        </button>
                    </div>
                    <PartnersTable data={partners} loading={loading} edit={user ? (user.level > 1) : false}/>
                    <Pagination items={partners.length} page={page} onChange={(page) => {setPage(page)}}/>
                </div>
                {alert && ((router.query.success == 'true') ? (
                    <div className="rounded-md bg-green-50 p-4 absolute bottom-10">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">Successfully {(router.query.action == 'new') ? 'created' : 'updated'} partner!</p>
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
  

export default Partners
