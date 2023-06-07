import React, { useState, useEffect, Fragment } from 'react'
import { getSession } from 'next-auth/react'
import Breadcrumb from '../../components/breadcrumb'
import LocationsTable from '../../components/locations/locations'
import Router, { useRouter } from 'next/router'

const pages = [
    { name: 'Locations', href: '/locations' }
]

const Locations = ({ session }) => {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const user = session.user
    
    useEffect(() => {
        setLoading(true)
        fetch('/api/locations')
        .then(req => req.json())
        .then(res => {
            setLocations(res.data)
            setLoading(false)
        })
    }, [])
    
    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 p-10">
                <div className="sm:px-6 lg:px-8">
                    <h1 className="font-semibold leading-6 text-2xl">Locations</h1>
                    <div className="flex flex-row justify-between items-center mt-8 sm:flex sm:items-center">
                        <div></div>
                        <button
                            type="button"
                            onClick={() => {Router.push('/locations/new')}}
                            className="block rounded-md bg-[var(--primary-color)] py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
                        >
                            New
                        </button>
                    </div>
                    <LocationsTable data={locations} loading={loading} edit={user ? (user.level > 1) : false}/>
                </div>
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
  

export default Locations
