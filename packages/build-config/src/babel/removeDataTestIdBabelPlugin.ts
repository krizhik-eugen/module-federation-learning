import { PluginItem } from "@babel/core";
import path from 'path';

export function removeDataTestIdBabelPlugin(): PluginItem {

    return {
        visitor: {
            Program(path, state) {
                const forbiddenProps = state.opts.props || []
                path.traverse({
                    JSXIdentifier(current) {
                        const nodeName = current.node.name;
                        if (forbiddenProps.includes(nodeName)) {
                            current.parentPath.remove()
                        }
                    }
                })
            }
        }
    }
}