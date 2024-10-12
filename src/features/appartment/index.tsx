"use client"
import { Flex, Grid, message } from 'antd';
import React, { useEffect, useState } from 'react'
import CustomCards from '@/components/CustomCards';
import { APICall } from '@/utils/ApiCall';
import ApartmentCardLoader from './ApartmentCardLoader';

interface ApartmentsListTypes {
  name: string,
  address: {
      country: string,
      city_village: string,
      pincode: number,
      locality: string,
  }
}

const Appartment = () => {
    const { useBreakpoint } = Grid;
    const [messageApi, contextHolder] = message.useMessage();
    const screen = useBreakpoint()
    // console.log(screen)
    const [apartmentsList, setApartmentsList] = useState<ApartmentsListTypes[]>([])
    const [listLoader, setListLoader] = useState(false)

    useEffect(() => {
      const getApartmentsList = async() => {
        setListLoader(true)
        const resp = await APICall<{result: ApartmentsListTypes[]}>('get', 'APPARTMENT_REGISTER');

        if(resp?.success) {
          setApartmentsList(resp?.data?.result)
        } else {
          messageApi.open({
            type: 'error',
            content: resp?.message
          })
        }
        setListLoader(false)
      }
      getApartmentsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <div>
        {contextHolder}
        <Flex wrap gap={'middle'} justify={screen?.xs ? 'center' : 'normal'}>
            {
              listLoader ? <ApartmentCardLoader /> :
              apartmentsList?.map((item, index) => (
                <div key={index}>
                  <CustomCards title={item?.name} description={`${item?.address?.locality}, ${item?.address?.city_village}`} photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                </div>
              ))
            }
            {/* <CustomCards title='Star Appartment' description='Description of Star appartment' photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" /> */}
            {/* <CustomCards title='Mannat Appartment' description='Description of Mannat appartment' photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" /> */}
        </Flex>
    </div>
  )
}

export default Appartment