import Row from './row'

const TravelAuths = ({ user, data, loading }) => {
    
    return (!data || data.length == 0) ?
    (
        <div className="h-[600px] flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md mt-8 p-4">
            {(loading) ? (<h1 className="text-3xl text-gray-300">Loading</h1>) : (<h1 className="text-3xl text-gray-300">No Travel Authorizations</h1>)}
        </div>
    )
    :
    (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            #
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Manager
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Request Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Revision Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Approval Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Travel Advance Disbursement Date
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">View</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((travelAuth) => {
                        const {_id, number, requestedBy, reqDate, revisionDate, managerSig, presidentSig, status, travelAdv} = travelAuth
                        let approvedDate, revDate, type, disbursementDate
                        if (presidentSig == null) {
                            approvedDate = (managerSig.date == null) ? '--' : new Date(managerSig.date).toLocaleDateString()
                        } else {
                            approvedDate = (managerSig.date == null || presidentSig.date == null) ? '--' : new Date(Math.max(new Date(managerSig.date), new Date(presidentSig.date))).toLocaleDateString()
                        }

                        revDate = (revisionDate == null) ? '--' : new Date(revisionDate).toLocaleDateString()

                        if (requestedBy.number == user.number) {
                            type = 'view'
                        } else {
                            if (managerSig.user?.number == user.number) {
                                type = (managerSig.signature !== '') ? 'view' : 'authorize'
                            } else {
                                type = (presidentSig?.signature !== '') ? 'view' : 'authorize'
                            }
                        }

                        disbursementDate = (travelAdv.disbursementDate == null) ? '--' : new Date(travelAdv.disbursementDate).toLocaleDateString()

                        return (
                            <Row key={_id} id={_id} number={number} requester={requestedBy.firstName + ' ' + requestedBy.lastName} manager={managerSig.user?.firstName + ' ' + managerSig.user?.lastName} reqDate={new Date(reqDate).toLocaleDateString()} revisionDate={revDate} approvedDate={approvedDate} status={status} advDisbursementDate={disbursementDate} type={type} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TravelAuths