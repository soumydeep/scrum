import React from 'react'
import { getProject } from "@/actions/projects";
import { notFound } from 'next/navigation';
import SprintCreationForm from '../_components/create-sprint';
import SprintBoard from '../_components/sprint-board';

const ProjectPage = async({params}) => {
  
  const { projectId } = params;
  const project = await getProject(projectId);
 

  if (!project) {
    
    notFound();
  }
  return (
    <div>
      
      <SprintCreationForm
      projectTitle={project.name}
      projectKey={project.key}
      projectId={projectId}
      sprintKey={project.sprints?.length+1}
      ></SprintCreationForm>

      {project.sprints.length>0 ?(
        <SprintBoard 
        sprints={project.sprints}
        projectId={projectId}
        orgId={project.organizationId}>
        </SprintBoard>
        

      ):(
      <div>Create a Sprint from Above Button</div>
      
      )}
      
      
    </div>
  )
}

export default ProjectPage