import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from './types/types';

export function buildDevServer({port}: BuildOptions): DevServerConfiguration {
    return {
        port: port ?? 3000,
        open: true,
        //если раздавать статику через nginx, то нужно делать проксирование на Index.html
        historyApiFallback: true,
        hot: true,
    }
}