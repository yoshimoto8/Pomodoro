import firebase from "firebase";

export default function createAlubmAPI(emptyAlbum) {
  const db = firebase.firestore();
  const isdb = db
    .collection(`users/${sessionStorage.getItem("user")}/userMusicList`)
    .add(emptyAlbum)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  return isdb;
}
