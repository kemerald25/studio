import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbo: {
    build: {
      // @ts-expect-error - `onWarning` is not in the type definition
      onWarning: (warning, context) => {
        if(warning.message.includes('`onWarning` is not in the type definition')){
          return
        }
        context.log(warning)
      },
    },
    loaders: {
      '.node': {
        loader: 'node-loader'
      }
    }
  },
  webpack: (config, {isServer}) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
        net: false,
        tls: false
      };
    }
    return config;
  },
};

export default nextConfig;
