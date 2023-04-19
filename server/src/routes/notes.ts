import express from 'express';
import * as NoteConrollers from "../controlers/notes";

const router =express.Router();

router.get('/',NoteConrollers.getNotes);

router.post("/",NoteConrollers.addNote);

router.get ('/:noteId',NoteConrollers.getNote);

router.patch('/:noteId',NoteConrollers.updateNote);
router.delete('/:noteId',NoteConrollers.deleteNote);
export default router;