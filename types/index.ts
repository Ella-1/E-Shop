import { User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" |  "updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified:  Date | null;

}

DATABASE_URL="mongodb+srv://teslatoken:Qxm1h625lBiwpejx@cluster0.n4vlwse.mongodb.net/e-shop"
NEXTAUTH_SECRET="iwnfwhfwbwf498t74b4fg"
GOOGLE_CLIENT_ID="97827575807-sbjos80g4to6tab713m0nd2eu29nh6ok.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
