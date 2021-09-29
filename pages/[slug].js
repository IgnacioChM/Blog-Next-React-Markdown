import { MDXRemote } from "next-mdx-remote";
import { getFileBySlug, getFiles } from "../lib/mdx";
import MDXComponents from "../components/MDXComponents";

export default function Post ({source, frontmatter}) {
    //console.log(source); 
    return <MDXRemote { ...source} components={MDXComponents} />
}

export async function getStaticProps({ params }){
    const {source, frontmatter} = await getFileBySlug(params.slug);//params.slug tenemos el nombre de la ruta

    return {
        props: { source, frontmatter},
    };
}

export async function getStaticPaths(){
    const posts = await getFiles();
    const paths = posts.map((post) => ({
        params: {
        slug: post.replace(/\.mdx/, ""),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}