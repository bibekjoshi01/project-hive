import ProjectDetailView from './project-detail-view';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetailView projectId={params.slug} />;
}
