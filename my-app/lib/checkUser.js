import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";


export const checkUser = async () => {
  const user = await currentUser();
  console.log("checkUser",user);
  if (!user) {
    console.log("checkUser null",user);
    return null;
  }

  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    console.log("new user created",newUser);
    return newUser;
  } catch (error) {
    console.log("checkUser error",user);
    console.log(error);
  }
};