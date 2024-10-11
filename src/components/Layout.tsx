"use client"
import React from 'react';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { usePathname } from 'next/navigation';
// import { getCookies } from '@/utils/cookies';
import { Provider } from 'react-redux';
import { persistor, store } from '@/lib/store';
import PrivateLayout from './Layout/PrivateLayout';
import { PersistGate } from 'redux-persist/integration/react';

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
        <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  )
};

export default CustomLayout;