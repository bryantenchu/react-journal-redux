import {collection, doc, setDoc} from "firebase/firestore/lite";
import {FirebaseDB} from "../../firebase/config";
import {loadNotes} from "../../helpers/loadNotes";
import {
    addNewEmptyNote,
    savingNewNote,
    setActiveNote,
    setNotes, setPhotosToActiveNote, setSaving, updateNote,
} from "./journalSlice";
import {fileUpload} from "../../helpers/fileUploader";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        const {uid} = getState().auth;
        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
        };

        const newDoc = doc(collection(FirebaseDB, `/${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id; // creo la propiedad

        //dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        if (!uid) throw new Error("El uid no esta definido");
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const {uid} = getState().auth
        const {active: note} = getState().journal
        const noteToFireStore = {...note}
        delete noteToFireStore.id
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, {merge: true})
        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file)) //creo el arreglo de promesas
        }
        const photosUrls = await Promise.all(fileUploadPromises) // cuando resuelve tengo un arreglo de las respuestas
        dispatch(setPhotosToActiveNote(photosUrls))
        // await fileUpload(files[0])
    }
}
