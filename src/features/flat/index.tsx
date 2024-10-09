import CustomCards from '@/components/CustomCards'
import { Flex } from 'antd'
import React from 'react'

const Flat = () => {
  return (
    <div>
        <Flex wrap gap={'middle'} justify='center'>
            <CustomCards title='Diamond Flat' description='Description of Diamond flat' photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            <CustomCards title='Star Flat' description='Description of Star flat' photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            <CustomCards title='Mannat Flat' description='Description of Mannat flat' photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </Flex>
    </div>
  )
}

export default Flat