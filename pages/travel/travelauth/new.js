import { getSession, useSession } from 'next-auth/react'
import Breadcrumb from '../../../components/breadcrumb'
import TravelAuth from '../../../components/travel/travelauth/travelAuth'
import { PENDING_STATUS } from '../../../util/keywords'

const pages = [
    { name: 'Travel', href: '/travel' },
    { name: 'Travel Authorizations', href: '/travel/travelauth' },
    { name: 'New', href: '/travel/travelauth/new' }
]

const NewTravelAuth = ({ session }) => {
    const user = session.user
    const travelAuthData = {
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
      travelAdv: {advance: null, amount: 0},
      personalTravel: {personal: null, startDate: null, endDate: null},
      international: null,
      approveBy: [],
      employeeSig: {
          signature: '', 
          date: null
      },
      managerSig: null,
      presidentSig: null,
      notes: '',
      status: PENDING_STATUS
    }

    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto px-10 pb-[100px]">
                <TravelAuth type="new" data={travelAuthData} />
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

export default NewTravelAuth