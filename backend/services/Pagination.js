class Pagination {
    static async paginate(model, query = {}, options = { page: 1, limit: 10 }) {
        const { page, limit } = options;
        const skip = (page - 1) * limit;

        try {
            const data = await model.find(query).skip(skip).limit(parseInt(limit));
            const total = await model.countDocuments(query);
            return {
                data,
                total,
                page,
                pages: Math.ceil(total / limit),
                success: true
            };
        } catch (error) {
            throw error;
        }
    }
}

export default  Pagination;
