import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const root = process.cwd();

//Consigue archivos de la ruta de la carpeta data, donde están los post
export const getFiles = () => fs.readdirSync(path.join(root, "data"));

//Fichero fuente del Markdown 
export const getFileBySlug = async (slug) => {
    const mdxSource = fs.readFileSync(
        path.join(root, "data", `${slug}.mdx`),
        "utf-8"
    );
    
    //Lo decostruimos en dos partes:
    //data = titulo, fecha
    //content = contenido post
    const {data, content} = await matter(mdxSource);
    const source = await serialize(content, {});

    return {
        source,
        frontmatter: {
            slug,
            ...data, 
        },
    };
};

//Obtenemos todos los ficheros
export const getAllFilesMetadata = () => {
    const files = getFiles();

    return files.reduce((allPosts, postSlug) => {
        const mdxSource = fs.readFileSync(path.join(root, "data", postSlug), 'utf-8');
        const {data} = matter(mdxSource);

        return [{...data, slug: postSlug.replace('.mdx', '')}, ...allPosts]
    }, []);
};


