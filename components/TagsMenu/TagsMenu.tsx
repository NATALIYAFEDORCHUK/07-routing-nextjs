'use client';
import css from "./TagsMenu.module.css";
import { useState } from "react";
import Link from "next/link";
import { NoteTag } from "@/types/note";

const tags: NoteTag[] = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={tag === "All" ? "/notes/filter/all" : `/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TagsMenu;
