import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import styleUtils from "./styles/utils.module.css";
import { fetchNotes, deleteNote } from "./network/note_api";
import AddEditNoteDialoge from "./components/AddEditNoteDialoge";
import { FaPlus } from 'react-icons/fa';
function App() {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [showAddNoteDialoge, setShowAddNoteDialoge] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

	useEffect(() => {
		const loadNotes = async () => {
			try {
				setNotesLoading(true);
				setShowNotesLoadingError(false);
				const notes = await fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.error(error);
				setShowNotesLoadingError(true)
			} finally {
				setNotesLoading(false);
			}
		};
		loadNotes();
	}, []);

	async function deleteThisNote(note: NoteModel) {


		try {
			await deleteNote(note._id);
			setNotes(notes.filter(exsitingNote => note._id != exsitingNote._id));
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}
	const notesGrid = <Row sm={1} md={2} xl={3} className="g-4">
		{notes.map((note) => (
			<Col key={note._id}>
				<Note note={note}
					className={styles.note}
					onDeleteNoteClicked={deleteThisNote}
					onNoteClicked={setNoteToEdit} />
			</Col>
		))}
	</Row>;
	return (
		<Container className="mt-4">
			{
				notesLoading && <Spinner animation="border" variant="primary" />
			}
			{showNotesLoadingError && <p> There is an error in notes loadying
				,please try again
			</p>}
			{!notesLoading && !showNotesLoadingError &&
				<>
					{
						notes.length > 0 ?
							notesGrid :
							<p> You haven't added any note yet</p>
					}
				</>
			}
			{showAddNoteDialoge && (
				<AddEditNoteDialoge
					onDismiss={() => setShowAddNoteDialoge(false)}
					onNoteSaved={(newNote) => {
						setNotes([...notes, newNote]);
						setShowAddNoteDialoge(false);
					}}
				/>
			)}
			{noteToEdit &&
				<AddEditNoteDialoge
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(updatedNote) => {
						setNotes(notes.map((exsistingNote) => exsistingNote._id == updatedNote._id
							? updatedNote : exsistingNote));
						setNoteToEdit(null);
					}}
				/>
			}
			<Button className={`mt-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} onClick={() => setShowAddNoteDialoge(true)}>
				Add Note
				<FaPlus className="ms-auto" />
			</Button>
		</Container>
	);
}

export default App;
