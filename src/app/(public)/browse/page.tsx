// Components
import BrowseProjects from './browse-projects';

export const metadata = {
  title: 'All Student Projects | Thapathali Campus',
  description:
    'Browse all student projects from Thapathali Campus. View final year submissions and research work.',
  keywords: [
    'student projects',
    'Thapathali Campus',
    'engineering',
    'research',
    'final year',
  ],
  openGraph: {
    title: 'Student Projects | Thapathali Campus',
    description: 'Browse innovative student projects from Thapathali Campus.',
    url: 'https://projects.tcioe.edu.np/browse',
    siteName: 'Thapathali Campus',
    type: 'website',
  },
};

export default function page() {
  return (
    <section className='bg-white'>
      <div className='container mx-auto mb-16 px-4 lg:px-6'>
        <BrowseProjects />
      </div>
    </section>
  );
}
