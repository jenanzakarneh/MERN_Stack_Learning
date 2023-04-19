import React from 'react';
import styles from "../styles/Note.module.css";
import styleUtil from "../styles/utils.module.css";
import { Note as NoteModel } from '../models/note'
import Card from 'react-bootstrap/Card';
import { formateDate } from '../utils/formatDate';
import { MdDelete } from "react-icons/md";
interface NoteProps {
    note: NoteModel,
    className?: string,
    onDeleteNoteClicked: (note: NoteModel) => void,
    onNoteClicked: (note: NoteModel) => void
}
const Note = ({ note, className, onDeleteNoteClicked,onNoteClicked }: NoteProps) => {
    const { title, text, createdAt, updatedAt } = note;

    let date: string;
    if (updatedAt > createdAt)
        date = `Updated at ${formateDate(updatedAt)}`;
    else
        date = `Created at ${formateDate(createdAt)}`;
    return (
        <Card
        onClick={()=>onNoteClicked(note)}
         className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtil.flexCenter}>
                    {title}
                    <MdDelete
                        className='text-muted ms-auto'
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();

                        }} />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className='text-muted'>
                {date}
            </Card.Footer>
        </Card>
    )

}

export default Note
