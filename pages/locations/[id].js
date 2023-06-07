import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Breadcrumb from '../../components/breadcrumb'
import Location from '../../components/locations/location'

const EditLocation = ({ session }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState({
        name: '',
        address: '',
        description: ''
    })

    useEffect(() => {
        setLoading(true)
        fetch('/api/locations/' + router.query.id)
        .then(req => req.json())
        .then(res => {
            setLocation({...res, id: router.query.id})
            setLoading(false)
        })
    }, [])

    const pages = [
        { name: 'Locations', href: '/locations' },
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
                    (<Location type={'view'} data={location} edit={router.query.edit === 'true'}/>)
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

export default EditLocation