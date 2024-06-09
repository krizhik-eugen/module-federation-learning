import webpack from 'webpack';
import path from 'path';
import {buildWebpack} from '@packages/build-config';
import type {BuildMode, BuildPaths, BuildPlatform} from '@packages/build-config';
import packageJson from './package.json'

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean;
    platform?: BuildPlatform,
    SHOP_REMOTE_ENTRY?: string,
    ADMIN_REMOTE_ENTRY?: string
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        public: path.resolve(__dirname, 'public'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        output: path.resolve(__dirname, 'build'),
    }

    const SHOP_REMOTE_ENTRY = env.SHOP_REMOTE_ENTRY ?? 'http://localhost:3001'
    const ADMIN_REMOTE_ENTRY = env.ADMIN_REMOTE_ENTRY ?? 'http://localhost:3002'

    const config: webpack.Configuration = buildWebpack({
        mode: env.mode ?? 'development',
        port: env.port ?? 3000,
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
            shop: `shop@${SHOP_REMOTE_ENTRY}/remoteEntry.js`,
            admin: `admin@${ADMIN_REMOTE_ENTRY}/remoteEntry.js`
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                // requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-dom'],
            }
        }
    }))

    return config
}
