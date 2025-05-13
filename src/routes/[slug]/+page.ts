import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    try {
        const post = await import(`../../../content/${params.slug}.md`);
        return { content: post.default, meta: post.metadata };
    } catch (e) {
        console.error(e);
        error(404, `Could not find ${params.slug}`);
    }
};