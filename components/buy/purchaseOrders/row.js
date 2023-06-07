import Status from './status'

const Row = ({ id, vendor, entryDate, value, status, edit }) => {
    const url = `/buy/purchaseorders/${id}?edit=${edit}`
    return (
        <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{vendor.name}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entryDate}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{`US$ ${value}`}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <Status status={status} />
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href={url} className="text-[var(--primary-color)] hover:text-indigo-900">
                    {edit ? 'Edit' : 'View'}
                </a>
            </td>
        </tr>
    )
}

export default Row