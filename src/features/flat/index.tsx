"use client"
import EmptyComponent from '@/components/EmptyComponent'
import { ApartmentFlatsTypes } from '@/types/appartment';
import { APICall } from '@/utils/ApiCall';
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import ApartmentCardLoader from '../appartment/ApartmentCardLoader';
import CustomCards from '@/components/CustomCards';
import { useRouter } from 'next/navigation';

const Flat = () => {
  const router = useRouter()
  const [listLoader, setListLoader] = useState(true);
  const [flats, setFlats] = useState<ApartmentFlatsTypes[]>([])
  useEffect(() => {
    const getFlatsList = async() => {
      setListLoader(true)
      const resp = await APICall<{result: ApartmentFlatsTypes[]}>('get', 'MY_FLATS');
      
      if(resp?.success) {
        setFlats(resp?.data?.result)
      } else {
        message.error(resp?.message)
      }

      setListLoader(false)
    }
    getFlatsList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
        {/* <div className={'apartment-div'}>
            <EmptyComponent message='No Flat Found!' /> :
        </div> */}
        <div className={'apartment-div'}>
            {
              listLoader ? <ApartmentCardLoader /> :
              flats?.length === 0 ? <EmptyComponent message='No Flat Found!' /> :
              flats?.map((flat, index) => (
                <div key={index}>
                  <CustomCards key={index} title={flat?.name} description={<div className='d-flex'>
                        <div>
                            <div>Block: {flat?.block}</div>
                            <div>Floor: {flat?.floor}</div>
                            <div>Flat Number: {flat?.flat_number}</div>
                        </div>
                        <div>Maintainance Due: <span className='fw-bold'>{flat?.maintanance_due || 0}</span></div>
                        </div>} photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" onClickHandler={() => { router.push(`/flat/${flat?._id}`)}} />
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default Flat