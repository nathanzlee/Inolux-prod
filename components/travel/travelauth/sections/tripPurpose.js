import { useState } from 'react'
import CheckboxOptions from '../form/checkboxOptions'

const TripPurpose = ({ data, options, edit, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(data)

    function handleOnChange(e, type) {
        if (type == 'default') {
            if (e.target.checked) {
                setSelectedOptions([...selectedOptions, e.target.value])
            } else {
                setSelectedOptions(selectedOptions.filter(o => o !== e.target.value))
            }
        } else {
            const defaultOptions = selectedOptions.filter(o => options.map(i => i.value).includes(o))
            if (defaultOptions.length < selectedOptions.length) {
                setSelectedOptions([...defaultOptions, e.target.value])
            }
        }
    }
    
    return (
        <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
            <div className="pt-6 sm:pt-5">
                <div role="group" aria-labelledby="label-notifications">
                    <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                        <div>
                            <div className="text-sm font-semibold leading-6 text-gray-900" id="label-notifications">
                            Purpose of Trip
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="max-w-lg">
                                <CheckboxOptions options={options} selected={selectedOptions} edit={edit} onChange={(e, type) => {
                                    handleOnChange(e, type)
                                    onChange(e, type)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripPurpose