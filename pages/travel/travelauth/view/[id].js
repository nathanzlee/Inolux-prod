import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Breadcrumb from '../../../../components/breadcrumb'
import TravelAuth from '../../../../components/travel/travelauth/travelAuth'
import { TRAVEL_ADVANCE_DISBURSEMENT_NUMBER } from '../../../../util/keywords'

const ViewTravelAuth = ({ session }) => {
    const router = useRouter()
    const user = session.user
    const [loading, setLoading] = useState(false)
    const [travelAuth, setTravelAuth] = useState({
      requestedBy: {
        firstName: (user) ? user.firstName : '',
        lastName: (user) ? user.lastName : '',
        number: (user) ? user.number : '',
        department: (user) ? user.department : '',
      },
      reqDate: Date.now(),
      purpose: [],
      startDate: null,
      endDate: null,
      itinerary: [{date: null, location: '', people: '', reason: ''}],
      travelAdv: {advance: true, amount: 0},
      personalTravel: {personal: false, startDate: null, endDate: null},
      international: true,
      approveBy: [],
      employeeSig: null,
      managerSig: null,
      presidentSig: null,
      notes: '',
      status: "pending"
    })

    useEffect(() => {
        setLoading(true)
        fetch('/api/travel/travelauth/' + router.query.id)
        .then(req => req.json())
        .then(res => {
            const auth = res

            // Prevent people who didn't request this auth and are not managers to view this travel auth
            if (user.level !== 3 && !auth.approveBy.includes(user._id) && auth.requestedBy._id !== user._id && !(user.number == TRAVEL_ADVANCE_DISBURSEMENT_NUMBER && auth.travelAdv.advance)) {
              Router.push('/travel/travelauth')
            }

            setTravelAuth({
                id: router.query.id,
                ...auth
            })
            setLoading(false)
        })
    }, [])

    const pages = [
        { name: 'Travel', href: '/travel' },
        { name: 'Travel Authorizations', href: '/travel/travelauth' },
        { name: 'New', href: router.asPath }
    ]

    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto px-10 pb-[100px]">
              {loading && <h1 className="text-2xl text-gray-300 mt-10">Loading...</h1>}
              {!loading && <TravelAuth type="view" viewer={user} data={travelAuth} />}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
  
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

export default ViewTravelAuth