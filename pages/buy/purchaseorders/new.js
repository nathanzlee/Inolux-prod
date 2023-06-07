import { getSession } from 'next-auth/react'
import PurchaseOrder from '../../../components/buy/purchaseOrders/purchaseOrder'
import Breadcrumb from '../../../components/breadcrumb'

const pages = [
    { name: 'Buy', href: '/buy' },
    { name: 'Purchase Orders', href: '/buy/purchaseorders' },
    { name: 'New', href: '/buy/purchaseorders/new' }
]

const NewPurchaseOrder = ({ session }) => {
    const purchaseOrder = {
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
    }
    
    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto pb-[100px]">
                <PurchaseOrder type={'new'} data={purchaseOrder} edit={true} />
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

export default NewPurchaseOrder