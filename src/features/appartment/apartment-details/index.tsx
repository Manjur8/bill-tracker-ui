"use client"
// import { ApartmentDetailsTypes } from '@/types/appartment';
// import { APICall } from '@/utils/ApiCall';
import { Button, Descriptions, Form, Input, Skeleton, Tabs } from 'antd';
// import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import type { DescriptionsProps } from 'antd';
import MembersTable from './members-table';
import ApartmentFlats from './apartment-flats';
import { useSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import useScreenSize from '@/hooks/useScreenSize';
import ApartmentSettings from './apartment-settings';

const ApartmentDetails = () => {
  // const params = useParams();
  const screenSize = useScreenSize();

  const [form] = Form.useForm();
  const apartmentDetails = useSelector((state: RootState) => state.apartmentDetails)

  // const [apartmentDetails, setApartmentDetails] = useState<ApartmentDetailsTypes>(cachedApartmentDetails)
  // const [loader, setLoader] = useState(true)
  const [editMode, setEditMode] = useState(false)

  // useEffect(() => {
  //   const getApartmentDetails = async () => {
  //       // const apartmentDetailsResponse = await APICall<{result: ApartmentDetailsTypes}>('get', `APARTMENT_DETAILS?apartment_id=${params.id}`)
  //       // const apartmentDetailsResponse = {
  //       //   message: "Success",
  //       //   success: true,
  //       //   data: {
  //       //     result: {
  //       //       _id: "671389ec0caa1a80b27860ac",
  //       //       name: "New Castle",
  //       //       address: {
  //       //         city_village: "Kolkata",
  //       //         country: "India",
  //       //         locality: "AJC Roade",
  //       //         pincode: 700137
  //       //       },
  //       //       created_by: "670bcfb70ef5f5cd1ab6043a",
  //       //       available_fund: 0,
  //       //       created_at: "2024-10-19T10:28:13.565000",
  //       //       members: {
  //       //         user_id: "670bcfb70ef5f5cd1ab6043a",
  //       //         role: [
  //       //           "671389ec0caa1a80b27860ad"
  //       //         ]
  //       //       }
  //       //     }
  //       //   }
  //       // }
        
  //       // if(apartmentDetailsResponse.success) {
  //       //   setApartmentDetails(apartmentDetailsResponse?.data?.result)
  //       // } else {
  //       //     message.error(apartmentDetailsResponse?.message)
  //       // }
  //       // setLoader(false)
  //   }
    
  //   // Fetch apartment details when the component mounts
  //   getApartmentDetails()
  // }, [params.id])

  const LoaderNode = <Skeleton.Node active={true} style={{ height: 24 }} />

  const FormItemNode = ({formItemName}: {formItemName: string}) => {
    return (
      <Form.Item name={formItemName} rules={[{required: true, message: 'This field is required'}]}>
        <Input />
      </Form.Item>
    );
  }

  const getItems = (loader: boolean) : DescriptionsProps['items'] => {
    return [
      {
        key: '1',
        label: 'Name',
        span: 2,
        contentStyle: editMode ? { paddingBottom: '0px'} : { },
        children: loader ? LoaderNode : editMode ? <FormItemNode formItemName={'name'} /> : apartmentDetails?.name || '-',
      },
      {
        key: '6',
        label: 'Available Fund',
        span: 1,
        // contentStyle: editMode ? { paddingBottom: '0px'} : { },
        children: loader ? LoaderNode :  (apartmentDetails && apartmentDetails?.available_fund >= 0) ? <div className='fw-bold'>{apartmentDetails?.available_fund}</div> : '-',
      },
      {
        key: '2',
        span: 1,
        contentStyle: editMode ? { paddingBottom: '0px'} : { },
        label: 'Locality',
        children: loader ? LoaderNode : editMode ? <FormItemNode formItemName={'locality'} /> : apartmentDetails?.address?.locality || '-',
      },
      {
        key: '3',
        span: 1,
        contentStyle: editMode ? { paddingBottom: '0px'} : { },
        label: 'City/Village',
        children: loader ? LoaderNode : editMode ? <FormItemNode formItemName={'city_village'} /> : apartmentDetails?.address?.city_village || '-',
      },
      {
        key: '4',
        span: 1,
        contentStyle: editMode ? { paddingBottom: '0px'} : { },
        label: 'Pincode',
        children: loader ? LoaderNode : editMode ? <FormItemNode formItemName={'pincode'} /> : apartmentDetails?.address?.pincode || '-',
      },
      {
        key: '5',
        span: 1,
        contentStyle: editMode ? { paddingBottom: '0px'} : { },
        label: 'Country',
        children: loader ? LoaderNode : editMode ? <FormItemNode formItemName={'country'} /> : apartmentDetails?.address?.country || '-',
      }
    ];
  }

  const initialValues = {
    _id: apartmentDetails?._id || '',
    name: apartmentDetails?.name || '',
    locality: apartmentDetails?.address?.locality || '',
    city_village: apartmentDetails?.address?.city_village || '',
    pincode: apartmentDetails?.address?.pincode || '',
    country: apartmentDetails?.address?.country || '',
  }

  const tabs = [{id: 'details', title: 'Details', children: <>
  {
      //   loader ? <Descriptions
      //   bordered
      //   title="Apartment Details"
      //   size={'default'}
      //   extra={<Button type="primary">Edit</Button>}
      //   items={getItems(loader)}
      // /> : 
      <Form form={form} initialValues={initialValues} onFinish={(val) => {console.log(val, 'submit'); setEditMode(false)}}>
              <Descriptions
                // bordered
                title="Apartment Details"
                size={'default'}
                extra={editMode ? <Form.Item><Button type="primary" htmlType='submit'>Update</Button></Form.Item> : <Button type="primary" htmlType='button' onClick={() => setEditMode(true)}>Edit</Button>}
                items={getItems(false)}
              />
        </Form>
      }
  </>}, {id: 'members', title: 'Members', children: <MembersTable />}, {id: 'flats', title: 'Flats', children: <ApartmentFlats />},
  {id: 'apartment-settings', title: 'Apartment Settings', children: <ApartmentSettings />}];

  return (
    <div className='bg-white p-16'>      
      {/* <div className='d-flex justify-content-center align-items-center'> */}
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
      {/* </div> */}
    </div>
  )
}

export default ApartmentDetails