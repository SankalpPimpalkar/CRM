import { Client, Account, ID, Models, Databases, Storage, Query } from 'appwrite';
import appwriteConfig from './config';
import { ThrowErrorAppwrite } from './errors';

interface CreateAccountParams {
    email: string;
    password: string;
    name: string;
    username: string;
}

interface LoginParams {
    email: string;
    password: string;
}

interface UpdateUserParams {
    name?: string;
    email?: string;
    avatar?: any;
    phone?: string;
}

class ApprwiteService {
    private client: Client;
    private account: Account;
    private databases: Databases;
    private storage: Storage

    constructor() {
        this.client = new Client()
            .setEndpoint(appwriteConfig.endpoint)
            .setProject(appwriteConfig.projectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createAccount({ email, password, name, username }: CreateAccountParams) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            const formattedUsername = username.trim().split(' ').join('').toLowerCase()

            if (!userAccount) {
                throw Error("Failed to create user account")
            }

            const userAccountInDB = await this.databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersId,
                userAccount.$id,
                {
                    name,
                    email,
                    username: formattedUsername
                }
            )

            if (!userAccountInDB) {
                throw Error("Failed to create record of newly created user")
            }

            return await this.loginAccount({ email, password })

        } catch (error: any) {
            ThrowErrorAppwrite(
                error,
                'CreateAccount',
            )
        }
    }

    async loginAccount({ email, password }: LoginParams) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error: any) {
            ThrowErrorAppwrite(
                error,
                'LoginAccount'
            )
        }
    }

    async getCurrentUser(): Promise<Models.Document | null> {
        try {
            const userAuth = await this.account.get()

            if (!userAuth) {
                throw Error("User is not logged in")
            }

            const userData = await this.databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersId,
                userAuth.$id
            )

            if (!userData) {
                throw Error("Failed to fetch userData")
            }

            return userData

        } catch (error) {
            ThrowErrorAppwrite(
                error,
                'GetCurrentUser'
            )
            return null
        }
    }

    async LogoutAccount(): Promise<void> {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            ThrowErrorAppwrite(
                error,
                'LogoutAccount'
            )
        }
    }

    async updateDetails({ name, email, avatar, phone }: UpdateUserParams) {
        try {
            const userAuth = await this.account.get();

            if (!userAuth) {
                throw new Error("User is not logged in");
            }

            const updatedData: Partial<UpdateUserParams> = {}
            if (name) updatedData.name = name
            if (email) updatedData.name = email
            if (phone) updatedData.name = phone


            if (avatar) {
                const response = await this.uploadAvatar(userAuth.$id, avatar)
                updatedData.avatar = response.$id
            }

            if (Object.keys(updatedData).length === 0) {
                throw new Error("No valid fields provided for update.");
            }

            const updatedInfo = await this.databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersId,
                userAuth.$id,
                updatedData
            )

            if (!updatedInfo) {
                throw Error("Failed to update user details")
            }

            return updatedInfo

        } catch (error) {
            ThrowErrorAppwrite(
                error,
                'UpdateDetails'
            )
        }
    }

    async uploadAvatar(fileId: string, file: File) {
        const avatarFile = await this.storage.createFile(
            appwriteConfig.avatarsBucketId,
            fileId,
            file
        )

        return avatarFile
    }

    async validateNewUsername(username: string): Promise<boolean | undefined> {
        try {

            const formattedUsername = username.trim().split(' ').join('').toLowerCase()

            const results = await this.databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.usersId,
                [
                    Query.equal('username', formattedUsername)
                ]
            )

            return results.total == 0

        } catch (error) {
            ThrowErrorAppwrite(
                error,
                'ValidateNewUsername'
            )
        }
    }


    // Database

}

const apprwiteService = new ApprwiteService();
export default apprwiteService;