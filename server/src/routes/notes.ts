import express from 'express';
import * as NoteConrollers from "../controlers/notes";
import passport from 'passport';
import "../passport";



const router =express.Router();

router.get('/',passport.authenticate("jwt", { session: false }),NoteConrollers.getNotes);

router.post("/",passport.authenticate("jwt", { session: false }),NoteConrollers.addNote);

router.get ('/:noteId',passport.authenticate("jwt", { session: false }),NoteConrollers.getNote);

router.patch('/:noteId',passport.authenticate("jwt", { session: false }),NoteConrollers.updateNote);
router.delete('/:noteId',passport.authenticate("jwt", { session: false }),NoteConrollers.deleteNote);
export default router;