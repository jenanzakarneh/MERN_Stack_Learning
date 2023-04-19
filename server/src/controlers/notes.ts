import { RequestHandler } from "express";
import NotesModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    //throw createHttpError(404)
    //becaue the callback is async, if it is not we dont need to do try-catch(smart enough to redirect it for the error handeler)
    // throw Error('Jenan is the queen of programming ');
    const notes = await NotesModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
export const getNote: RequestHandler = async (req, res, next) => {
  const id = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid node id");
    const note = await NotesModel.findById(id).exec();
    if (!note) throw createHttpError(404, "Note not found");
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
interface createNote {
  title?: string; //becuase the user can send req without body
  text?: string;
}
export const addNote: RequestHandler<
  unknown,
  unknown,
  createNote,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) throw createHttpError("400", "Request must include a title"); //(400=>bad request)
    const newNote = await NotesModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote); //status for new resource added
  } catch (error) {
    next(error);
  }
};
interface updateNoteParams {
  noteId: string;
}
interface updateNoteBody {
  title?: string;
  text?: string;
}
export const updateNote: RequestHandler<
  updateNoteParams,
  unknown,
  updateNoteBody,
  unknown
> = async (req, res, next) => {
  const id = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid node id");
    if (!newTitle) throw createHttpError("400", "Request must include a title");
    const note = await NotesModel.findById(id).exec();
    if (!note) throw createHttpError(404, "Note not found");
    note.title = newTitle;
    if (newText) note.text = newText;
    const newNote = await note.save();
    res.status(200).json(newNote);
  } catch (error) {
    next(error);
  }
};
export const deleteNote: RequestHandler = async (req, res, next) => {
  const id = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid node id");
    const note = await NotesModel.findById(id).exec();
    if (!note) throw createHttpError(404, "Note not found");
    await note.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
