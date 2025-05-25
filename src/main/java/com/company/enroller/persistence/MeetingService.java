package com.company.enroller.persistence;

import com.company.enroller.model.Meeting;
import com.company.enroller.model.Participant;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component("meetingService")
public class MeetingService {

    Session session;

    public MeetingService() {
        session = DatabaseConnector.getInstance().getSession();
    }

    // Pobierz wszystkie spotkania
    public Collection<Meeting> getAll() {
        String hql = "FROM Meeting";
        Query query = this.session.createQuery(hql);
        return query.list();
    }

    // Pobierz spotkanie po ID
    public Meeting findById(long id) {
        return this.session.get(Meeting.class, id);
    }

    // Znajdź spotkania na podstawie tytułu, opisu, uczestnika i trybu sortowania
    public Collection<Meeting> findMeetings(String title, String description, Participant participant, String sortMode) {
        String hql = "FROM Meeting as meeting WHERE title LIKE :title AND description LIKE :description ";
        if (participant != null) {
            hql += " AND :participant in elements(participants)";
        }
        if (sortMode.equals("title")) {
            hql += " ORDER BY title";
        }
        Query query = this.session.createQuery(hql);
        query.setParameter("title", "%" + title + "%").setParameter("description", "%" + description + "%");
        if (participant != null) {
            query.setParameter("participant", participant);
        }
        return query.list();
    }

    // Usuwanie spotkania
    public void delete(Meeting meeting) {
        Transaction transaction = this.session.beginTransaction();
        this.session.delete(meeting);
        transaction.commit();
    }

    // Dodawanie nowego spotkania
    public void add(Meeting meeting) {
        Transaction transaction = this.session.beginTransaction();
        this.session.save(meeting);
        transaction.commit();
    }

    // Aktualizacja spotkania
    public void update(Meeting meeting) {
        Transaction transaction = this.session.beginTransaction();
        this.session.merge(meeting);
        transaction.commit();
    }

    // Sprawdzenie, czy spotkanie już istnieje
    public boolean alreadyExist(Meeting meeting) {
        String hql = "FROM Meeting WHERE title=:title AND date=:date";
        Query query = this.session.createQuery(hql);
        Collection resultList = query.setParameter("title", meeting.getTitle()).setParameter("date", meeting.getDate())
                .list();
        return query.list().size() != 0;
    }

    // Dodanie uczestnika do spotkania
    public void addParticipant(long meetingId, Participant participant) {
        Meeting meeting = findById(meetingId);
        if (meeting != null) {
            Transaction transaction = this.session.beginTransaction();
            meeting.addParticipant(participant);  // Dodanie uczestnika
            this.session.merge(meeting);  // Zapisanie zmiany
            transaction.commit();
        }
    }

    // Usunięcie uczestnika ze spotkania
    public void removeParticipant(long meetingId, Participant participant) {
        Meeting meeting = findById(meetingId);
        if (meeting != null) {
            Transaction transaction = this.session.beginTransaction();
            meeting.removeParticipant(participant);  // Usunięcie uczestnika
            this.session.merge(meeting);  // Zapisanie zmiany
            transaction.commit();
        }
    }
}
