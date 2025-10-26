import { marked } from "marked";
import DOMPurify from 'dompurify';

export interface LabMetadata {
    slug: string;
    title: string;
    subtitle: string;
    content: string;
}

export interface Lab {
    metadata: LabMetadata;
    content: string;
}

const labMetadata = import.meta.glob('../data/labs/**/*.json', { eager: true });
const labContent = import.meta.glob('../data/labs/**/*.md', { eager: true, query: "?raw" });

export async function getFileContents<T>(path: string, modules: Record<string, unknown>): Promise<T | null> {
    if (path in modules) {
        const lab = modules[path];

        return (lab as { default: T }).default;
    } else {
        console.error(`File not found: ${path}`);
        return null;
    }
}

async function getMetadataByPath(path: string) : Promise<LabMetadata | null> {
    const fileContents = await getFileContents<LabMetadata>(path, labMetadata);
    if(fileContents === null) {
        return null;
    }

    const parts = path.split('/');
    const slug = parts[parts.length - 2]?.toLowerCase();

    if(slug) {
        fileContents.slug = slug;
    }

    return fileContents;
}

async function getMetadataBySlug(slug: string): Promise<LabMetadata | null> {
    return await getMetadataByPath(`../data/labs/${slug}/metadata.json`);
}

export async function getMetadatas(): Promise<LabMetadata[] | null> {
    const metadatas: LabMetadata[] = [];

    for(const entry in labMetadata) {
        const meta = await getMetadataByPath(entry);
        if(meta === null) {
            continue;
        }
        
        metadatas.push(meta);
    }

    if(metadatas.length < 1) {
        return null;
    }

    return metadatas;
}

async function getMarkdownContent(slug: string): Promise<string | null> {
    try {
        const fileContents = await getFileContents<string>(`../data/labs/${slug}/content.md`, labContent);
        if(fileContents === null) {
            return null;
        }

        const parsed = await marked.parse(fileContents);
        const cleaned = DOMPurify.sanitize(parsed);

        return cleaned;
    }
    catch(err) {
        return null;
    }
}

export async function getLabBySlug(slug: string): Promise<null | Lab> {
    try {
        const labMeta = await getMetadataBySlug(slug);
        if(labMeta === null) {
            console.error(`Failed to find 'metadata.json' for lab '${slug}'.`);
            return null;
        }

        const labContent = await getMarkdownContent(slug);
        if(labContent === null) {
            console.error(`Failed to find 'content.md' for lab '${slug}'.`);
            return null;
        }

        labMeta.slug = slug;

        const lab: Lab = {
            metadata: labMeta,
            content: labContent
        }

        console.log(lab);

        return lab;
    } 
    catch(err) {
        console.error(`An error occured while trying to get lab '${slug}': ${err}`);
        return null;
    }
}

export async function parseMarkdown(markdown: string) {
    const parsed = await marked.parse(markdown);
    const cleaned = DOMPurify.sanitize(parsed);

    return cleaned;
}