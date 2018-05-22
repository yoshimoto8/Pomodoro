import React from "react";
import Modal from "react-modal";
import firebase from "firebase";
import { connect } from "react-redux";
import { setPlayList, createAlubm, deleteAlbum } from "../actions/index";
import noImage from "../images/noimage.png";
import EditAlbumModal from "./EditAlbumModal";
import MyAlubmList from "../components/Molecules/MyAlubmList";
import MyAlbumFavorite from "../components/Molecules/MyAlbumFavorite";
import MyAlbumFavoriteMusic from "../components/Molecules/MyAlbumFavoriteMusic";
import "react-tippy/dist/tippy.css";
import "./styles/MyAlbum.css";
class MyAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      myFavoriteMusic: [],
      setMusic: {},
      indexStart: 0,
      indexEnd: 4,
      modalIsOpen: false,
      youtubes: [],
      myMusicLists: [],
      selectEditMusic: {}
    };
  }

  componentDidMount() {
    this.fetchMyMusicList();
    this.fetchMyFavoriteMusic();
  }

  setMusicFunc = (url, musicName, artist) => {
    this.setState({
      setMusic: { url: url, musicName: musicName, artist: artist }
    });
  };

  fetchMyFavoriteMusic() {
    const db = firebase.firestore();
    db
      .collection(`users/${sessionStorage.getItem("user")}/userFavoriteMusic`)
      .onSnapshot(Snapshot => {
        const myFavoriteMusic = [];
        Snapshot.forEach(doc => {
          myFavoriteMusic.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ myFavoriteMusic });
      });
  }

  fetchMyMusicList = () => {
    const db = firebase.firestore();
    db
      .collection(`users/${sessionStorage.getItem("user")}/userMusicList`)
      .onSnapshot(Snapshot => {
        const myMusicLists = [];
        Snapshot.forEach(doc => {
          myMusicLists.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ myMusicLists });
      });
  };

  stepNext = () => {
    this.setState({
      indexStart: this.state.indexStart + 4,
      indexEnd: this.state.indexEnd + 4
    });
  };

  stepBack = () => {
    this.setState({
      indexStart: this.state.indexStart - 4,
      indexEnd: this.state.indexEnd - 4
    });
  };

  // ここからアルバムを編集する関数
  openModal(data) {
    this.setState({ modalIsOpen: true, selectEditMusic: data });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  emptyAlubm = e => {
    e.preventDefault();
    const emptyAlbum = {
      alubmImage: noImage,
      playListName: "アルバム名がありません",
      musicList: [],
      createdOn: new Date()
    };
    return emptyAlbum;
  };

  changeSearchKeyWord = e => {
    this.setState({ searchKeyWord: e.target.value });
  };

  setUpdateMusic = data => {
    this.setState({ selectupdateMusic: data });
  };

  render() {
    const { createAlubm, setPlayList, deleteAlbum } = this.props;
    const {
      emptyAlubm,
      closeModal,
      openModal,
      setUpdateMusic,
      stepNext,
      stepBack,
      setMusicFunc
    } = this;
    const {
      myMusicLists,
      selectEditMusic,
      selectupdateMusic,
      indexStart,
      indexEnd,
      myFavoriteMusic,
      setMusic
    } = this.state;

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
      }
    };
    console.log(!!Object.keys(setMusic).length);

    return (
      <div className="main">
        <MyAlubmList
          indexStart={indexStart}
          indexEnd={indexEnd}
          myMusicLists={myMusicLists}
          createAlubm={emptyAlbum => createAlubm(emptyAlbum)}
          emptyAlubm={e => emptyAlubm(e)}
          setPlayList={musicList => setPlayList(musicList)}
          openModal={openModal.bind(this)}
          setUpdateMusic={data => setUpdateMusic(data)}
          selectupdateMusic={selectupdateMusic}
          deleteAlbum={alubm => deleteAlbum(alubm)}
          stepNext={() => stepNext()}
          stepBack={() => stepBack()}
        />
        <div className="MyAlbum-favoriteBox">
          {!!Object.keys(setMusic).length ? (
            <MyAlbumFavoriteMusic setMusic={setMusic} />
          ) : (
            <div className="MyAlbumFavoriteMusic-display" />
          )}
          <div>
            {myFavoriteMusic.map((data, index) => {
              const { musicName, duration, artist, url } = data;
              return (
                <MyAlbumFavorite
                  key={index}
                  url={url}
                  musicName={musicName}
                  duration={duration}
                  artist={artist}
                  setMusicFunc={(url, musicName, artist) =>
                    setMusicFunc(url, musicName, artist)
                  }
                />
              );
            })}
          </div>
        </div>
        <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
          <EditAlbumModal
            data={selectEditMusic}
            closeModal={() => closeModal()}
          />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setPlayList: defaultMusic => dispatch(setPlayList(defaultMusic)),
  createAlubm: emptyAlbum => dispatch(createAlubm(emptyAlbum)),
  deleteAlbum: alubm => dispatch(deleteAlbum(alubm))
});

export default connect(null, mapDispatchToProps)(MyAlbum);
