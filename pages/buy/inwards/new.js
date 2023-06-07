import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import Inward from '../../../components/buy/inwards/inward'
import Breadcrumb from '../../../components/breadcrumb'
import Steps from '../../../components/steps'
import Router, { useRouter } from 'next/router'
import { CheckCircleIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const pages = [
    { name: 'Buy', href: '/buy' },
    { name: 'Inwards', href: '/buy/inwards' },
    { name: 'New', href: '/buy/inwards/new' }
]

const NewInward = ({ session }) => {
    const [success, setSuccess] = useState(false)
    const [inward, setInward] = useState({
        entryDate: null, 
        reference: 'ES1000',
        vendor: null,
        receiveDate: null,
        postingDate: null,
        items: [],
        notes: '',
        value: 0
    })

    useEffect(() => {
        fetch('/api/buy/inwards/new')
        .then(req => req.json())
        .then(res => {
            console.log(res.data)
            setInward({
                ...inward,
                vendor: res.data.vendor.name,
                items: res.data.items.map(item => {
                    return {
                        name: item.item.name,
                        unitMeasurement: item.item.unitMeasurement,
                        description: item.item.description,
                        quantity: item.quantity,
                        unitCost: item.item.unitCost,
                    }
                })
            })
        })
    }, [])

    const steps = [
        { id: '01', name: 'Purchase Order', href: '#', status: 'completed' },
        { id: '02', name: 'Item Inwards', href: '#', status: 'current' },
        { id: '03', name: 'Receipt', href: '#', status: 'upcoming' },
    ]

    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto pb-[100px]">
                <Steps steps={steps} />
                <Inward type={'new'} data={inward} edit={true} onSubmit={() => {setSuccess(true)}} />
                {success && (
                    <div className="rounded-md bg-green-50 p-4 absolute bottom-10 ml-10">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">Success!</p>
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
                )}
                
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    console.log(session)
    if (!session){
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

export default NewInward