"use client";

import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface TabListProps {
    tabList: {name: string, content: React.ReactNode}[] 
}

const TabGroupCard = ({tabList}: TabListProps) => {
    
return (       
        <TabGroup>
            <TabList className="flex justify-center mb-6">
            <div style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex gap-3 bg-gray-100 dark:bg-gray-700 rounded-full p-2 overflow-x-scroll scroll-smooth">
                {tabList.map(({ name }) => (
                <Tab
                    key={name}
                    className={({ selected }) =>
                    `px-6 py-3 flex flex-none rounded-full text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${
                        selected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`
                    }
                >
                    {name}
                </Tab>
                ))}
            </div>
        </TabList>
        <TabPanels className="w-full">
            {tabList.map(({ name, content }) => (
                  <TabPanel key={name} as={Fragment}>
                  {({ selected }) => (
                    <Transition
                      show={selected}
                      as={Fragment}
                      enter="transform transition duration-500 ease-in-out"
                      enterFrom="opacity-0 translate-y-4"
                      enterTo="opacity-100 translate-y-0"
                      leave="transform transition duration-300 ease-in-out"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-4"
                    >
                      
                      <div>{content}</div>
                    </Transition>
                  )}
                </TabPanel>
                ))}
        </TabPanels>
      </TabGroup>
      )
}

export default TabGroupCard;