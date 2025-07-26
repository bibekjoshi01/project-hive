import ProjectDetailView from './project-detail-view';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params; 

  return <ProjectDetailView projectId={slug} />;
}
