"use client";

import css from "./NotesPage.module.css";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

import { fetchNotes, FetchNotesResponse } from "@/lib/api";

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, tag]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, debouncedSearchTerm, currentPage],
    queryFn: () =>
      fetchNotes({ query: debouncedSearchTerm, page: currentPage, ...(tag && tag !== "All" && { tag }) }),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === 1 && debouncedSearchTerm === "" ? initialData : undefined,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Could not fetch the list of notes.</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={setSearchTerm} />

        {data && data.notes.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 1}
            setPage={setCurrentPage}
          />
        )}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={css.button}
        >
          Create note +
        </button>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
