export default function MeetingsList({meetings,onDelete, onSignIn,onSignout, setEditing}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Data i godzina</th>
                <th>Uczestnicy</th>
                <th>Usuń spotkanie</th>
                <th>Zapisz się</th>
                <th>Wypisz się</th>
                <th>Edytuj</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => {
                    const dateObj = new Date(meeting.date);
                    const formattedDate = dateObj.toLocaleString();
                    return (
                    <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>{formattedDate}</td>
                    <td>
                          {meeting.participants.map(participant => (
                            <p key={participant.login} style={{ margin: 0 }}>{participant.login}</p>
                          ))}
                        </td>
                    <td>
                        <button type="button" onClick={() => onDelete(meeting)}>Usuń</button>
                    </td>

                    <td>
                        <button type="button" onClick={() => onSignIn(meeting)}>Zapisz się</button>
                    </td>

                    <td>
                        <button type="button" onClick={() => onSignout(meeting)}>Wypisz się</button>
                    </td>

                    <td>
                      <button onClick={() => setEditing(meeting)}>Edytuj</button>
                    </td>

                </tr>)
            })}
            </tbody>
        </table>
    );
}
