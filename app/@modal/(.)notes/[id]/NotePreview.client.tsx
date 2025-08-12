"use client";

import css from "./NotePreview.client.module.css";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  if (isLoading) return <Loader />;
  if (error || !note) return <ErrorMessage />;

  return (
    <Modal onClose={handleGoBack}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.updatedAt ? note.updatedAt : note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
