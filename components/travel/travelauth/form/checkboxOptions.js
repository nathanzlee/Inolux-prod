import { useState } from "react"

const CheckboxOptions = ({ options, selected, edit, onChange }) => {
    
    const altOption = selected.find(o => !options.map(o => o.value).includes(o))
    const [otherOption, setOtherOption] = useState((altOption) ? altOption : '')

    return (
        <div className="mt-4 space-y-4">
            {options.map((option, index) => {
                return (
                    <div className="flex items-center" key={index}>
                        <input
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                            value={option.value}
                            checked={selected.includes(option.value)}
                            onChange={(e) => {onChange(e, 'default')}}
                            disabled={!edit}
                        />
                        <label
                            htmlFor="push-everything"
                            className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                        >
                            {option.label}
                        </label>
                    </div>
                )
            })}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                    value={otherOption}
                    checked={!(altOption == null)}
                    onChange={(e) => {onChange(e, 'default')}}
                    disabled={!edit}
                />
                <label
                    htmlFor="push-everything"
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                    Other
                </label>
                <input
                    type="text"
                    className="border-gray-300 ml-2 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                    value={otherOption}
                    onChange={(e) => {
                        setOtherOption(e.target.value)
                        onChange(e, 'alt')
                    }}
                    disabled={!edit}
                />
            </div>
        </div>
    )
}

export default CheckboxOptions