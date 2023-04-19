import { getSession } from 'next-auth/react'
import Partner from '../../../components/buy/partners/partner'
import Breadcrumb from '../../../components/breadcrumb'

const pages = [
    { name: 'Buy', href: '/buy' },
    { name: 'Partners', href: '/buy/partners' },
    { name: 'New', href: '/buy/partners/new' }
]

const NewPartner = ({ session }) => {
    const partner = {
      name: '',
      type: 'Customer'
    }
    return (
        <div className="h-[100vh] w-[100vw]">
            <Breadcrumb pages={pages}/>
            <div className="w-full h-full bg-gray-100 overflow-y-auto px-10 pb-[100px]">
                <Partner type={'new'} data={partner} edit={true} />
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

export default NewPartner