const Row = ({ id, name, address, edit }) => {
    const url = `/locations/${id}?edit=${edit}`
    return (
        <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{name}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href={url} className="text-[var(--primary-color)] hover:text-indigo-900">
                    {edit ? 'Edit' : 'View'}
                </a>
            </td>
        </tr>
    )
}

export default Row