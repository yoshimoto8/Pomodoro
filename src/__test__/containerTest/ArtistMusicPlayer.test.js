import React from "react";
import { connect } from "react-redux";
import { render, configure } from "enzyme";
import ArtistMusicPlayer from "../../container/ArtistMusicPlayer";
import Adapter from "enzyme-adapter-react-16";
import TabHelmet from "../../components/Atoms/TabHelmet";

describe("<ArtistMusicPlayer /> test", () => {
  it("test", () => {});
});

// configure({ adapter: new Adapter() });
// describe("<ArtistMusicPlayer /> test", () => {
//   it("helmet test", () => {
//     const wrapper = render(connect(<ArtistMusicPlayer />));
//     expect(wrapper.find(<TabHelmet />)).toBe(1);
//   });
// });
