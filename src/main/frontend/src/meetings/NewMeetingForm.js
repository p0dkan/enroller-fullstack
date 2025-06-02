import {useState} from "react";

export default function NewMeetingForm({onSubmit}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    function submit(event) {
        event.preventDefault();
        onSubmit({title, description, date, participants: []});
    }

    return (
        <form onSubmit={submit}>
            <h3>Dodaj nowe spotkanie</h3>
            <label>Nazwa</label>
            <input type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <label>Opis</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                        <label>Data i godzina</label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <button>Dodaj</button>
                    </form>
                );
        }