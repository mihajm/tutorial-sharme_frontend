export const userQuery = userId => `*[_type == "user" && _id == "${userId}"]`;
const pinsReturnSchema = `{
    image {
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`;
export const searchQuery = searchTerm => `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']${pinsReturnSchema}`;
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc)${pinsReturnSchema}`;
