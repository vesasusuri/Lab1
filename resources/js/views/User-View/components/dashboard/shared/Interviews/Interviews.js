import React, { useMemo, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaExternalLinkAlt, FaVideo } from 'react-icons/fa';
import './Interviews.scss';

const scheduledInterviews = [
    {
        id: 1,
        company: 'Outsorcy',
        role: 'Frontend Developer',
        time: 'Today, 14:30',
        roomName: 'outsorcy-frontend-interview',
    },
    {
        id: 2,
        company: 'Telkos',
        role: 'React Engineer',
        time: 'Tomorrow, 10:00',
        roomName: 'telkos-react-engineer-interview',
    },
];

const normalizeRoomName = (value) => value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const formatRoomTitle = (roomName) => roomName
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const Interviews = () => {
    const navigate = useNavigate();
    const { roomName } = useParams();
    const decodedRoomName = roomName ? decodeURIComponent(roomName) : '';
    const [customRoomName, setCustomRoomName] = useState('');

    const activeRoomTitle = useMemo(() => (
        decodedRoomName ? formatRoomTitle(decodedRoomName) : ''
    ), [decodedRoomName]);

    const joinRoom = (nextRoomName) => {
        const normalizedRoomName = normalizeRoomName(nextRoomName);

        if (!normalizedRoomName) {
            return;
        }

        navigate(`/interviews/${encodeURIComponent(normalizedRoomName)}`);
    };

    return (
        <main className="interviews">
            <section className="interviews__header">
                <div>
                    <span className="interviews__eyebrow">Video interviews</span>
                    <h1>Interviews</h1>
                    <p>Join scheduled calls or start a Jitsi room for a new interview.</p>
                </div>

                {decodedRoomName && (
                    <button
                        className="interviews__secondary-button"
                        type="button"
                        onClick={() => navigate('/interviews')}
                    >
                        Back to interviews
                    </button>
                )}
            </section>

            {!decodedRoomName ? (
                <>
                    <section className="interviews__join">
                        <div>
                            <h2>Start or join a room</h2>
                            <p>Use a shared room name so both participants enter the same call.</p>
                        </div>

                        <form
                            className="interviews__join-form"
                            onSubmit={(event) => {
                                event.preventDefault();
                                joinRoom(customRoomName);
                            }}
                        >
                            <input
                                type="text"
                                value={customRoomName}
                                onChange={(event) => setCustomRoomName(event.target.value)}
                                placeholder="interview-room-name"
                                aria-label="Interview room name"
                            />
                            <button type="submit">
                                <FaVideo aria-hidden="true" />
                                Join room
                            </button>
                        </form>
                    </section>

                    <section className="interviews__list" aria-label="Scheduled interviews">
                        {scheduledInterviews.map((interview) => (
                            <article className="interviews__card" key={interview.id}>
                                <div className="interviews__card-icon">
                                    <FaCalendarAlt aria-hidden="true" />
                                </div>
                                <div className="interviews__card-content">
                                    <h3>{interview.role}</h3>
                                    <p>{interview.company}</p>
                                    <span>{interview.time}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => joinRoom(interview.roomName)}
                                >
                                    <FaExternalLinkAlt aria-hidden="true" />
                                    Join
                                </button>
                            </article>
                        ))}
                    </section>
                </>
            ) : (
                <section className="interviews__meeting" aria-label="Jitsi meeting">
                    <div className="interviews__meeting-header">
                        <div>
                            <span className="interviews__eyebrow">Live room</span>
                            <h2>{activeRoomTitle || decodedRoomName}</h2>
                        </div>
                        <span className="interviews__room-name">{decodedRoomName}</span>
                    </div>

                    <div className="interviews__jitsi-frame">
                        <JitsiMeeting
                            domain="meet.jit.si"
                            roomName={decodedRoomName}
                            configOverwrite={{
                                disableDeepLinking: true,
                                prejoinPageEnabled: true,
                            }}
                            interfaceConfigOverwrite={{
                                SHOW_JITSI_WATERMARK: false,
                            }}
                            getIFrameRef={(iframeRef) => {
                                iframeRef.style.height = '100%';
                                iframeRef.style.width = '100%';
                            }}
                            onReadyToClose={() => navigate('/interviews')}
                        />
                    </div>
                </section>
            )}
        </main>
    );
};

export default Interviews;
