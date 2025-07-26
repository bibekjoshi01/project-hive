import { SubmitProjectPayload } from './redux/api.project';
import { ProjectFormData } from './config';
import { ELevels } from './types';
import { uploadFileToSupabase, uniqueName } from '@/lib/storage'; 

export async function preparePayload(
  data: ProjectFormData,
): Promise<SubmitProjectPayload> {
  // Upload team member photos
  const teamMembers = await Promise.all(
    data.teamMembers.map(async (tm) => {
      let photo = null;
      if (tm.photo) {
        const path = `projects/team_members/${uniqueName(tm.photo.name)}`;
        photo = await uploadFileToSupabase(tm.photo, path);
      }
      return {
        fullName: tm.fullName,
        rollNo: tm.rollNo,
        photo,
      };
    }),
  );

  // Upload project files
  const files = await Promise.all(
    data.files
      .filter((f) => f.file) 
      .map(async (f) => {
        const path = `projects/files/${uniqueName(f.file!.name)}`;
        const url = await uploadFileToSupabase(f.file!, path);
        return { fileType: f.type || 'Other Info', file: url };
      }),
  );

  const payload: SubmitProjectPayload = {
    title: data.title,
    abstract: data.abstract,
    batchYear: data.batch!.id,
    category: data.category!.id,
    department: data.department!.id,
    level: data.level as ELevels,
    supervisor: data.supervisor || undefined,
    projectDetails: data.description,
    technologiesUsed: data.technologies,
    githubLink: data.githubUrl || undefined,
    documentationLink: data.documentationUrl || undefined,
    teamMembers,
    files,
  };

  return payload;
}
