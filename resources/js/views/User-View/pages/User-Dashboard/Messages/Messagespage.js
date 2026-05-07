import React, { useState } from 'react';
import Navbar from "../../../components/dashboard/shared/Navbar/Navbar";
import ConversationList from '../../../components/dashboard/pages/conversation-list/ConversationList';
import ChatWindow from '../../../components/dashboard/pages/chat-window/ChatWindow';

const MessagesPage = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="messages-page">
                <div className="messages-page__body">
                    <div className="messages-page__left">
                        <ConversationList selected={selected} onSelect={setSelected} />
                    </div>
                    <div className="messages-page__right">
                        <ChatWindow conversation={selected} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;