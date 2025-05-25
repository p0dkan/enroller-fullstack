export default function MeetingsList({meetings,onDelete, onSignIn,onSignout}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Usuń spotkanie</th>
                <th>Zapisz się</th>
                <th>Wypisz się</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>
                        <button type="button"
                                onClick={() => onDelete(meeting)}>Usuń</button>
                    </td>

                    <td>
                        <button type="button"
                                onClick={() => onSignIn(meeting)}>Zapisz się</button>
                    </td>

                    <td>
                        <button type="button"
                                onClick={() => onSignout(meeting)}>Wypisz się</button>
                    </td>

                </tr>)
            }
            </tbody>
        </table>
    );
}
