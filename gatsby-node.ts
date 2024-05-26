import path from "path";
import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                components: path.resolve(__dirname, "src/components"),
                utils: path.resolve(__dirname, "src/utils"),
                hooks: path.resolve(__dirname, "src/hooks"),
            }
        }
    })
}

