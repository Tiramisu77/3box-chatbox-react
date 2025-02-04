import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import { getCurrentProvider } from '../utils';
import closeIcon from '../assets/close-icon.svg';
import Chat from '../assets/chat-bubble.svg';

class Header extends Component {

  render() {
    const {
      imageUrl,
      chatName,
      onClose,
      colorTheme,
      membersOnlineLength,
      currentUser3BoxProfile,
      ethereum,
      handleShowOnlineList,
      isShowOnlineList,
    } = this.props;

    const isEmptyProfile = !currentUser3BoxProfile.image && !currentUser3BoxProfile.name;

    return (
      <div className="sc-header" style={{ backgroundColor: colorTheme }}>
        <div className="sc-header_details">
          {imageUrl ? <img className="sc-header--img" src={imageUrl} alt="Chat Profile" />
            : <SVG src={Chat} alt="Logo" className="sc-header--img default" />
          }

          <div className="sc-header--team-name">
            <h3 className="sc-header--team-name_text">
              {chatName}
            </h3>

            <p
              className={`sc-header--team-name_membersOnline ${isShowOnlineList ? 'active' : ''}`}
              onClick={handleShowOnlineList}
            >
              {`${membersOnlineLength} online`}
            </p>
          </div>
        </div>

        <div className="sc-header--right">
          {isEmptyProfile && (
            <a
              href={`https://3box.io/login?wallet=${getCurrentProvider(ethereum)}`}
              className="sc-header-updateProfile"
            >
              Edit profile
            </a>
          )}

          <div className="sc-header--close-button" onClick={onClose}>
            <SVG src={closeIcon} alt="Close" />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  imageUrl: PropTypes.string,
  chatName: PropTypes.string,
  colorTheme: PropTypes.string,
  onClose: PropTypes.func,
  membersOnlineLength: PropTypes.number,
  currentUser3BoxProfile: PropTypes.object,
  isShowOnlineList: PropTypes.bool,
  ethereum: PropTypes.object,
  handleShowOnlineList: PropTypes.func.isRequired,
};

export default Header;
