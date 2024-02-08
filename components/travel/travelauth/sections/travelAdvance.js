import { useState, useEffect } from 'react'
import RadioOptions from '../form/radioOptions'
import { getDateFromInput, dateInputValue } from '@/util/date'

const TravelAdvance = ({ data, edit, onChange, editDisbursement, showDisbursement }) => {
    const [selectedOption, setSelectedOption] = useState(data ? data.advance : null)
    const [amount, setAmount] = useState(data ? data.amount : null)
    const [inputDisplay, setInputDisplay] = useState((data.advance) ? 'block' : 'hidden')
    const [disbursementDate, setDisbursementDate] = useState(data ? data.disbursementDate : null)
    const [disbursementDisplay, setDisbursementDisplay] = useState((showDisbursement) ? 'block' : 'hidden')

    useEffect(() => {
        onChange({
            advance: selectedOption, 
            amount: amount,
            disbursementDate: disbursementDate
        })
    }, [selectedOption, amount, disbursementDate])

    function handleOnChange(e) {
        setSelectedOption(e.target.value === 'true')
        if (e.target.value === 'true') {
            setInputDisplay('block')
        } else {
            setInputDisplay('hidden')
        }
    }

    function handleAmountChange(e) {
        setAmount(e.target.value)
    }

    function handleDisbursementChange(e) {
        const newDate = getDateFromInput(e.target.valueAsDate)
        setDisbursementDate(newDate)
    }

    const options = [
        {label: "Yes", value: true},
        {label: "No", value: false}
    ]

    return (
        <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
            <div className="pt-6 sm:pt-5">
                <div role="group" aria-labelledby="label-notifications">
                    <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                        <div>
                            <div className="text-sm font-semibold leading-6 text-gray-900" id="label-notifications">
                            Travel Advance
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="max-w-lg">
                                <RadioOptions options={options} selected={selectedOption} edit={edit} onChange={(e) => {
                                    handleOnChange(e)
                                    onChange(e)
                                }}/>
                                <div className={"my-4 space-y-4 " + inputDisplay}>
                                    <div className="flex items-center">
                                        <label
                                            htmlFor="push-everything"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Amount 
                                        </label>
                                        <input
                                            type="number"
                                            className="border-gray-300 ml-2 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                                            value={amount}
                                            onChange={(e) => {handleAmountChange(e)}}
                                            disabled={!edit}
                                        />
                                    </div>
                                    <div className={"flex items-center " + disbursementDisplay}>
                                        <label
                                            htmlFor="push-everything"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Disbursement Date
                                        </label>
                                        <input
                                            type="date"
                                            className="border-gray-300 ml-2 text-[var(--primary-color) focus:ring-text-[var(--primary-color)"
                                            value={(disbursementDate) ? dateInputValue(new Date(disbursementDate)) : null}
                                            onChange={(e) => {handleDisbursementChange(e)}}
                                            disabled={!editDisbursement}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelAdvance