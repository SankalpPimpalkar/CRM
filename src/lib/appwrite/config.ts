
const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ENDPOINT!,

    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,

    usersId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLL_ID!,
    dealsId: process.env.NEXT_PUBLIC_APPWRITE_DEALS_COLL_ID!,
    interactionsId: process.env.NEXT_PUBLIC_APPWRITE_INTERACTIONS_COLL_ID!,
    companiesId: process.env.NEXT_PUBLIC_APPWRITE_COMPANY_COLL_ID!,

    avatarsBucketId: process.env.NEXT_PUBLIC_APPWRITE_AVATARS_BUCKET_ID!,
}

export default appwriteConfig