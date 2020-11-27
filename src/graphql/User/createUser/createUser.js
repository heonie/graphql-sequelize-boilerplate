export default {
    Mutation: {
        createUser: (_, args) => {
            const {email, password, name} = args;
            const createdAt = Date.now();
            const updatedAt = Date.now();
            return {
                id: 1,
                email, password, name,
                createdAt, updatedAt
            }
        }
    }
}
