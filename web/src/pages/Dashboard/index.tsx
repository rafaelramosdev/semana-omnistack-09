import { useEffect, useState, useMemo } from 'react';

import { Link } from 'react-router-dom';

import socketio from 'socket.io-client';

import api from '../../services/api';

import './styles.scss'

type Spot = {
  _id: string;
  company: string;
  thumbnail_url: string;
  price: number;
  user: string;
  techs: [string];
}

type User = {
  _id: string;
  email: string;
}

type Request = {
  _id: string;
  date: string;
  spot: Spot;
  user: User;
}

export function Dashboard() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  const user_id = localStorage.getItem('user') || '';

  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { 
      user_id,
    },
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    })
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');

      const response = await api.get('dashboard', {
        headers: {
          user_id
        },
      });

      setSpots(response.data);
    };

    loadSpots();
  }, []);

  async function handleAccept(id: string) {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id: string) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        { requests.map( request => {
          return (
            <li key={request._id}>
              <p>
                <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
              </p>

              <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>

              <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
            </li>
          )
        }) }
      </ul>

      <ul className="spot-list">
         { spots.map(spot => {
           return (
            <li key={spot._id}>
              <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}></header>

              <strong>{spot.company}</strong>

              <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}</span>
            </li>
           )
         }) }
      </ul>

      <Link to="/new">
        <button className="btn">
          Cadastrar novo spot
        </button>
      </Link>
    </>
  );
}