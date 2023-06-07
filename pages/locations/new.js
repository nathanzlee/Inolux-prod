import { getSession } from 'next-auth/react'
import Breadcrumb from '../../components/breadcrumb'
import Location from '../../components/locations/location'

const pages = [
    { name: 'Locations', href: '/locations' },
    { name: 'New', href: '/locations/new' }
]

const NewLocation = ({ session }) => {
    const location = {
        name: '',
        address: '',
        description: ''
    }

    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto px-10 pb-[100px]">
                <Location type={'new'} data={location} edit={true}/>
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

export default NewLocation