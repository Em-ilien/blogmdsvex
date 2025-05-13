export const load = async () => {
    try {
        const modules = import.meta.glob(`../../content/**.md`);

        const promises: any = [];
        for (const path in modules)
            promises.push({ mods: modules[path](), path: "/" + path.split('/').slice(-1)[0].split('.md')[0] });

        let posts: any = [];

        await Promise.all(promises.map((promise: any) => promise.mods))
            .then((mods) => {
                posts = mods.map((mod: any, index: number) => {
                    return { mod, path: promises[index].path }
                })
            })

        return {
            posts: posts.map((post: any) => ({ content: post.mod.default, meta: post.mod.metadata, path: post.path }))
        }
    } catch (e) {
        console.error(e);
    }
};