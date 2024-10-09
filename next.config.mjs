/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'gw.alipayobjects.com',
              port: '',
              pathname: '/zos/rmsportal/**',
            },
            
          ],      
    },
};

export default nextConfig;
