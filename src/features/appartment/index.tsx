"use client"
import { Flex, Grid } from 'antd';
import React from 'react'
import CustomCards from '@/components/CustomCards';

const Appartment = () => {
    const { useBreakpoint } = Grid;
    const screen = useBreakpoint()
    console.log(screen)
  return (
    <div>
        <Flex wrap gap={'middle'} justify={screen?.xs ? 'center' : 'normal'}>
            <CustomCards title='Ghost Appartment' description='Description of Ghosh appartment' photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            <CustomCards title='Star Appartment' description='Description of Star appartment' photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            <CustomCards title='Mannat Appartment' description='Description of Mannat appartment' photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </Flex>
    </div>
  )
}

export default Appartment