import Row from './row'

const Locations = ({ data, loading, edit }) => {
    return (!data || data.length == 0) ?
    (
        <div className="h-[600px] flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md mt-8 p-4">
            {(loading) ? (<h1 className="text-3xl text-gray-300">Loading</h1>) : (<h1 className="text-3xl text-gray-300">No Locations</h1>)}
        </div>
    )
    :
    (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Name
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">View</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((item) => {
                        const {_id, name, address} = item
                        return (
                            <Row key={_id} id={_id} name={name} address={address} edit={edit}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Locations