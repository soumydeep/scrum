import { clerkClient } from '@clerk/nextjs/server';
import React from 'reacdatat'

async function createProject(data) {
    const { userId, orgID } = auth();
    if (!userId) {
        throw new Error("unauthorized");

    }
    if (!orgId) {
        throw new Error("No organozation selected");
    }
    const { data: membershipList } = await clerkClient().organizations.membershipList({
        organizationsId: orgID
    });

    const userMembership = membershipList.find((membership) => {
        membership.publicUserData.userId === userId;
    })

    if (!membership || userMembership.role !== "org:admin") {
        throw new Error("Only organization admins can create projects");
    }

    try {
        const project = await db.project.create({
            data: {
                name: data.name,
                key: data.key,
                description: data.description,
                organizationId: orgId,
            },
        });

        return project;
    } catch (err) {
        throw new Error("Error creating project: " + error.message);
    }
    return (
        <div>createProject</div>
    )
}

export default createProject