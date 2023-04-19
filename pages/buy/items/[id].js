import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Item from '../../../components/buy/items/item'
import Breadcrumb from '../../../components/breadcrumb'

const EditItem = ({ session }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState({
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
    })

    useEffect(() => {
        setLoading(true)
        fetch('/api/buy/items/' + router.query.id)
        .then(req => req.json())
        .then(res => {
            setItem({...res, id: router.query.id})
            setLoading(false)
        })
    }, [])

    const pages = [
        { name: 'Buy', href: '/buy' },
        { name: 'Items', href: '/buy/items' },
        { name: (router.query.edit === 'true') ? 'Edit' : 'View', href: router.asPath }
    ]

    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto px-10 pb-[100px]">
                {
                    loading ? 
                    (<h1 className="text-2xl text-gray-300 mt-10">Loading...</h1>)
                    :
                    (<Item type={'view'} data={item} edit={router.query.edit === 'true'}/>)
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

export default EditItem