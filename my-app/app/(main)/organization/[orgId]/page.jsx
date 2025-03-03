import { getOrganization } from '@/actions/organization';
import OrgSwitcher from '@/components/org-switcher';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const Organization = async({params}) => {
    let {orgId}=params;
    const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const organization = await getOrganization(orgId);

  if (!organization) {
    return <div>Organization not found</div>;
  }
   console.log("Organization", organization);
    return (
      <div className="container mx-auto px-4">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">
          {organization.name}&rsquo;s Projects
        </h1>

       <OrgSwitcher></OrgSwitcher>
      </div>
      
    </div>
  )
}

export default Organization;