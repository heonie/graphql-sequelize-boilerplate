export default {
    Query: {
        user: (_, args) => {
            const { id } = args;
            return {
                id,
                email: "heonie@gmail.com", password: "PASSWORD", name: "test",
                createdAt: Date.now(), updatedAt: Date.now()
            }
        }
    }
}
