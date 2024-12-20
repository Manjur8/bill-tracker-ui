"use client"
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import CustomCards from '@/components/CustomCards';
import { APICall } from '@/utils/ApiCall';
import ApartmentCardLoader from './ApartmentCardLoader';
import EmptyComponent from '@/components/EmptyComponent';
import { useRouter } from 'next/navigation';
import { ApartmentsListTypes } from '@/types/appartment';
import { useDispatch } from 'react-redux';
import { setApartmentDetails } from '@/utils/slices/apartmentDetails';

const Appartment = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // const { useBreakpoint } = Grid;
    const [messageApi, contextHolder] = message.useMessage();
    // const screen = useBreakpoint()
    // console.log(screen)
    const [apartmentsList, setApartmentsList] = useState<ApartmentsListTypes[]>([])
    const [listLoader, setListLoader] = useState(false)
    const [emptyComponentLoading, setEmptyComponentLoading] = useState(false);

    useEffect(() => {
      const getApartmentsList = async() => {
        setListLoader(true)
        const resp = await APICall<{result: ApartmentsListTypes[]}>('get', 'MY_APARTMENT');
        
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

    const emptyComponentClickHandler = () => {
      setEmptyComponentLoading(true)
      router.push('/register');
    }

    const apartmentClickHandler = (item: ApartmentsListTypes) => {
        dispatch(setApartmentDetails({ _id: item?._id, name: item?.name, available_fund: item?.available_fund, address: item?.address }))
        router.push(`/appartment/${item?._id}`)
    }

  return (
    <div>
        {contextHolder}
        <div className={'apartment-div'}>
            {
              listLoader ? <ApartmentCardLoader /> :
              apartmentsList?.length === 0 ? <EmptyComponent message='No Apartment Found!' buttonClickHandler={emptyComponentClickHandler} loading={emptyComponentLoading} /> :
              apartmentsList?.map((item, index) => (
                <div key={index}>
                  <CustomCards title={item?.name} description={`${item?.address?.locality}, ${item?.address?.city_village}`} photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" onClickHandler={() => apartmentClickHandler(item)} />
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default Appartment