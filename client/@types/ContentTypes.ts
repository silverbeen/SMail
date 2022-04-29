export interface ContentType {
  contentId: number;
  fieldId: number;
  content: string;
  title?: string;
  id: number;
}

export interface DeskContentType {
  id: number;
  content: string;
  content_id: string;
}
