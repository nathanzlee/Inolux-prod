const Duration = ({ start, end, edit, onStartChange, onEndChange }) => {

    function dateInputValue(date) {
        if (!date) return null 
        const local = new Date(date)
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        return local.toJSON().slice(0, 10)
    }

    return (
        <div className="my-4 space-y-4">
            <div className="flex items-center">
                <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Start Date
                </label>
                <input
                    type="date"
                    className="border-gray-300 ml-2 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                    value={(start) ? dateInputValue(new Date(start)) : null}
                    onChange={onStartChange}
                    disabled={!edit}
                />
                <label
                    htmlFor="push-everything"
                    className="ml-2 block text-sm font-medium leading-6 text-gray-900"
                >
                    End Date
                </label>
                <input
                    type="date"
                    className="border-gray-300 ml-2 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                    value={(end) ? dateInputValue(new Date(end)) : null}
                    onChange={onEndChange}
                    disabled={!edit}
                />
            </div>
        </div>
    )
}

export default Duration