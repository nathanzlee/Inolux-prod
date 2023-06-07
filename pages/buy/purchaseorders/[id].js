import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PurchaseOrder from '../../../components/buy/purchaseOrders/purchaseOrder'
import Breadcrumb from '../../../components/breadcrumb'
import Steps from '../../../components/steps'

const EditPurchaseOrder = ({ session }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [purchaseOrder, setPurchaseOrder] = useState({
        documentNo: '',
        entryDate: null, 
        vendor: null, 
        deliveryDate: null,
        billingAddress: '',
        shippingAddress: '',
        items: [{
            item: null, unit: null, description: '', quantity: 0, cost: null, amount: 0
        }],
        notes: '',
        value: 0, 
    })

    useEffect(() => {
        setLoading(true)
        fetch('/api/buy/purchaseorders/' + router.query.id)
        .then(req => req.json())
        .then(res => {
            setPurchaseOrder(res)
            setLoading(false)
        })
    }, [])

    const pages = [
        { name: 'Buy', href: '/buy' },
        { name: 'Purchase Orders', href: '/buy/purchaseorders' },
        { name: (router.query.edit === 'true') ? 'Edit' : 'View', href: router.asPath }
    ]

    const steps = [
        { id: '01', name: 'Purchase Order', href: '#', status: 'current' },
        { id: '02', name: 'Item Inwards', href: '#', status: 'upcoming' },
        { id: '03', name: 'Receipt', href: '#', status: 'upcoming' },
    ]

    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto pb-[100px]">
                <Steps steps={steps} />
                {
                    loading ? 
                    (<h1 className="text-2xl text-gray-300 mt-10">Loading...</h1>)
                    :
                    (<PurchaseOrder type={'view'} data={purchaseOrder} edit={router.query.edit === 'true'} />)
                }
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

export default EditPurchaseOrder