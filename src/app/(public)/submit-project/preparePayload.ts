import { SubmitProjectPayload } from './redux/api.project';
import { ProjectFormData } from './config';
import { ELevels } from './types';
import { uploadFileToSupabase, uniqueName } from '@/lib/storage';
import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';

const editorNodes = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  AutoLinkNode,
  LinkNode,
];

async function lexicalJsonToHtml(jsonString: string): Promise<string> {
  if (!jsonString) return '';

  try {
    const editor = createEditor({
      namespace: 'headlessEditor',
      nodes: editorNodes,
      onError: (error) => {
        console.error('Headless editor error:', error);
      },
    });

    const editorState = editor.parseEditorState(jsonString);

    let html = '';
    editorState.read(() => {
      html = $generateHtmlFromNodes(editor, null);
    });

    return html;
  } catch (error) {
    console.error('Error converting Lexical JSON to HTML:', error);
    return '';
  }
}

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
        fullName: tm.fullName
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase()),
        rollNo: tm.rollNo?.toUpperCase(),
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

  // Convert description (Lexical JSON) to HTML
  const projectDetailsHtml = await lexicalJsonToHtml(data.description);

  const payload: SubmitProjectPayload = {
    title: data.title,
    abstract: data.abstract,
    batchYear: data.batch!.id,
    category: data.category!.id,
    department: data.department!.id,
    level: data.level as ELevels,
    supervisor: data.supervisor || undefined,
    projectDetails: projectDetailsHtml,
    technologiesUsed: data.technologies,
    githubLink: data.githubUrl || undefined,
    documentationLink: data.documentationUrl || undefined,
    teamMembers,
    files,
  };

  return payload;
}
