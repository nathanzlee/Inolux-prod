import { useState, useReducer } from 'react'
import Router from 'next/router'
import PersonalInfo from './sections/personalInfo'
import InternationalTravel from './sections/internationalTravel'
import TripPurpose from './sections/tripPurpose'
import TripDuration from './sections/tripDuration'
import Itinerary from './sections/itinerary/itinerary'
import TravelAdvance from './sections/travelAdvance'
import PersonalTravel from './sections/personalTravel'
import Signature from './sections/signature'
import Notes from './sections/notes'
import '../../../util/keywords'
import { APPROVED_STATUS, APPROVE_SUBMIT, CANCEL_SUBMIT, DENIED_STATUS, DENY_SUBMIT, NEW_SUBMIT, PENDING_STATUS, SAVE_SUBMIT } from '../../../util/keywords'

const TravelAuth = ({ type, viewer, data }) => {

    let role
    if (type == 'new') {
        role = 'requester'
    } else if (data.requestedBy.number == viewer.number) {
        role = 'requester'
    } else if (data.managerSig?.user.number == viewer.number) {
        role = 'manager'
    } else if (data.presidentSig?.user.number == viewer.number) {
        role = 'president'
    } else if (data.travelAdv.advance && viewer.number == 2) {
        role = 'update disbursement'
    } else {
        role = 'other'
    }
    
    const personalInfo = {
        name: data.requestedBy.firstName + ' ' + data.requestedBy.lastName,
        number: data.requestedBy.number,
        department: data.requestedBy.department,
        reqDate: data.reqDate
    }

    function reducer(state, action) {
        return {
            ...state,
            [action.type]: action.data
        }
    }
    const [formData, update] = useReducer(reducer, {
        reqDate: data.reqDate,
        international: data.international,
        purpose: data.purpose,
        startDate: data.startDate,
        endDate: data.endDate,
        itinerary: data.itinerary,
        travelAdv: data.travelAdv,
        personalTravel: data.personalTravel,
        employeeSig: data.employeeSig,
        managerSig: data.managerSig,
        presidentSig: data.presidentSig,
        notes: data.notes,
    })

    const tripPurposeOptions = [
        {label: "Customer Visit", value: "Customer Visit"},
        {label: "Supplier Visit", value: "Supplier Visit"},
        {label: "Show", value: "Show"},
        {label: "Intercompany Business", value: "Intercompany Business"},
    ]
    
    function handleChange(type, data) {
        update({type: type, data: data})
    }
    
    function handleCancel() {
        Router.push('/travel/travelauth')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const req = await fetch('/api/travel/travelauth/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const res = await req.json()
        if (res.msg == 'Success!') {
            Router.push({pathname: '/travel/travelauth', query: {action: 'new', success: true}})
        } else {
            Router.push({pathname: '/travel/travelauth', query: {action: 'new', success: false}})
        }
    }

    async function handleSave(e) {
        e.preventDefault()
        const req = await fetch('/api/travel/travelauth/edit/' + data.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const res = await req.json()
        if (res.msg == 'Success!') {
            Router.push({pathname: '/travel/travelauth', query: {action: 'edit', success: true}})
        } else {
            Router.push({pathname: '/travel/travelauth', query: {action: 'edit', success: false}})
        }
    }

    async function handleAuthorize(e) {
        e.preventDefault()
        let approval
        if (role == 'manager') {
            const status = (formData.presidentSig !== null && formData.presidentSig.signature == '') ? PENDING_STATUS : APPROVED_STATUS
            approval = {role: 'manager', signature: formData.managerSig.signature, date: formData.managerSig.date, status: status, notes: formData.notes}
        } else {
            const status = (formData.managerSig.signature == '') ? PENDING_STATUS : APPROVED_STATUS
            approval = {role: 'president', signature: formData.presidentSig.signature, date: formData.presidentSig.date, status: status, notes: formData.notes}
        }
      
        const req = await fetch('/api/travel/travelauth/authorize/' + data.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(approval)
        })
        const res = await req.json()
        
        if (res.msg == 'Success!') {
            Router.push({pathname: '/travel/travelauth', query: {action: 'authorize', success: true}})
        } else {
            Router.push({pathname: '/travel/travelauth', query: {action: 'authorize', success: false}})
        }
    }

    async function handleDeny(e) {
        e.preventDefault()
        const req = await fetch('/api/travel/travelauth/authorize/' + data.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({role: role, status: DENIED_STATUS, notes: formData.notes})
        })
        const res = await req.json()
       
        if (res.msg == 'Success!') {
            Router.push('/travel/travelauth')
        } else {
            Router.push({pathname: '/travel/travelauth', query: {action: 'authorize', success: false}})
        }
    }

    let submit, edit, editEmployee, showManager, editManager, showPresident, editPresident
    const editDisbursement = (data.status == APPROVED_STATUS && viewer.number == 2 && data.travelAdv.disbursementDate == null)
    const showDisbursement = (data.status == APPROVED_STATUS && viewer.number == 2)

    if (type == 'new') {
        submit = (
            <div className="flex justify-end gap-x-3">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    {CANCEL_SUBMIT}
                </button>
                <button
                    type="submit"
                    onClick={(e) => {handleSubmit(e)}}
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {NEW_SUBMIT}
                </button>
            </div>
        )
        edit = true
        editEmployee = true
        showManager = false 
        editManager = false 
        showPresident = false
        editPresident = false
    } else if (type == 'view') {
        if ((role == 'requester' && data.status !== APPROVED_STATUS) || editDisbursement) {
            submit = (
                <div className="flex justify-end gap-x-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        {CANCEL_SUBMIT}
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => {handleSave(e)}}
                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {SAVE_SUBMIT}
                    </button>
                </div>
            )
            edit = true
            editEmployee = false
            showManager = true
            editManager = false 
            showPresident = (formData.presidentSig !== null) && true
            editPresident = false
        } else {
            submit = (
                <div className="flex justify-end gap-x-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        {CANCEL_SUBMIT}
                    </button>
                </div>
            )
            edit = false
            editEmployee = false
            showManager = true
            editManager = false 
            showPresident = (formData.presidentSig !== null) && true
            editPresident = false
        }
    } else {
        if (data.status == DENIED_STATUS) {
            submit = (
                <div className="flex justify-end gap-x-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        {CANCEL_SUBMIT}
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => {handleAuthorize(e)}}
                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {APPROVE_SUBMIT}
                    </button>
                </div>
            )
        } else {
            submit = (
                <div className="flex justify-end gap-x-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        {CANCEL_SUBMIT}
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => {handleDeny(e)}}
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        {DENY_SUBMIT}
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => {handleAuthorize(e)}}
                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {APPROVE_SUBMIT}
                    </button>
                </div>
            )
        }
        
        edit = false
        editEmployee = false

        if (role == 'manager') {
            showManager = true
            editManager = true
            showPresident = (formData.presidentSig !== null) && true
            editPresident = false
        } else {
            showManager = true
            editManager = false 
            showPresident = true
            editPresident = true
        }
    }
    

    return (
        <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
                    </div> 
                    <PersonalInfo data={personalInfo}/>
                </div>
                <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Trip Information</h3>
                    </div>
                    <InternationalTravel data={formData.international} edit={edit} onChange={(e) => {handleChange('international', e.target.value)}} />
                    <TripPurpose data={formData.purpose} options={tripPurposeOptions} edit={edit} onChange={(e, type) => {
                        if (type == 'default') {
                            if (e.target.checked) {
                                handleChange('purpose', [...formData.purpose, e.target.value])
                            } else {
                                handleChange('purpose', formData.purpose.filter(o => o !== e.target.value))
                            }
                        } else {
                            const defaultOptions = formData.purpose.filter(o => tripPurposeOptions.map(i => i.value).includes(o))
                            if (defaultOptions.length < formData.purpose.length) {
                                handleChange('purpose', [...defaultOptions, e.target.value])
                            }
                        }
                        
                    }} />
                    <TripDuration data={{startDate: formData.startDate, endDate: formData.endDate}} edit={edit} onChange={(data) => {
                        handleChange('startDate', data.startDate)
                        handleChange('endDate', data.endDate)
                    }} />
                    <Itinerary data={formData.itinerary} edit={edit} onChange={(data) => {handleChange('itinerary', data)}}/>
                    <TravelAdvance data={formData.travelAdv} edit={edit} onChange={(data) => {handleChange('travelAdv', data)}} editDisbursement={editDisbursement} showDisbursement={showDisbursement} />
                    <PersonalTravel data={formData.personalTravel} edit={edit} onChange={(data) => {handleChange('personalTravel', data)}} />
                </div>
                <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Approval</h3>
                    </div>
                    <Signature label={'Employee Signature'} data={formData.employeeSig} edit={editEmployee} onChange={(data) => {handleChange('employeeSig', data)}} />
                    {showManager && <Signature label={'Manager Signature'} data={formData.managerSig} edit={editManager} onChange={(data) => {handleChange('managerSig', data)}} />}
                    {showPresident && <Signature label={'President Signature'} data={formData.presidentSig} edit={editPresident} onChange={(data) => {handleChange('presidentSig', data)}} />}
                    <Notes data={formData.notes} edit={(data.status == APPROVED_STATUS) ? false : true} onChange={(data) => {handleChange('notes', data)}}/>
                </div>
            </div>

            <div className="pt-5">
                {submit}
            </div>
        </form>
    )
}


export default TravelAuth