"use client"
import React from 'react';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { usePathname } from 'next/navigation';
// import { getCookies } from '@/utils/cookies';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import PrivateLayout from './Layout/PrivateLayout';

const CustomLayout = ({children}: {children: React.ReactNode}) => {
  const pathName = usePathname();
  const isPublicPage = pathName.startsWith('/auth')
  // const [userInfo, setUserInfo] = useState(userInfoDetails)
  // useEffect(() => {
  //   async function getUserInfo () {
  //     const parsedData = JSON.parse(await getCookies('user-info') || JSON.stringify(userInfoDetails))
  //      setUserInfo(parsedData)
  //   }
  //   getUserInfo()
  // }, [userInfoDetails])

  return (
    <Provider store={store}>
      {
        isPublicPage ? (
          <AntdRegistry>
              {children}
          </AntdRegistry>
        ) : (
          <AntdRegistry>
              <PrivateLayout>
                {children}
              </PrivateLayout>
          </AntdRegistry>
        )
      }
    </Provider>
  )
};

export default CustomLayout;