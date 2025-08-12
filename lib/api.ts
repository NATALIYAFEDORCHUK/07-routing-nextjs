import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}
export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

interface FetchNotesParams {
  query?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export const fetchNotes = async ({
  query = "",
  page = 1,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const params: Record<string, string | number> = {
    page,
    perPage,
    ...(query !== '' && {query}),
    ...(tag !== undefined ? { tag } : {}),
  };
  if (query.trim()) {
    params.search = query.trim();
  }

  const config = {
    params,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get<FetchNotesResponse>("/notes", config);
  return res.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post<Note>("/notes", noteData, config);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete<Note>(`/notes/${noteId}`, config);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get<Note>(`/notes/${id}`, config);
  return res.data;
};
