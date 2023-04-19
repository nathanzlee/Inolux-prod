const Row = ({ id, partNo, unit, code, cost, edit }) => {
    const url = `/buy/items/${id}?edit=${edit}`
    return (
        <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{partNo}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{code}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cost.toFixed(2)}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href={url} className="text-[var(--primary-color)] hover:text-indigo-900">
                    {edit ? 'Edit' : 'View'}
                </a>
            </td>
        </tr>
    )
}

export default Row