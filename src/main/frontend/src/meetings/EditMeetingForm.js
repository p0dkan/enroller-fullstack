import { useState } from "react";

export default function EditMeetingForm({ meeting, onUpdate, onCancel }) {
    const [title, setTitle] = useState(meeting.title);
    const [description, setDescription] = useState(meeting.description);
    const [date, setDate] = useState(meeting.date.split("T")[0]);
    const [time, setTime] = useState(meeting.date.split("T")[1].slice(0,5));

    function handleSubmit(e) {
        e.preventDefault();
        const updatedMeeting = {
            ...meeting,
            title,
            description,
            date: `${date}T${time}`
        };
        onUpdate(updatedMeeting);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Edytuj spotkanie</h3>
            <label>Nazwa</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required />

            <label>Opis</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required />

            <label>Data</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />

            <label>Godzina</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} required />

            <button type="submit">Zapisz</button>
            <button type="button" onClick={onCancel}>Anuluj</button>
        </form>
    );
}