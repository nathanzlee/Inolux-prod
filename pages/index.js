import React, { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import Nav from '../components/nav'
import {
  Bars4Icon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
  TableCellsIcon,
  ViewColumnsIcon,
  UsersIcon
} from '@heroicons/react/24/outline'


const items = [
  {
    title: 'Manage Users',
    description: 'Manage employees and onboarding new users.',
    icon: UsersIcon,
    background: 'bg-pink-500',
    href: '/users'
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Home = ({ session }) => {
  const user = session.user 

  return (
    <div className="h-[100vh] w-[100vw]">
        <Nav initials={user.firstName[0] + user.lastName[0]} />
        <div className="w-full h-full bg-gray-100 p-10">
            <h1 className="text-2xl">Welcome {(user) ? user.firstName + ' ' + user.lastName : ''}</h1>
            {user.level == 3 && (<div className="mt-5">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Setup</h2>
              <ul role="list" className="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-2">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flow-root">
                    <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                      <div
                        className={classNames(
                          item.background,
                          'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'
                        )}
                      >
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          <a href={item.href} className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <span>{item.title}</span>
                            <span aria-hidden="true"> &rarr;</span>
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>)}
        </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  return {
    props: { session }
  }
}

export default Home
