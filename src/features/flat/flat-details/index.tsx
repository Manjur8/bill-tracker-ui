"use client"
import MembersTable from '@/features/appartment/apartment-details/members-table';
import useScreenSize from '@/hooks/useScreenSize';
import { Tabs } from 'antd';
import React, { useMemo } from 'react'
import FlatSettings from './flat-settings';

const FlatDetails = () => {
    const screenSize = useScreenSize();

    const tabs = useMemo(() => [
        {id: 'members', title: 'Flat Members', children: <MembersTable list={'flat'} />},
        {id: 'bills', title: 'My Bills', children: 'Bills UI'},
        {id: 'flat-settings', title: 'Flat Settings', children: <FlatSettings />},
    ], [])

  return (
    <div className='bg-white p-16'>
        <Tabs centered style={{height: screenSize.height < 768 ? `${screenSize.height - 135}px` : '100%', overflow: 'auto'}}
          tabPosition={screenSize.width < 768 ? 'bottom' : 'left'}
          items={tabs.map((tabMenu) => {
            return {
              label: tabMenu.title,
              key: tabMenu.id,
              children: tabMenu.children,
            };
          })}
        />
    </div>
  )
}

export default FlatDetails