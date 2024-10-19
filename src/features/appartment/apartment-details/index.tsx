"use client"
import { APICall } from '@/utils/ApiCall';
import { message } from 'antd';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ApartmentDetails = () => {
  const params = useParams();

  useEffect(() => {
    const getApartmentDetails = async () => {
        const apartmentDetailsResponse = await APICall('get', `APARTMENT_DETAILS?apartment_id=${params.id}`)
        
        if(apartmentDetailsResponse.success) {
            console.log(apartmentDetailsResponse.data) // display apartment details here
        } else {
            message.error(apartmentDetailsResponse?.message)
        }
    }
    
    // Fetch apartment details when the component mounts
    getApartmentDetails()
  }, [params.id])
  return (
    <div>ApartmentDetails {params.id}</div>
  )
}

export default ApartmentDetails