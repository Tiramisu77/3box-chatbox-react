import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import PropTypes from 'prop-types';

import { shortenEthAddr, timeSince } from '../../utils';

import TextMessage from './TextMessage';
import Like from './Like'

const Message = (props) => {
  const {
    currentUserAddr,
    profile,
    message,
    likers,
    isFirstMessage,
    colorTheme,
    userProfileURL,
    membersOnline,
    sendMessage
  } = props;

  const currentUserAddrNormalized = currentUserAddr && currentUserAddr.toLowerCase();
  const commentAddr = profile && profile.ethAddr.toLowerCase();
  const isMyComment = commentAddr === currentUserAddrNormalized;
  const isOnline = membersOnline.includes(message.author);

  let contentClassList = [
    'sc-message--content',
    (isMyComment ? 'sent' : 'received')
  ];

  const profilePicture = (profile && profile.ethAddr) &&
    (profile.image ? `https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl['/']}`
      : makeBlockie(profile.ethAddr));

  return (
    <div className="sc-message" title={`${timeSince(message.timestamp * 1000)} ago`}>
      <div className={contentClassList.join(' ')}>

        {(!isMyComment && isFirstMessage) && (
          <>
          {isOnline && <div className="sc-message_online" />}

          <a
            href={profile.profileURL}
            className="sc-message_messager"
            target={userProfileURL ? '_self' : '_blank'}
            rel={userProfileURL ? 'dofollow' : 'noopener noreferrer'}
          >
            {profile.name ? `${profile.name} ${shortenEthAddr(profile.ethAddr)}` : `${shortenEthAddr(profile.ethAddr)}`}
          </a>
          </>
        )}

        {isFirstMessage ? (
          <a
            href={profile.profileURL}
            className="sc-message_avatarWrapper"
            target={userProfileURL ? '_self' : '_blank'}
            rel={userProfileURL ? 'dofollow' : 'noopener noreferrer'}
          >
            <img
              className="sc-message--avatar comment_picture comment_picture-bgWhite"
              src={profilePicture}
              alt="profile"
            />
          </a>
        ) : <div className="sc-message_spacer" />}

        <div className="sc-message-and-like-container">
          <TextMessage
            messageObj={message}
            isMyComment={isMyComment}
            colorTheme={colorTheme}
          />
          <Like sendMessage={sendMessage} messageObj={message} likers={likers} currentUserAddr={currentUserAddr} />
        </div>


      </div>

    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string,
  profile: PropTypes.object,
  likers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  isFirstMessage: PropTypes.bool,
  colorTheme: PropTypes.string,
  membersOnline: PropTypes.array,
  currentUserAddr: PropTypes.string,
  userProfileURL: PropTypes.func,
  sendMessage: PropTypes.func
};

export default Message;
