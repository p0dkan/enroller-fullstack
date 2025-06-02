import {useEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";
import EditMeetingForm from "./EditMeetingForm";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);
    const [editingMeeting, setEditingMeeting] = useState(null);

    const fetchMeetings = async () => {
        const response = await fetch(`/api/meetings`);
        if (response.ok) {
            const meetings = await response.json();
            setMeetings(meetings);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, []);

    async function handleNewMeeting(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }

        });
        if (response.ok) {
            const meetingsNew = await response.json();
            const nextMeetings = [...meetings, meetingsNew];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }
    }

    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`,{
            method: 'DELETE',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok){
            const nextMeetings = meetings.filter(m => m !== meeting);
            setMeetings(nextMeetings);
        } else if (response.status === 409) {
            const errorMessage = await response.text();
            alert(errorMessage);
        } else {
            alert("Wystąpił błąd podczas usuwania spotkania.");
        }
    }

    async function handleUpdateMeeting(updatedMeeting) {
        const response = await fetch(`/api/meetings/${updatedMeeting.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMeeting)
        });
        if (response.ok) {
            fetchMeetings();
            setEditingMeeting(null);
        }
    }



    async function signInToMeeting(meeting){
        const response = await fetch(`api/meetings/${meeting.id}/participants`, {
            method: 'POST',
            body: JSON.stringify({login: username}),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            fetchMeetings();
        }
    }

    async function signOutMeeting(meeting){
        const response = await fetch(`api/meetings/${meeting.id}/participants/${username}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            fetchMeetings();
        }
    }


    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                editingMeeting ? (
                    <EditMeetingForm
                        meeting={editingMeeting}
                        onUpdate={handleUpdateMeeting}
                        onCancel={() => setEditingMeeting(null)}
                    />
                ) : (
                    addingNewMeeting ? (
                        <NewMeetingForm onSubmit={handleNewMeeting} />
                    ) : (
                        <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
                    )
                )
            }
            {meetings.length > 0 &&
                <MeetingsList meetings={meetings}
                username={username}
                onDelete={handleDeleteMeeting}
                onSignIn = {signInToMeeting}
                onSignout = {signOutMeeting}
                setEditing={setEditingMeeting}/>}
        </div>
    )
}
