import CustomCards from '@/components/CustomCards'
import EmptyComponent from '@/components/EmptyComponent'
import { APICall } from '@/utils/ApiCall'
import { message } from 'antd'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ApartmentFlats = () => {
    const [apartmentFlats, setApartmentFlats] = useState<ApartmentFlatsTypes[]>([])
    const params = useParams();
    useEffect(() => {
        const flatsApiCall = async () => {
            const resp = await APICall<{result: ApartmentFlatsTypes[]}>('get', `APARTMENT_FLATS?apartment_id=${params.id}`)

            if(resp?.success) {
                setApartmentFlats(resp?.data?.result)
            } else {
                message.error(resp?.message)
            }
        }
        flatsApiCall()
    }, []) //eslint-disable-line
  return (
    <div className='apartment-div'>
        {
            apartmentFlats?.length === 0 ? <EmptyComponent message='No flat found' /> :
            apartmentFlats?.map((flat, index) => (
                <CustomCards key={index} title={flat?.name} description={<div className='d-flex'>
                    <div>
                        <div>Block: {flat?.block}</div>
                        <div>Floor: {flat?.floor}</div>
                        <div>Flat Number: {flat?.flat_number}</div>
                    </div>
                    <div>Maintainance Due: <span className='fw-bold'>{flat?.maintanance_due || 0}</span></div>
                    </div>} photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" onClickHandler={() => {}} />
            ))
        }
        
    </div>
  )
}

export default ApartmentFlats

interface ApartmentFlatsTypes {
    _id: string,
    name: string,
    apartment_id: string,
    block: string,
    floor: number,
    flat_number: string,
    maintanance_due: number,
}