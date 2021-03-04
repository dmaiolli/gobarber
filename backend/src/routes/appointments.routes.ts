/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Como todas nossas rotas vão precisar da autenticação, podemos fazer da seguinte maneira
appointmentsRouter.use(ensureAuthenticated);

// Caso eu quisesse passar em apenas uma rota seria dessa maneira
appointmentsRouter.get(
  '/',
  /* ensureAuthenticated, */ async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
  },
);

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
