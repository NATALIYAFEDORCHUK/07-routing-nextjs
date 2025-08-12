import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type NotesPageProps = {
  params: Promise<{slug: string[]}>
}



export default async function NotesTag({params}: NotesPageProps) {
  const {slug} = await params;
  const tag: string = slug[0];
  const initialData = await fetchNotes({query: "", page: 1, ...(tag && tag !== "All" && {tag}) });

  return <NotesClient initialData={initialData} tag={tag}/>;
}


