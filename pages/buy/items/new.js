import { getSession } from 'next-auth/react'
import { useReducer } from 'react'
import Router from 'next/router'
import Breadcrumb from '../../../components/breadcrumb'
import Item from '../../../components/buy/items/item'

const pages = [
    { name: 'Buy', href: '/buy' },
    { name: 'Items', href: '/buy/items' },
    { name: 'New', href: '/buy/items/new' }
]

const NewItem = ({ session }) => {
    const item = {
        documentNo: 'ITM',
        unitMeasurement: '',
        unitCost: 0,
        EAN: 0,
        name: '',
        make: '',
        itemGroup: '',
        UPC: 0,
        ISBN: '',
        description: ''
    }
    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto px-10 pb-[100px]">
                <Item type={'new'} data={item} edit={true}/>
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

export default NewItem